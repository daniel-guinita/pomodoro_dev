from rest_framework.viewsets import ModelViewSet
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated

from api.model.QuizQuestion import QuizQuestion
from api.serializer.QuizQuestionSerializer import QuizQuestionSerializer
from api.controllers.permissions.permissions import IsTeacher


class QuizQuestionController(ModelViewSet):
    queryset = QuizQuestion.objects.all()
    serializer_class = QuizQuestionSerializer

    authentication_classes = [SessionAuthentication, TokenAuthentication]
    permission_classes = [IsAuthenticated]
