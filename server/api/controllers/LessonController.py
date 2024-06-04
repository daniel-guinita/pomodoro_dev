from django.http import JsonResponse
from rest_framework.viewsets import ModelViewSet
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated

from api.model.Lesson import Lesson
from api.model.LessonResourceType import LessonResourceType
from api.model.QuizQuestion import QuizQuestion
from api.model.Student import Student
from api.model.StudentAnswer import StudentAnswer
from api.serializer.LessonSerializer import LessonSerializer
from api.controllers.permissions.permissions import IsTeacher
from django.db.models import Count


class LessonController(ModelViewSet):
    queryset = Lesson.objects.all()
    serializer_class = LessonSerializer

    authentication_classes = [SessionAuthentication, TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get_permissions(self):
        if self.action in ["create", "update", "destroy"]:
            return [IsAuthenticated(), IsTeacher()]
        else:
            return [IsAuthenticated()]

    def answers_count(self, request, pk):
        lesson = Lesson.objects.get(pk=pk)
        lesson_pages = lesson.lesson_page.all()
        quiz_questions = QuizQuestion.objects.filter(lesson_page__in=lesson_pages)

        correct_answers = StudentAnswer.objects.filter(
            question__in=quiz_questions, answer__is_correct=True
        )

        wrong_answers = StudentAnswer.objects.filter(
            question__in=quiz_questions, answer__is_correct=False
        )

        response_data = {
            "correct_answers": correct_answers.count(),
            "wrong_answers": wrong_answers.count(),
        }

        return JsonResponse(response_data, status=200)

    def dashboard(self, request, pk):
        lesson = Lesson.objects.get(pk=pk)
        lesson_pages = lesson.lesson_page.all()
        quiz_questions = QuizQuestion.objects.filter(lesson_page__in=lesson_pages)

        # Fetching all students who answered the quiz questions
        student_answers = StudentAnswer.objects.filter(
            question__in=quiz_questions
        ).select_related("student", "student__user")

        quiz_dashboard = {}

        for answer in student_answers:
            student = answer.student
            resourceType = LessonResourceType.objects.get(
                lesson=lesson, student=student
            )
            user = student.user
            student_key = user.username
            if student_key not in quiz_dashboard:
                quiz_dashboard[student_key] = {
                    "score": {"correct_answer": 0, "over": 0},
                    "time": 0,
                    "student": {
                        "first_name": student.user.first_name,
                        "last_name": student.user.last_name,
                    },
                    "resourceType": resourceType.type,
                }

            quiz_dashboard[student_key]["score"]["over"] += 1
            quiz_dashboard[student_key]["time"] += answer.time
            if answer.answer.is_correct:
                quiz_dashboard[student_key]["score"]["correct_answer"] += 1

        response_data = list(quiz_dashboard.values())

        return JsonResponse(response_data, safe=False, status=200)

    def resource_type_count(self, request, pk):
        lesson = self.get_object()
        resource_counts = (
            LessonResourceType.objects.filter(lesson=lesson)
            .values("type")
            .annotate(count=Count("type"))
        )
        response_data = [
            {"resourceType": resource["type"], "value": resource["count"]}
            for resource in resource_counts
        ]
        return JsonResponse(response_data, status=200, safe=False)

    def get_lesson_score(self, request, pk):
        lesson = Lesson.objects.get(pk=pk)
        lesson_pages = lesson.lesson_page.all()
        quiz_questions = QuizQuestion.objects.filter(lesson_page__in=lesson_pages)

        student = Student.objects.filter(user=self.request.user).first()
        # Fetching all students who answered the quiz questions
        correct_answers = StudentAnswer.objects.filter(
            question__in=quiz_questions, student=student, answer__is_correct=True
        ).count()

        over = StudentAnswer.objects.filter(
            question__in=quiz_questions, student=student
        ).count()

        response_data = {
            "score": correct_answers,
            "over": over
        }

        return JsonResponse(response_data, status=200)
