from django.urls import path, re_path

from api.controllers.LessonPageController import LessonPageController
from api.controllers.LessonResourceTypeController import LessonResourceTypeController
from api.controllers.QuizQuestionController import QuizQuestionController
from api.controllers.StudentAnswerController import StudentAnswerController
from .controllers.UserController import UserController
from .controllers.LessonController import LessonController
from .controllers.ChatBotController import ChatBotController
from .controllers.QueryController import QueryController
from django.conf.urls.static import static
from django.conf import settings


chat_bot = {"post": "chatbot"}
view_list = {"get": "list", "post": "create"}
view_detail = {
    "get": "retrieve",
    "put": "update",
    "patch": "partial_update",
    "delete": "destroy",
}


urlpatterns = [
    # Paths
    re_path("login", UserController.login),
    re_path("register", UserController.register),
    re_path("test-token", UserController.test_token),
    path("user/", UserController.get_all_users),
    path("user/<int:user_id>", UserController.get_user),
    path("lesson", LessonController.as_view(view_list)),
    path("lesson/<int:pk>", LessonController.as_view(view_detail)),
    path("lesson/<int:pk>/answers-count", LessonController.as_view({ "get": "answers_count"})),
    path("lesson/<int:pk>/dashboard", LessonController.as_view({ "get": "dashboard"})),
    path("lesson/<int:pk>/resource-type-count", LessonController.as_view({ "get": "resource_type_count"})),
    path("lesson/<int:pk>/score", LessonController.as_view({ "get": "get_lesson_score"})),
    path("lesson-page", LessonPageController.as_view(view_list)),
    path("lesson-page/<int:pk>", LessonPageController.as_view(view_detail)),
    path(
        "lesson-resource-type",
        LessonResourceTypeController.as_view(view_list),
    ),
    path(
        "lesson-resource-type/get-by-lesson-student",
        LessonResourceTypeController.as_view({"get": "get_by_lesson_student"}),
    ),
    path(
        "lesson-resource-type/<int:pk>",
        LessonResourceTypeController.as_view(view_detail),
    ),
    path("quiz-question", QuizQuestionController.as_view(view_list)),
    path("quiz-question/<int:pk>", QuizQuestionController.as_view(view_detail)),
    path("student-answer", StudentAnswerController.as_view(view_list)),
    path(
        "student-answer/<int:pk>",
        StudentAnswerController.as_view(view_detail),
    ),
    path("query/", QueryController.as_view(view_list)),
    path("query/<int:pk>", QueryController.as_view(view_detail)),
    path("chatbot", ChatBotController.as_view(chat_bot)),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
