from django.contrib import admin
from django.urls import include, path


urlpatterns = [
    path('admin/', admin.site.urls),
    path('accounts/', include('accounts.urls')),
    path('hikes/', include('blog.urls')),
    path('api/', include('rest.urls')),
    # path('api-auth/', include('rest_framework.urls')),
]
