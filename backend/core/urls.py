from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from Artist.views import ArtistViewSet
from Genrer.views import GenrerViewSet
from Album.views import AlbumViewSet
from user.views import UserViewSet
from Track.views import TrackViewSet
from django.conf import settings
from django.conf.urls.static import static

router = DefaultRouter()
router.register(r'artists', ArtistViewSet, basename='artists')
router.register(r'genrers', GenrerViewSet, basename='genrers')
router.register(r'albums', AlbumViewSet, basename='albums')
router.register(r'users', UserViewSet, basename='users')
router.register(r'track', TrackViewSet, basename='track' )

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/user/', include('user.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
