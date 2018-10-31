from django.contrib import admin

from .models import *

# Register your models here.

my_models = [Hike, HikeRequest]

admin.site.register(my_models)
