from django.urls import path, include
from blog.views import (
    HikesListAPI, HikeAPI,
    HikeRequestsListAPI, HikeRequestAPI, HikeRequestFormAPI
)
from accounts.views import (
    HikersAPI, HikerAPI, CurrentUserAPI,
    HikerRegisterAPI, HikerLoginAPI,
)

from rest_auth.views import LoginView, LogoutView
# from rest_auth.registration.views import RegisterView

urlpatterns = [
    # Hikes
    path('hikes/', HikesListAPI.as_view(), name='hike_list_api'),
    path('hikes/<int:pk>/', HikeAPI.as_view(), name='hike_api'),
    path('hike-reqs/', HikeRequestsListAPI.as_view(), name='hike_requests_api'),
    path('hike-reqs/<int:pk>', HikeRequestAPI.as_view(), name='hike_request_api'),
    path('hike-reqs/register/', HikeRequestFormAPI.as_view(), name='hike_request_form_api'),

    # Accounts
    path('hikers/', HikersAPI.as_view(), name='hiker_list_api'),
    path('hikers/<int:pk>', HikerAPI.as_view(), name='hiker_api'),
    path('hikers/me/', CurrentUserAPI.as_view(), name='current_user_api'),

    # REST Auth
    path('auth-knox/', include('knox.urls')),
    path('auth/login/', HikerLoginAPI.as_view(), name='auth_login'),
    path('auth/logout/', LogoutView.as_view(), name='auth_logout'),
    path('auth/register/', HikerRegisterAPI.as_view(), name='auth_register')
]
