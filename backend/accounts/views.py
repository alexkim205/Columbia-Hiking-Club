from django.contrib.auth import login, authenticate
from django.shortcuts import render, redirect
from django.views import View
from django.urls import reverse_lazy
from django.contrib.auth import views as auth_views
from django.contrib.auth.models import Group
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import ensure_csrf_cookie

from rest_framework import generics, status, authentication, permissions, mixins
from rest_framework import views as rest_views
from rest_framework.response import Response
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.authtoken.models import Token

from knox.models import AuthToken
from knox.auth import TokenAuthentication
from knox.views import LoginView as KnoxLoginView

from .forms import SignupForm, LoginForm
from .models import HikeUser
from .serializers import (
    HikerSerializer, HikerRegisterSerializer,
    CurrentActivitySerializer, HikerLoginSerializer
)


class Signup(View):
    form_class = SignupForm
    initial = {}
    success_url = reverse_lazy('hike_list')
    template_name = 'registration/register.html'

    def post(self, request, *args, **kwargs):
        form = self.form_class(request.POST or None)
        if form.is_valid():
            form.save()
            email = form.cleaned_data.get('email')
            raw_password = form.cleaned_data.get('password1')
            user = authenticate(email=email, password=raw_password)

            # Add to hikers group
            hikers_group = Group.objects.get(name='Hikers')
            hikers_group.user_set.add(user)

            # Login User
            login(request, user)

            return redirect(self.success_url)
        return render(request, self.template_name, {'form': form})

    def get(self, request, *args, **kwargs):
        form = self.form_class(initial=self.initial)
        return render(request, self.template_name, {'form': form})


@method_decorator(ensure_csrf_cookie, name='dispatch')
class LoginView(auth_views.LoginView):
    form_class = LoginForm
    initial = {}
    success_url = reverse_lazy('hike_list')
    template_name = 'registration/login.html'


# API Views

class CurrentUserAPI(generics.RetrieveAPIView):
    serializer_class = CurrentActivitySerializer
    permission_classes = [permissions.IsAuthenticated, ]

    def get_object(self):
        return self.request.user

    # def get(self, request):
    #     user = request.user or None
    #
    #     if not user.is_authenticated or None:
    #         return Response({
    #             "status": 400,
    #             "message": "You must log in to access the current user api."
    #         }, status=status.HTTP_400_BAD_REQUEST)
    #
    #     serializer = self.serializer_class(user)
    #     return Response(serializer.data)


class HikersAPI(generics.ListAPIView):
    queryset = HikeUser.objects.all()
    serializer_class = HikerSerializer
    permission_classes = (permissions.IsAdminUser,)


class HikerAPI(generics.RetrieveAPIView):
    lookup_field = 'pk'
    queryset = HikeUser.objects.all()
    serializer_class = HikerSerializer
    permission_classes = (permissions.IsAdminUser,)


class HikerRegisterAPI(generics.GenericAPIView):
    serializer_class = HikerRegisterSerializer
    permission_classes = (permissions.AllowAny,)

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "user": HikerSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)
        }, status=status.HTTP_201_CREATED)


class HikerLoginAPI(generics.GenericAPIView):
    serializer_class = HikerLoginSerializer
    permission_classes = (permissions.AllowAny,)

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']

        login(request, user)

        return Response({
            "user": HikerSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(request.user)
        }, status=status.HTTP_201_CREATED)

# class HikerLogoutAPI(generics.GenericAPIView):

# class HikerRegisterAPI(generics.CreateAPIView):
#     serializer_class = HikerRegisterSerializer
#     queryset = HikeUser.objects.all()
#
#     # allowed_methods = ('POST', 'OPTIONS')
#
#     def post(self, request):
#         serializer = self.serializer_class(data=request.data)
#         if serializer.is_valid():
#             user = serializer.save()
#             if user:
#                 token = Token.objects.create(user=user)
#                 json = serializer.data
#                 json['token'] = token.key
#                 return Response(json, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
