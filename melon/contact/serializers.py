from rest_framework import serializers

from melon.contact.models import Contact


# HyperlinkedModelSerializer
class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = ['id', 'first_name', 'last_name', 'email', 'phone', 'address']


class ContactSerializerList(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Contact
        fields = ['id', 'first_name', 'last_name']
