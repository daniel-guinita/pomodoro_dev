from rest_framework.viewsets import ModelViewSet
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated

from api.controllers.permissions.permissions import IsStudent
from api.model.LessonResourceType import LessonResourceType
from api.model.Student import Student
from api.serializer.LessonResourceTypeSerializer import LessonResourceTypeSerializer
from django_filters.rest_framework import DjangoFilterBackend
from django.http import JsonResponse


class LessonResourceTypeController(ModelViewSet):
    queryset = LessonResourceType.objects.all()
    serializer_class = LessonResourceTypeSerializer
    authentication_classes = [SessionAuthentication, TokenAuthentication]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["student", "lesson"]

    def get_permissions(self):
        if self.action in ["create"]:
            return [IsAuthenticated(), IsStudent()]
        else:
            return [IsAuthenticated()]

    def create(self, request, *args, **kwargs):
        student = Student.objects.filter(user=self.request.user).first()
        data = {
            "lesson": request.data["lesson"],
            "type": request.data["type"],
            "student": student.id,
        }
        serializer = LessonResourceTypeSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)
    