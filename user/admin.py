from django.contrib import admin
from user.models import *
# Register your models here.
class MyUserAdmin(admin.ModelAdmin):
    list_display = ['id']

admin.site.register(MyUser)
