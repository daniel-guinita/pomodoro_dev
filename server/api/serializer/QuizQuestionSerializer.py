from rest_framework import serializers

from api.model.QuestionAnswer import QuestionAnswer
from api.model.QuizQuestion import QuizQuestion
from api.serializer.QuestionAnswerSerializer import QuestionAnswerSerializer


class QuizQuestionSerializer(serializers.ModelSerializer):
    answers = QuestionAnswerSerializer(many=True)

    class Meta:
        model = QuizQuestion
        fields = ["id", "lesson_page", "text", "answers"]

    def create(self, validated_data):
        answers_data = validated_data.pop("answers")
        question = QuizQuestion.objects.create(**validated_data)
        for answer_data in answers_data:
            QuestionAnswer.objects.create(question=question, **answer_data)
        return question

    def update(self, instance, validated_data):
        answers_data = validated_data.get("answers")
        QuestionAnswer.objects.filter(question=instance).delete()
        for answer_data in answers_data:
            QuestionAnswer.objects.create(question=instance, **answer_data)
        return instance
