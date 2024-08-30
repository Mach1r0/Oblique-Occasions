from django.contrib import admin
from django.urls import path
from Artist.views import ArtistViewSet
from Genrer.views import GenrerViewSet
from rest_framework.routers import DefaultRouter
from django.conf.urls import include
from Album.views import AlbumViewSet
from user.views import UserViewSet


router = DefaultRouter()
router.register(r'artists', ArtistViewSet, basename='artists')
router.register(r'genrers', GenrerViewSet, basename='genrers')
router.register(r'albums', AlbumViewSet, basename='albums')
router.register(r'users', UserViewSet, basename='users')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
]
