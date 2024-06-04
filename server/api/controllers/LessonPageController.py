
from rest_framework.viewsets import ModelViewSet
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated

from api.controllers.permissions.permissions import IsTeacher
from api.model import LessonPage
from api.serializer import LessonPageSerializer
from django_filters.rest_framework import DjangoFilterBackend


class LessonPageController(ModelViewSet):
    queryset = LessonPage.objects.all()
    serializer_class = LessonPageSerializer
    authentication_classes = [SessionAuthentication, TokenAuthentication]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["lesson"]

    def get_permissions(self):
        if self.action in ["create", "update", "destroy"]:
            return [IsAuthenticated(), IsTeacher()]
        else:
            return [IsAuthenticated()]
    