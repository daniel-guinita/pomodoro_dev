from django.db import models

from api.model.QuizQuestion import QuizQuestion


class QuestionAnswer(models.Model):
    question = models.ForeignKey(
        QuizQuestion, related_name="answers", on_delete=models.CASCADE
    )
    text = models.CharField(max_length=255)
    is_correct = models.BooleanField(default=False)

    def __str__(self):
        return self.text
