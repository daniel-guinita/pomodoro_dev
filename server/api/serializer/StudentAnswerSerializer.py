from rest_framework import serializers

from api.model.QuestionAnswer import QuestionAnswer
from api.model.QuizQuestion import QuizQuestion
from api.model.Student import Student
from api.model.StudentAnswer import StudentAnswer

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ['first_name', 'last_name']


class StudentAnswerSerializer(serializers.ModelSerializer):
    question = serializers.PrimaryKeyRelatedField(queryset=QuizQuestion.objects.all())
    answer = serializers.PrimaryKeyRelatedField(queryset=QuestionAnswer.objects.all())

    class Meta:
        model = StudentAnswer
        fields = ["id", "question", "answer", "student", "time"]
        validators = [
            serializers.UniqueTogetherValidator(
                queryset=StudentAnswer.objects.all(),
                fields=["question", "student"],
                message="This combination of question and student already exists.",
            )
        ]
