from django.contrib import admin
from django.urls import include, path
from django_js_reverse.views import urls_js

urlpatterns = [
    path('admin/', admin.site.urls),
    path('accounts/', include('accounts.urls')),
    path('hikes/', include('blog.urls')),
    path('api/', include('rest.urls')),
    path('jsreverse/', urls_js, name='js_reverse')
    # path('api-auth/', include('rest_framework.urls')),
]
