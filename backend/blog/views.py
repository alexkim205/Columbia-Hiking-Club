from django.views.generic import DetailView, ListView
from django.views import View
from django.views.generic.base import TemplateView
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import get_user_model

import itertools

from rest_framework import generics, status, mixins, permissions
from rest_framework.views import APIView
from rest_framework.response import Response

from .serializers import *
from .models import *
from .forms import *

UserModel = get_user_model()


# API Views


class HikesListAPI(generics.ListAPIView):
    queryset = Hike.objects.all()
    serializer_class = HikeSerializer


class HikeRequestsListAPI(generics.ListCreateAPIView):
    queryset = HikeRequest.objects.all()
    serializer_class = HikeRequestSerializer
    permission_classes = (permissions.IsAdminUser,)


class HikeAPI(generics.RetrieveUpdateAPIView):
    lookup_field = 'pk'
    queryset = Hike.objects.all()
    serializer_class = HikeSerializer


class HikeRequestAPI(generics.RetrieveUpdateAPIView):
    lookup_field = 'pk'
    queryset = HikeRequest.objects.all()
    serializer_class = HikeRequestSerializer
    # permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    # permission_classes = (permissions.IsAdminUser,)


class HikeRequestFormAPI(mixins.CreateModelMixin,
                         mixins.RetrieveModelMixin,
                         mixins.UpdateModelMixin,
                         mixins.DestroyModelMixin,
                         generics.GenericAPIView):
    serializer_class = HikeRequestSerializer
    queryset = HikeRequest.objects.all()

    # permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

    def get_queryset(self):
        return self.request.user.requests.all()

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

    def post(self, request):
        # Get user from context and attribute to created_by in model
        created_by_user_pk = request.user.pk or None

        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                json = serializer.data
                json['created_by'] = created_by_user_pk
                return Response(json, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class HikeRegisterFormAPI(generics.GenericAPIView):
    lookup_field = 'pk'
    queryset = Hike.objects.all()
    serializer_class = HikeSerializer

    # user_serializer_class = Us

    def put(self, request, pk, *args, **kwargs):
        user = request.user
        hike = Hike.objects.get(pk=pk)
        members_group = Group.objects.get(name='Members')

        # Make sure user is logged in and is member
        if not user.is_authenticated or None:
            return Response({
                "status": False,
                "message": "You must log in to sign up for a hike."
            }, status=status.HTTP_403_FORBIDDEN)
        if not members_group.user_set.filter(pk=user.pk).exists():
            return Response({
                "status": False,
                "message": "You must pay club dues to sign up for a hike. If you've paid already, please allow us 2-3 "
                           "business days to process your membership."
            }, status=status.HTTP_403_FORBIDDEN)

        hike.hikes.add(user)

        try:
            hike.save()
        except:
            return Response({
                'message': 'There was an error registering for this hike.'
            }, status=status.HTTP_400_BAD_REQUEST)

        return Response({
            'message': 'You successfully registered for this hike!'
        }, status=status.HTTP_202_ACCEPTED)


class HikeUnRegisterFormAPI(mixins.UpdateModelMixin, generics.GenericAPIView):
    lookup_field = 'pk'
    queryset = Hike.objects.all()
    serializer_class = HikeSerializer

    def put(self, request, pk, **kwargs):

        user = request.user
        hike = Hike.objects.get(pk=pk)
        # members_group = Group.objects.get(name='Members')

        # Make sure user is logged in
        if not user.is_authenticated or None:
            return Response({
                "status": False,
                "message": "You must log in to drop a hike."
            }, status=status.HTTP_403_FORBIDDEN)

        # Remove user from hike, throw error if user isn't signed up
        try:
            hike.hikes.remove(user)
        except:
            return Response({
                "status": False,
                "message": "You are not signed up for this hike."
            }, status=status.HTTP_406_NOT_ACCEPTABLE)

        return Response({
            'message': 'You successfully dropped this hike!'
        }, status=status.HTTP_202_ACCEPTED)
