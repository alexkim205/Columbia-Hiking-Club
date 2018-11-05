from django.views.generic import DetailView, ListView
from django.views import View
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from django.shortcuts import render, redirect, get_object_or_404

from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response

from .serializers import *
from .models import *
from .forms import *


# https://www.django-rest-framework.org/api-guide/generic-views/#generic-views


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


class HikeRequestView(View):
    form_class = HikeRequestForm
    initial = {}
    template_name = 'blog/hike_register.html'

    @method_decorator(login_required)
    def post(self, request, *args, **kwargs):
        form = self.form_class(request.POST.copy() or None)
        print(form)
        if form.is_valid():
            hikereq = form.save(commit=False)
            hikereq.save(user=request.user,
                         will_lead=form.cleaned_data.get('want_to_lead'))

            messages.info(request, 'Your hike was requested. We\'ll get back to you soon :)')
            return redirect('hike_list')

        return render(request, self.template_name, {'form': form})

    @method_decorator(login_required)
    def get(self, request, *args, **kwargs):
        form = self.form_class(initial=self.initial)
        return render(request, self.template_name, {'form': form})


class HikesListAPI(generics.ListAPIView):
    queryset = Hike.objects.all()
    serializer_class = HikeSerializer


class HikeRequestsListAPI(generics.ListCreateAPIView):
    queryset = HikeRequest.objects.all()
    serializer_class = HikeRequestSerializer


class HikeAPI(generics.RetrieveUpdateAPIView):
    lookup_field = 'pk'
    queryset = Hike.objects.all()
    serializer_class = HikeSerializer


class HikeRequestAPI(generics.RetrieveUpdateAPIView):
    lookup_field = 'pk'
    queryset = HikeRequest.objects.all()
    serializer_class = HikeRequestSerializer


# class HikeRequestFormAPI(RegisterView):
#     allowed_methods = ('GET', )
#     serializer_class = HikeRequestSerializer
#
#     def get(self, *args, **kwargs):
#         serializer = self.serializer_class()
#         return Response({'serializer': serializer}, status=status.HTTP_200_OK)
