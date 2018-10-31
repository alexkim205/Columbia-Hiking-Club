from django.views.generic import DetailView, ListView
from django.views import View
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from django.shortcuts import render, redirect, get_object_or_404

from .models import *
from .forms import *


class HikePostView(DetailView):
    model = Hike
    context_object_name = 'hike_detail'
    template_name = 'blog/templates/blog/hike_detail.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        return context


class HikesListView(ListView):
    model = Hike
    context_object_name = 'hike_list'
    template_name = 'blog/templates/blog/hike_list.html'


class HikeRequestView(View):
    form_class = HikeRequestForm
    initial = {}
    template_name = 'blog/hike_register.html'

    @method_decorator(login_required)
    def post(self, request, *args, **kwargs):
        form = self.form_class(request.POST or None)
        print(form.errors)
        if form.is_valid():
            form.user_who_requested = request.user
            form.save()
            messages.info(request, 'Your hike was requested. We\'ll get back to you soon.')
            return redirect('hike_request')

        return render(request, self.template_name, {'form': form})

    @method_decorator(login_required)
    def get(self, request, *args, **kwargs):
        form = self.form_class(initial=self.initial)
        return render(request, self.template_name, {'form': form})
