from django.contrib import admin

from api.model import LessonPage, Lesson, Student, Query, SubQuery
from django.contrib.auth.admin import UserAdmin
from api.model.LessonResourceType import LessonResourceType
from api.model.QuestionAnswer import QuestionAnswer
from api.model.QuizQuestion import QuizQuestion
from api.model.StudentAnswer import StudentAnswer
from api.models import CustomUser


class CustomUserAdmin(UserAdmin):
    list_display = ("username", "email", "first_name", "last_name", "is_staff", "role")
    fieldsets = (
        (None, {"fields": ("username", "email", "password")}),
        ("Personal info", {"fields": ("first_name", "last_name", "role")}),
        (
            "Permissions",
            {
                "fields": (
                    "is_active",
                    "is_staff",
                    "is_superuser",
                    "groups",
                    "user_permissions",
                )
            },
        ),
        ("Important dates", {"fields": ("last_login", "date_joined")}),
    )


# Register your model here.
admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register(Student)
admin.site.register(Lesson)
admin.site.register(LessonPage)
admin.site.register(Query)
admin.site.register(SubQuery)
admin.site.register(QuestionAnswer)
admin.site.register(QuizQuestion)
admin.site.register(StudentAnswer)
admin.site.register(LessonResourceType)
