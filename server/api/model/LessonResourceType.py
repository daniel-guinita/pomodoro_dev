from django.db import models
from api.model.Lesson import Lesson
from api.model.Student import Student


class LessonResourceType(models.Model):
    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE)
    student = models.ForeignKey(Student, on_delete=models.CASCADE)

    TYPE_CHOICES = [
        ("TEXT", 'text'),
        ("VIDEO", 'video'),
    ]

    type = models.CharField(choices=TYPE_CHOICES, max_length=100)

    class Meta:
        unique_together = ["lesson", "student"]

    def __str__(self):
        return f"{self.lesson} {self.student}"
