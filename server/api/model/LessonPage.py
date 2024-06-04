from django.db import models
from api.model.Lesson import Lesson


class LessonPage(models.Model):
    lesson = models.ForeignKey(
        Lesson, related_name="lesson_page", on_delete=models.CASCADE
    )
    title = models.CharField(max_length=100)
    contents = models.TextField(default="", null=False)
    video = models.FileField(upload_to="videos/", null=True, blank=True)
    video_link = models.TextField(null=True)

    def __str__(self):
        return self.title
