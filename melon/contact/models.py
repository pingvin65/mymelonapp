from django.db import models
from phone_field import PhoneField
# Create your models here.


class Contact(models.Model):
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    email = models.EmailField(unique=True)
    phone = PhoneField(blank=True, help_text='Contact phone number')
    address = models.CharField(max_length=255, blank=True)

    def __str__(self):
        return self.first_name + " " +  self.last_name

    class Meta:
        db_table = 'contact'
        ordering = ['first_name', 'last_name']
