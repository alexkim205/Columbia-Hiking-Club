from django.urls import path

from .views import HikesListView, HikePostView, HikeRequestView, ProfileView

urlpatterns = [
    path('', HikesListView.as_view(), name='hike_list'),
    path('<int:pk>/', HikePostView.as_view(), name='hike_detail'),
    path('request/', HikeRequestView.as_view(), name='hike_request'),
    path('profile/', ProfileView.as_view(), name='profile')
]

