from rest_framework import serializers

from api.model import LessonResourceType


class LessonResourceTypeSerializer(serializers.ModelSerializer):

    class Meta:
        model = LessonResourceType
        fields = ['id', 'lesson', 'student', 'type']
        validators = [
            serializers.UniqueTogetherValidator(
                queryset=LessonResourceType.objects.all(),
                fields=["lesson", "student"],
                message="This combination of lesson and student already exists.",
            )
        ]
