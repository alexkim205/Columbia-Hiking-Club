from django.urls import path
from blog.views import HikesListAPI, HikeRequestsListAPI, HikeAPI
from accounts.views import HikersAPI, HikerAPI

urlpatterns = [
    path('hikes/', HikesListAPI.as_view(), name='hike_list_api'),
    path('hike/<int:pk>/', HikeAPI.as_view(), name='hike_api'),
    path('hike-requests/', HikeRequestsListAPI.as_view(), name='hike_requests_api'),

    path('hikers/', HikersAPI.as_view(), name='hiker_list_api'),
    path('hiker/<int:pk>', HikerAPI.as_view(), name='hiker_api')
]
