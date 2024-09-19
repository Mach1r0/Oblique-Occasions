from .models import Album
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AlbumViewSet
from user.views import UserReviewViewset

router = DefaultRouter()
router.register(r'', AlbumViewSet, basename='create')

urlpatterns = [
    path('', include(router.urls)), 
     path('AlbumsReviewList/<int:album_id>/', UserReviewViewset.as_view({'get': 'listAlbumReviews'}), name='AlbumReviewsList'),
]