from rest_framework import serializers
from accounts.models import HikeUser


class HikerSerializer(serializers.ModelSerializer):
    class Meta:
        model = HikeUser
        fields = '__all__'
