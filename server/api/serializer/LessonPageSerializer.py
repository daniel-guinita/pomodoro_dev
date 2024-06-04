from rest_framework import serializers

from api.model.LessonPage import LessonPage

class LessonPageSerializer(serializers.ModelSerializer):
    question = serializers.PrimaryKeyRelatedField(read_only=True, many=False)

    class Meta:
        model = LessonPage
        fields = [
            "id",
            "lesson",
            "title",
            "contents",
            "video",
            "video_link",
            "question",
        ]

    def update(self, instance, validated_data):
        if validated_data.get("video"):
            instance.video.delete()
        return super().update(instance, validated_data)
