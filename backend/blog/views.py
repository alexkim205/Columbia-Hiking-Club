from django.views.generic import DetailView, ListView
from django.views import View
from django.views.generic.base import TemplateView
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from django.shortcuts import render, redirect, get_object_or_404

from rest_framework import generics, status, mixins, permissions
from rest_framework.views import APIView
from rest_framework.response import Response

from .serializers import *
from .models import *
from .forms import *


# https://www.django-rest-framework.org/api-guide/generic-views/#generic-views

class BlogView(TemplateView):
    template_name = 'blog/hikebase.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['title'] = self.title
        context['reactfile'] = self.react_file_name
        return context


class HikePostView(BlogView):
    title = 'Hike Details'
    react_file_name = 'blog/hike_detail'
    context_object_name = 'context'


class HikesListView(BlogView):
    title = 'Hike List'
    react_file_name = 'blog/hike_list'
    context_object_name = 'context'


class HikeRequestView(BlogView):
    title = 'Request a Hike'
    react_file_name = 'blog/hike_register'
    context_object_name = 'context'


class ProfileView(BlogView):
    title = 'My Profile'
    react_file_name = 'blog/profile_detail'
    context_object_name = 'context'


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
    permission_classes = (permissions.IsAdminUser,)


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
