from django.contrib import admin
from django.contrib.auth import get_user_model

from .models import Hike, HikeRequest

UserModel = get_user_model()


# Register your models here.

my_models = [Hike, HikeRequest]

#
# class HikerInline(admin.StackedInline):
#     model = UserModel

@admin.register(Hike)
class HikeAdmin(admin.ModelAdmin):
    inlines = [
        # HikerInline
    ]


@admin.register(HikeRequest)
class HikeRequestAdmin(admin.ModelAdmin):
    fields = HikeRequest.EXPOSED_FIELDS.append('pk')
    readonly_fields = HikeRequest.READONLY_ADMIN_FIELDS

    def save_model(self, request, obj, form, change):
        if not obj.pk:
            # Only set added_by during the first save.
            obj.created_by = request.user
        super().save_model(request, obj, form, change)
