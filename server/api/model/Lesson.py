
from django.db import models


class Lesson(models.Model):
    title = models.CharField(max_length=100)
    subtitle = models.CharField(max_length=300)
    coverImage = models.ImageField(blank=True, upload_to="lesson-cover-image/")

    def __str__(self):
        return self.title
