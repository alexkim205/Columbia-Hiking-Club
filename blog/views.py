from django.views.generic import DetailView, ListView
from django.shortcuts import get_object_or_404
from .models import *


# Create your views here.

# class LeaderView(DetailView):
#
#

class HikePostView(DetailView):

    model = Hike
    context_object_name = 'hike_detail'
    template_name = 'blog/hike_detail.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        return context

class HikesListView(ListView):

    model = Hike
    context_object_name = 'hike_list'
    template_name = 'blog/hike_list.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        return context
