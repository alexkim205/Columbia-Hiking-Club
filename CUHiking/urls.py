from django.contrib import admin
from django.urls import include, path
# from django.contrib.auth import views as auth_views
from django.contrib.auth import urls as auth_urls

urlpatterns = [
    path('admin/', admin.site.urls),
    path('accounts/', include('accounts.urls')),
    path('accounts/', include(auth_urls)),
    path('hikes/', include('blog.urls'))
]
