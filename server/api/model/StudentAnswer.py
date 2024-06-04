from django.db import models

from api.model.QuestionAnswer import QuestionAnswer
from api.model.QuizQuestion import QuizQuestion
from api.model.Student import Student


class StudentAnswer(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    question = models.ForeignKey(QuizQuestion, on_delete=models.CASCADE)
    answer = models.ForeignKey(QuestionAnswer, on_delete=models.CASCADE)
    time = models.IntegerField(default=0)

    class Meta:
        unique_together = ["question", "student"]

    def __str__(self):
        return f"{self.student} - {self.question}"
