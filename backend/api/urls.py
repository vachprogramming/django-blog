from rest_framework.routers import DefaultRouter
from . import views
from django.urls import path, include

# DefaultRouter is a DRF class that automatically generates
# the URL patterns for our ViewSets.
router = DefaultRouter()

# router.register('url-prefix', ViewSetClass, basename='model-name')
router.register('universities', views.UniversityViewSet)
router.register('profiles', views.ProfileViewSet)
router.register('users', views.UserViewSet)
router.register('groups', views.StudyGroupViewSet)

urlpatterns = [
    path('', include(router.urls)),
]