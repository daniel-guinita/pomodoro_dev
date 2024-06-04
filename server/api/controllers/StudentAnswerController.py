from django.http import JsonResponse
from rest_framework.viewsets import ModelViewSet
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated

from api.model.Student import Student
from api.model.StudentAnswer import StudentAnswer
from api.serializer.StudentAnswerSerializer import StudentAnswerSerializer


class StudentAnswerController(ModelViewSet):
    queryset = StudentAnswer.objects.all()
    serializer_class = StudentAnswerSerializer

    authentication_classes = [SessionAuthentication, TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        student = Student.objects.filter(user=self.request.user).first()
        data = {
            "question": request.data["question"],
            "answer": request.data["answer"],
            "student": student.id,
            "time": request.data["time"]
        }
        serializer = self.get_serializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)
