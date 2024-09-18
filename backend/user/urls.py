from django.urls import path
from .views import RegisterView, UserReviewViewset, UserViewSet, LoginView, UpdateUserView, FollowUserView, UnfollowUserView, UserFollowingView, UserFollowersView, FollowArtistView, UnfollowArtistView, CheckFollowStatusView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('reviewList/<int:user_id>/', UserReviewViewset.as_view({'get': 'list', 'post': 'create'}), name='UserReviewList'), 
    path('review/<int:user_id>/<int:album_id>/', UserReviewViewset.as_view({'post': 'create'}), name='UserReviewCreate'),
    path('register/', RegisterView.as_view(), name='Register'),
    path('login/', LoginView.as_view(), name='Login'),
    path('update/', UpdateUserView.as_view(), name='Update'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('follow/<int:user_id>/', FollowUserView.as_view(), name='follow_user'),
    path('unfollow/<int:user_id>/', UnfollowUserView.as_view(), name='unfollow_user'),
    path('following/<int:user_id>/', UserFollowingView.as_view(), name='UserFollowing'),  
    path('followers/<int:user_id>/', UserFollowersView.as_view(), name='UserFollowers'),
    path('follow/artist/<int:artist_id>/', FollowArtistView.as_view(), name='follow_artist'),
    path('unfollow/artist/<int:artist_id>/', UnfollowArtistView.as_view(), name='unfollow_artist'),
    path('check-follow-status/<int:artist_id>/', CheckFollowStatusView.as_view(), name='check_follow_status'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)