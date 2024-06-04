from rest_framework import serializers

from api.model.QuestionAnswer import QuestionAnswer


class QuestionAnswerSerializer(serializers.ModelSerializer):
    question = serializers.PrimaryKeyRelatedField(read_only=True, many=False)

    class Meta:
        model = QuestionAnswer
        fields = ["id", "question", "text", "is_correct"]
