from rest_framework import serializers

from api.model.Lesson import Lesson
from api.model.LessonPage import LessonPage


class ChatBotSerializer(serializers.Serializer):
    lesson = serializers.PrimaryKeyRelatedField(
        queryset=Lesson.objects.all(), write_only=True
    )
    lesson_page = serializers.PrimaryKeyRelatedField(
        queryset=LessonPage.objects.all(), write_only=True
    )
    message = serializers.CharField(allow_blank=True, max_length=255, required=False)
