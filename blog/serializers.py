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
        fields = ('date_of_hike', 'travel', 'destination', 'description', 'difficulty', 'want_to_lead',)
        extra_kwargs = {
            'created_by': {'required': False}
        }
