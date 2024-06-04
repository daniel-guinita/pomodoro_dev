from rest_framework.viewsets import ModelViewSet
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated

from api.model.QuestionAnswer import QuestionAnswer
from api.serializer.QuestionAnswerSerializer import QuestionAnswerSerializer
from api.controllers.permissions.permissions import IsTeacher


class QuestionAnswerController(ModelViewSet):
    queryset = QuestionAnswer.objects.all()
    serializer_class = QuestionAnswerSerializer

    authentication_classes = [SessionAuthentication, TokenAuthentication]
    permission_classes = [IsAuthenticated]
