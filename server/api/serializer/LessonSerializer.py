from rest_framework import serializers
from api.model.Lesson import Lesson


class LessonSerializer(serializers.ModelSerializer):
    lesson_pages = serializers.SerializerMethodField("get_lesson_pages_count")

    class Meta:
        model = Lesson
        fields = ["id", "title", "subtitle", "coverImage", "lesson_pages"]

    def get_lesson_pages_count(self, lesson):
        return lesson.lesson_page.count()

    def update(self, instance, validated_data):
        if validated_data.get("coverImage"):
            instance.coverImage.delete()
        return super().update(instance, validated_data)
    
    
