from django.db import models

from api.model import LessonPage


class QuizQuestion(models.Model):
    lesson_page = models.OneToOneField(LessonPage, related_name="question", on_delete=models.CASCADE)
    text = models.CharField(max_length=255)

    def __str__(self):
        return self.text
