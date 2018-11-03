from rest_framework import serializers
from .models import Hike, HikeRequest


class HikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hike
        fields = '__all__'


class HikeRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = HikeRequest
        fields = '__all__'

