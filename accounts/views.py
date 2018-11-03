from django.contrib.auth import login, authenticate
from django.shortcuts import render, redirect
from django.views import View
from django.urls import reverse_lazy
from django.contrib.auth import views as auth_views
from django.contrib.auth.models import Group

from rest_framework import generics
from rest_framework import authentication, permissions

from .forms import SignupForm, LoginForm
from .models import HikeUser
from .serializers import HikerSerializer


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


class MyLoginView(auth_views.LoginView):
    form_class = LoginForm
    initial = {}
    success_url = reverse_lazy('hike_list')
    template_name = 'registration/login.html'

    # def post(self, request, *args, **kwargs):
    #     form = self.form_class(request.POST or None)
    #     if form.is_valid():
    #         print("VALID")
    #         form.save()
    #
    #         email = form.cleaned_data.get('email')
    #         raw_password = form.cleaned_data.get('password1')
    #         user = authenticate(email=email, password=raw_password)
    #         login(request, user)
    #
    #         return redirect('hike_list')
    #     print("NOT VALID")
    #     return render(request, self.template_name, {'form': form})
    #
    # def get(self, request, *args, **kwargs):
    #     form = self.form_class(initial=self.initial)
    #     return render(request, self.template_name, {'form': form})


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
