from django.contrib import admin

# Register your models here.
from melon.contact.models import Contact


class ContactAdmin(admin.ModelAdmin):
    list_display = ['id', 'first_name', 'last_name', 'email', 'phone', 'address']


admin.site.register(Contact, ContactAdmin)
