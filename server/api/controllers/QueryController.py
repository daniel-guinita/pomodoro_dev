from rest_framework.viewsets import ModelViewSet
from rest_framework.authentication import SessionAuthentication, TokenAuthentication

from api.model.Query import Query
from api.serializer.QuerySerializer import QuerySerializer
from rest_framework.permissions import IsAuthenticated


class QueryController(ModelViewSet):
    queryset = Query.objects.all()
    serializer_class = QuerySerializer

    authentication_classes = [SessionAuthentication, TokenAuthentication]
    permission_classes = [IsAuthenticated]
