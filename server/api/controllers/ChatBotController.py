import json
import openai
from django.http import JsonResponse, HttpResponseBadRequest, HttpResponseNotFound
from django.conf import settings
from bs4 import BeautifulSoup
from django.utils import timezone

from api.model.Lesson import Lesson
from api.model.LessonPage import LessonPage
from api.model.Query import Query
from api.model.SubQuery import SubQuery

from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.viewsets import GenericViewSet

from langchain.chat_models import ChatOpenAI
from langchain.chains import ConversationChain
from langchain.memory import ConversationSummaryBufferMemory
from openai import OpenAI

from api.serializer.ChatBotSerializer import ChatBotSerializer


class ChatBotController(GenericViewSet):
    client = OpenAI(
        api_key=settings.OPENAI_API_KEY,
    )
    authentication_classes = [SessionAuthentication, TokenAuthentication]
    serializer_class = ChatBotSerializer

    def chatbot_response(self, request):

        openai.api_key = self.openai_api_key

        # Extract the message from the JSON request body
        try:
            data = request.data
            user_message = data["message"]
        except (ValueError, KeyError):
            return HttpResponseBadRequest("Invalid request body")

        # Retrieve the lesson by its ID
        try:
            lesson = Lesson.objects.get(id=data["lesson"])
        except Lesson.DoesNotExist:
            return JsonResponse({"error": "Lesson not found"}, status=404)

        # Retrieve content based on the specified lesson_content_id
        try:
            lesson_content = LessonPage.objects.get(id=data["lesson_page"])
            content = lesson_content.contents

            # Use BeautifulSoup to parse and extract text from HTML content
            soup = BeautifulSoup(content, "html.parser")
            content_text = soup.get_text()
        except LessonPage.DoesNotExist:
            return HttpResponseNotFound("Lesson content not found")

        # Retrieve or initialize the Query object for the user and lesson
        user = request.user
        query, created = Query.objects.get_or_create(lesson=lesson, user=user)

        # Load the existing conversation context from the Query object, if any
        conversation_context = json.loads(query.context) if query.context else []

        # Check if the conversation context has been created for the first time
        if created:
            # If this is a new query, there will be no past conversation
            past_conversation = []
        else:
            # If this is an existing query, load the conversation context
            past_conversation = []
            sorted_subqueries = query.get_subqueries().order_by("created_at")
            for subquery in sorted_subqueries:
                past_conversation.append(
                    {
                        "role": "user",
                        "content": subquery.question,
                        "time": subquery.created_at.isoformat(),
                    }
                )
                past_conversation.append(
                    {
                        "role": "assistant",
                        "content": subquery.response,
                        "time": subquery.created_at.isoformat(),
                    }
                )

        lesson_title = lesson.title
        lesson_subtitle = lesson.subtitle
        content = content_text
        history_content = f"You are a helpful assistant that provides information based on the lesson provided only. If the question is not related to the lesson, then you can say that it is not related. Lesson Title: {lesson_title}\nSubtitle: {lesson_subtitle}\nContent: {content}"

        # Combine the past conversation with the current context (if any)
        initial_memory = past_conversation + conversation_context

        # Deduplication function
        def remove_duplicates(past_conversations):
            seen = set()
            cleaned_conversations = []
            for conversation in past_conversations:
                unique_key = (
                    conversation["role"],
                    conversation["content"],
                    conversation["time"],
                )
                if unique_key not in seen:
                    seen.add(unique_key)
                    cleaned_conversations.append(conversation)
            return cleaned_conversations

        # Deduplicate initial memory
        initial_memories = remove_duplicates(initial_memory)

        llm = ChatOpenAI(
            openai_api_key=settings.OPENAI_API_KEY,
            model_name="gpt-3.5-turbo",
            temperature=0,
        )
        memory = ConversationSummaryBufferMemory(
            llm=llm, initial_memory=initial_memories
        )

        memory.save_context(
            {"input": history_content},
            {
                "output": "Thank you for providing me with information. Ask me anything about the said topic"
            },
        )
        for conversation in initial_memories:
            if conversation["role"] == "user":
                input_text = conversation["content"]
            elif conversation["role"] == "assistant":
                output_text = conversation["content"]
                memory.save_context({"input": input_text}, {"output": output_text})

        conversation = ConversationChain(llm=llm, memory=memory, verbose=True)

        ai_response = conversation.predict(
            input=f"Can you answer my question or Do what I say directly: {user_message}?"
        )

        # After getting the response, update the conversation context
        new_interaction = [
            {
                "role": "user",
                "content": user_message,
                "time": timezone.now().isoformat(),
            },
            {
                "role": "assistant",
                "content": ai_response,
                "time": timezone.now().isoformat(),
            },
        ]

        conversation_context.extend(new_interaction)

        # Deduplicate again to be safe
        conversation_context = remove_duplicates(conversation_context)

        # Update the Query object with the new context
        query.set_context(json.dumps(conversation_context))
        query.save()

        # Create a new SubQuery with the question and response
        subquery = SubQuery(question=user_message, response=ai_response)
        subquery.save()

        # Get the user from the request
        user = request.user

        # Check if there's an existing query for this lesson and user combination
        try:
            existing_query = Query.objects.get(lesson=lesson, user=user)
            # Add the new SubQuery to the existing query's subqueries
            existing_query.subqueries.add(subquery)
        except Query.DoesNotExist:
            # If no existing query, create a new one
            new_query = Query()
            new_query.subqueries.add(subquery)
            new_query.lesson = lesson
            new_query.user = user
            new_query.save()

        return JsonResponse({"response": ai_response})

    def chatbot(self, request):
        lesson_id = request.data["lesson"]
        lesson_page_id = request.data["lesson_page"]
        message = request.data["message"]
        data = {
            "lesson": lesson_id,
            "lesson_page": lesson_page_id,
            "message": message,
        }
        serializer = ChatBotSerializer(data=data)
        if not serializer.is_valid():
            return JsonResponse(serializer.errors, status=400)
        lesson = Lesson.objects.get(id=lesson_id)
        lesson_page = LessonPage.objects.get(id=lesson_page_id)
        soup = BeautifulSoup(lesson_page.contents, "html.parser")
        content = soup.get_text()

        user = request.user
        query, created = Query.objects.get_or_create(lesson=lesson, user=user)
        messages = [
            {
                "role": "system",
                "content": f"You are a helpful assistant that provides information based on the lesson provided only. If the question is not related to the lesson, then you can say that it is not related. Lesson Title: {lesson.title}\nSubtitle: {lesson.subtitle}\nContent: {content}",
            }
        ]
        if not created:
            for subquery in query.subqueries.all().order_by("created_at"):
                messages.append(
                    {
                        "role": "user",
                        "content": subquery.question,
                    }
                )
                messages.append(
                    {
                        "role": "system",
                        "content": subquery.response,
                    }
                )
        messages.append(
            {
                "role": "user",
                "content": message,
            }
        )
        response = self.client.completions.create(
            model="gpt-3.5-turbo",
            prompt=message,
        )
        subquery = SubQuery(question=message, response=response.choices[0].message)
        subquery.save()

        query.subqueries.add(subquery)

        return JsonResponse({"response": subquery.response})
