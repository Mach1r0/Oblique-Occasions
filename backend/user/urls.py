from django.urls import path
from .views import RegisterView, UserViewSet, LoginView, UpdateUserView, FollowUserView, UnfollowUserView, UserFollowingView, UserFollowersView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('register/', RegisterView.as_view(), name='Register'),
    path('login/', LoginView.as_view(), name='Login'),
    path('update/', UpdateUserView.as_view(), name='Update'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('follow/<int:user_id>/', FollowUserView.as_view(), name='Follow'), 
    path('unfollow/<int:user_id>/', UnfollowUserView.as_view(), name='Unfollow'),
    path('following/', UserFollowingView.as_view(), name='UserFollowing'),  
    path('followers/<int:user_id>/', UserFollowersView.as_view(), name='UserFollowers')  
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)