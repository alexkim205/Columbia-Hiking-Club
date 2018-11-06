from rest_framework import serializers
# from drf_braces.serializers import form_serializer

from .models import Hike, HikeRequest
from .forms import HikeRequestForm


class HikeSerializer(serializers.ModelSerializer):
    str_name = serializers.CharField(source='__str__', read_only=True)

    class Meta:
        model = Hike
        fields = Hike.EXPOSED_FIELDS
        read_only_fields = Hike.READONLY_FIELDS


class HikeRequestSerializer(serializers.ModelSerializer):
    str_name = serializers.CharField(source='__str__', read_only=True)

    class Meta:
        model = HikeRequest
        fields = HikeRequest.EXPOSED_FIELDS
        read_only_fields = HikeRequest.READONLY_FIELDS
        extra_kwargs = {
            'created_by': {'required': False},
            'hike_leaders': {'required': False},
        }

