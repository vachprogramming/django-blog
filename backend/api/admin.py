from django.contrib import admin
from .models import University, Profile, StudyGroup

# Register your models here.

admin.site.register(University)
admin.site.register(Profile)
admin.site.register(StudyGroup)