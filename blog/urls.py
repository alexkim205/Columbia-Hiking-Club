from django.urls import path

from .views import *

urlpatterns = [
    path('', HikesListView.as_view(), name='hike_list'),
    path('<int:pk>/', HikePostView.as_view(), name='hike_detail')
]