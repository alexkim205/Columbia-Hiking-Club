from django.urls import path, include
from blog.views import HikesListAPI, HikeAPI, HikeRequestsListAPI, HikeRequestAPI, HikeRequestFormAPI
from accounts.views import HikersAPI, HikerAPI, HikerRegisterAPI
from rest_auth.views import LoginView, LogoutView
# from rest_auth.registration.views import RegisterView

urlpatterns = [
    # Hikes
    path('hikes/', HikesListAPI.as_view(), name='hike_list_api'),
    path('hike/<int:pk>/', HikeAPI.as_view(), name='hike_api'),
    path('hike-reqs/', HikeRequestsListAPI.as_view(), name='hike_requests_api'),
    path('hike-req/<int:pk>', HikeRequestAPI.as_view(), name='hike_request_api'),
    path('hike-req/register/', HikeRequestFormAPI.as_view(), name='hike_request_form_api'),

    # Accounts
    path('hikers/', HikersAPI.as_view(), name='hiker_list_api'),
    path('hiker/<int:pk>', HikerAPI.as_view(), name='hiker_api'),

    # REST Auth
    path('login/', LoginView.as_view(), name='auth_login'),
    path('logout/', LogoutView.as_view(), name='auth_logout'),
    path('register/', HikerRegisterAPI.as_view(), name='auth_register')
]
