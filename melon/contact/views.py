from rest_framework import mixins, viewsets
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.generics import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from melon.contact.models import Contact
from melon.contact.serializers import ContactSerializer, ContactSerializerList


class ContactCreateListRetrieveViewSet(mixins.CreateModelMixin,
                                       mixins.ListModelMixin,
                                       mixins.RetrieveModelMixin,
                                       viewsets.GenericViewSet):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer


class ContactCreateListRetrieve(viewsets.ViewSet):
    """
    A simple ViewSet for listing or retrieving Contacts.
    """

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


class ContactViewSet(viewsets.ModelViewSet):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)


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
