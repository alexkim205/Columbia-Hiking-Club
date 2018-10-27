from django.contrib import admin

from .models import *

# Register your models here.

my_models = [Leader, Hike]

admin.site.register(my_models)
