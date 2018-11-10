from django.contrib import admin
from django.urls import include, path
from django.views.generic import TemplateView

from django_js_reverse.views import urls_js

urlpatterns = [
    path('admin/', admin.site.urls),
    # path('accounts/', include('accounts.urls')),
    # path('hikes/', include('blog.urls')),
    path('', TemplateView.as_view(template_name='index.html'), name='index'), # connect to React
    path('api/', include('rest.urls')),
    path('jsreverse/', urls_js, name='js_reverse')
    # path('api-auth/', include('rest_framework.urls')),
]
