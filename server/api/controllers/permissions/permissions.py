from rest_framework import permissions

from api.models import CustomUser

class IsTeacher(permissions.BasePermission):
    def has_permission(self, request, view):
        user: CustomUser = request.user
        return user.role == CustomUser.TEACHER
    
class IsStudent(permissions.BasePermission):
    def has_permission(self, request, view):
        user: CustomUser = request.user
        return user.role == CustomUser.STUDENT