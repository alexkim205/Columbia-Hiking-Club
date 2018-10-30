from django.contrib.auth import login, authenticate
from django.shortcuts import render, redirect
from django.views import View
from .forms import SignupForm


class Signup(View):
    form_class = SignupForm
    initial = {}
    template_name = 'registration/register.html'

    def post(self, request, *args, **kwargs):
        form = self.form_class(request.POST or None)
        if form.is_valid():
            form.save()

            username = form.cleaned_data.get('username')
            raw_password = form.cleaned_data.get('password1')
            user = authenticate(username=username, password=raw_password)
            login(request, user)

            return redirect('hike_list')
        return render(request, self.template_name, {'form': form})

    def get(self, request, *args, **kwargs):
        form = SignupForm(initial=self.initial)
        return render(request, self.template_name, {'form': form})
