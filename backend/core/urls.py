from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from Artist.views import ArtistViewSet
from Genrer.views import GenrerViewSet
from Album.views import AlbumViewSet
from user.views import UserViewSet
from Track.views import TrackViewSet
from user.views import FollowViewSet
from django.conf import settings
from django.conf.urls.static import static

router = DefaultRouter()
router.register(r'artists', ArtistViewSet, basename='artists')
router.register(r'genrers', GenrerViewSet, basename='genrers')
router.register(r'albums', AlbumViewSet, basename='albums')
router.register(r'users', UserViewSet, basename='users')
router.register(r'track', TrackViewSet, basename='track')
router.register(r'follow', FollowViewSet, basename='follow')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/user/', include('user.urls')),
    path('api/albums/', include('Album.urls')),
    path('api/artists/<int:id>/', ArtistViewSet.as_view({'get': 'retrieve'}), name='artist-detail'),  # Change to use ID
    path('api/artists/<slug:slug>/albums/', ArtistViewSet.as_view({'get': 'albums'}), name='artist-albums'),    
    path('api/albums/name/<str:album_name>/', AlbumViewSet.as_view({'get': 'retrieve_by_name'}), name='album-detail-by-name'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)