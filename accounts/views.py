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
from rest_framework.authtoken.models import Token

from .forms import SignupForm, LoginForm
from .models import HikeUser
from .serializers import HikerSerializer, HikerRegisterFormSerializer, CurrentActivitySerializer


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

class CurrentUserAPI(rest_views.APIView):
    lookup_field = 'pk'
    queryset = HikeUser.objects.all()
    serializer_class = CurrentActivitySerializer
    authentication_classes = (authentication.TokenAuthentication,)

    def get(self, request):
        user = request.user or None

        if not user.is_authenticated or None:
            return Response({
                "status": 400,
                "message": "You must log in to access the current user api."
            }, status=status.HTTP_400_BAD_REQUEST)
        serializer = self.serializer_class(user)
        return Response(serializer.data)


class HikersAPI(generics.ListAPIView):
    queryset = HikeUser.objects.all()
    serializer_class = HikerSerializer
    authentication_classes = (authentication.TokenAuthentication,)
    permission_classes = (permissions.IsAdminUser,)


class HikerAPI(generics.RetrieveAPIView):
    lookup_field = 'pk'
    queryset = HikeUser.objects.all()
    serializer_class = HikerSerializer
    authentication_classes = (authentication.TokenAuthentication,)
    permission_classes = (permissions.IsAdminUser,)


class HikerRegisterAPI(generics.CreateAPIView):
    serializer_class = HikerRegisterFormSerializer
    queryset = HikeUser.objects.all()

    # allowed_methods = ('POST', 'OPTIONS')

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                token = Token.objects.create(user=user)
                json = serializer.data
                json['token'] = token.key
                return Response(json, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
