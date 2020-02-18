from rest_framework import generics, mixins, viewsets, status
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.generics import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.settings import api_settings
from melon.contact.core.pagination import MelonLimitOffsetPagination

from melon.contact.models import Contact
from melon.contact.serializers import ContactSerializer, ContactSerializerList


class ContactCreateListRetrieveViewSet(mixins.CreateModelMixin,
                                       mixins.ListModelMixin,
                                       mixins.RetrieveModelMixin,
                                       viewsets.GenericViewSet):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer
    authentication_classes = (TokenAuthentication,)


class ContactCreateListRetrieve(viewsets.ViewSet):
    """
    A simple ViewSet for listing or retrieving Contacts.
    """
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def list(self, request):
        queryset = Contact.objects.all()
        serializer = ContactSerializerList(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        queryset = Contact.objects.all()
        user = get_object_or_404(queryset, pk=pk)
        serializer = ContactSerializer(user)
        return Response(serializer.data)


class ContactList(mixins.ListModelMixin,
                  viewsets.GenericViewSet):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializerList
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)


# class ContactViewSet(viewsets.ModelViewSet):
#     queryset = Contact.objects.all()
#     serializer_class = ContactSerializer
#     authentication_classes = (TokenAuthentication,)
#     # permission_classes = (IsAuthenticated,)
#
#     def list(self, request):
#         queryset = self.queryset
#         serializer = ContactSerializer(queryset, many=True)
#         return Response(serializer.data)
#
#     def retrieve(self, request, pk=None):
#         queryset = self.queryset
#         user = get_object_or_404(queryset, pk=pk)
#         serializer = ContactSerializer(user)
#         return Response(serializer.data)


class ContactViewSet(viewsets.ModelViewSet):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    # def create(self, request, *args, **kwargs):
    #     serializer = self.get_serializer(data=request.data)
    #     serializer.is_valid(raise_exception=True)
    #     self.perform_create(serializer)
    #     headers = self.get_success_headers(serializer.data)
    #     print(serializer.data)
    #     print(headers)
    #     return super().create(request, *args, **kwargs)
    #
    # def get_success_headers(self, data):
    #     print(data)
    #     try:
    #         return {'Location': str(data[api_settings.URL_FIELD_NAME])}
    #     except (TypeError, KeyError):
    #         return {}


class CustomAuthToken(ObtainAuthToken):

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            # 'user_id': user.pk,
            # 'email': user.email
        })

# from django.contrib.auth.models import User
# from rest_framework.authtoken.models import Token
#
# for user in User.objects.all():
#     Token.objects.get_or_create(user=user)
