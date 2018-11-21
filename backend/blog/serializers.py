from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.models import User, Group
# from drf_braces.serializers import form_serializer

from .models import Hike, HikeRequest
from .forms import HikeRequestForm
from accounts.serializers import HikerSerializer

UserModel = get_user_model()


class HikerListSerializer(serializers.ListSerializer):

    def update(self, instance, validated_data):
        # don't update hikers individually
        pass


class HikeSerializer(serializers.ModelSerializer):
    str_name = serializers.CharField(source='__str__', read_only=True)
    hike_leaders = HikerSerializer(read_only=True, allow_null=True, many=True)
    hikers = HikerSerializer(source='hikes', allow_null=True, many=True)

    def validate_hikers(self, hikers):
        # Make sure there are no duplicate hikers
        if len(hikers) != len(set(hikers)):
            raise serializers.ValidationError("You are already signed up for this hike.")
        return hikers

    def update(self, instance, validated_data):
        pass

    class Meta:
        model = Hike
        fields = Hike.EXPOSED_FIELDS + ['hikers']
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
