"""melon URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path, re_path
from rest_framework import routers
from melon.users import views
from rest_framework.authtoken import views as view_token
from melon.contact import views as views_contact
from melon.home import views as views_home

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'groups', views.GroupViewSet)
router.register(r'contact', views_contact.ContactCreateListRetrieveViewSet)
router.register(r'contacts', views_contact.ContactList)
router.register(r'con', views_contact.ContactViewSet, basename='con')
# router.register(r'con', views_contact.ContactViewSet)
# router.register(r'api-token-auth/', views_contact.CustomAuthToken, basename='AuthToken')
# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [

    # path('', views_home.FrontendAppView.as_view(), name='home'),
    path('api/v1/', include([
        path('', include(router.urls)),
        path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
        path('api-token-auth/', views_contact.CustomAuthToken.as_view()),
        path('api-auth/', view_token.obtain_auth_token),
        path('admin/', admin.site.urls),
    ])),
    # path('api/v1/', include(router.urls)),
    # path('api/v1/api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    # path('api/v1/api-token-auth/', views_contact.CustomAuthToken.as_view()),
    # path('api/v1/api-auth/', view_token.obtain_auth_token),
    # # path('con/', views_contact.ContactViewSet.as_view({'get': 'list'})),
    # path('api/v1/admin/', admin.site.urls),
    # path('', views_home.index, name='home'),r'^.*'
    re_path(r'^.*', views_home.FrontendAppView.as_view(), name='home'),
]

