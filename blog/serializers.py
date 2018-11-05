from rest_framework import serializers
# from drf_braces.serializers import form_serializer

from .models import Hike, HikeRequest
from .forms import HikeRequestForm


class HikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hike
        fields = '__all__'


class HikeRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = HikeRequest
        fields = '__all__'
