from django.shortcuts import render
from rest_framework import permissions, viewsets, status
from rest_framework.permissions import AllowAny
from Artist.models import Artist 
from rest_framework.views import APIView
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.contrib.auth import authenticate, get_user_model
from rest_framework_simplejwt.tokens import RefreshToken
from .models import User, Follow
import logging, datetime
from .serializer import UserSerializer, RegisterSerializer, LoginSerializer, FollowSerializer
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404

logger = logging.getLogger(__name__)
User = get_user_model()  

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def perform_create(self, serializer):
        picture = self.request.FILES.get('picture')
        serializer.save(picture=picture)

    def perform_update(self, serializer):
        picture = self.request.FILES.get('picture')
        serializer.save(picture=picture)

class LoginView(APIView):
    authentication_classes = []  
    permission_classes = [] 

    def post(self, request):
        print("Received data:", request.data)  
        serializer = LoginSerializer(data=request.data)
        if not serializer.is_valid():
            print("Serializer errors:", serializer.errors)  
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        username = serializer.validated_data['username']
        password = serializer.validated_data['password']

        user = authenticate(username=username, password=password)

        if user is None:
            return Response({'detail': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

        refresh = RefreshToken.for_user(user)
        access = refresh.access_token

        user_data = {
            'id': user.id,
            'username': user.username,
            'name': user.name,
            'email': user.email,
            'slug': user.slug,
            'picture': user.picture.url if user.picture else None  
        }
        
        return Response({
            'refresh': str(refresh),
            'access': str(access),
            'user': user_data
        }, status=status.HTTP_200_OK)
    
class CheckFollowStatusView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, user_id):
        try:
            target_user = User.objects.get(id=user_id)
            is_following = Follow.objects.filter(follower=request.user, following=target_user).exists()
            return Response({"is_following": is_following}, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({"message": "User not found"}, status=status.HTTP_404_NOT_FOUND)

class UpdateUserView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request):
        user = request.user
        serializer = UserSerializer(user, data=request.data, partial=True)
        print("Received data:", request.data)
        if serializer.is_valid():
            if 'picture' in request.FILES:
                user.picture = request.FILES['picture']
                print("Picture found in request", request.FILES['picture'])
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@method_decorator(csrf_exempt, name='dispatch')
class RegisterView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = []

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({
                "user": serializer.data,
                "message": "User Created Successfully.",
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class FollowArtistView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, artist_id):
        artist = get_object_or_404(Artist, id=artist_id)
        user = request.user

        if Follow.objects.filter(follower=user, following=artist.user).exists():
            return Response({"message": "You are already following this artist."}, status=status.HTTP_400_BAD_REQUEST)

        follow = Follow.objects.create(follower=user, following=artist.user)
        return Response({"message": f"You are now following {artist.user.name}"}, status=status.HTTP_201_CREATED)


class UnfollowArtistView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, artist_id):
        artist = get_object_or_404(Artist, id=artist_id)
        user = request.user

        follow = Follow.objects.filter(follower=user, following=artist.user).first()
        if not follow:
            return Response({"message": "You are not following this artist."}, status=status.HTTP_400_BAD_REQUEST)

        follow.delete()
        return Response({"message": f"You have unfollowed {artist.user.name}"}, status=status.HTTP_200_OK)



class UnfollowUserView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, user_id):
        logger.info(f"Attempting to unfollow user {user_id} by user {request.user.id}")
        try:
            follow = Follow.objects.get(follower=request.user, following_id=user_id)
            follow.delete()
            logger.info(f"User {request.user.id} successfully unfollowed user {user_id}")
            return Response({"message": "Unfollowed successfully"}, status=status.HTTP_200_OK)
        except Follow.DoesNotExist:
            logger.warning(f"Follow relationship not found for follower {request.user.id} and following {user_id}")
            return Response({"message": "You are not following this user"}, status=status.HTTP_400_BAD_REQUEST)

class UserFollowersView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, user_id):
        logger.info(f"Fetching followers for user with ID: {user_id}")
        try:
            user = User.objects.get(id=user_id)
            followers = Follow.objects.filter(following=user)
            followers_list = [follow.follower.username for follow in followers]
            logger.info(f"Followers retrieved: {followers_list}")
            return Response(followers_list, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            logger.error(f"User with ID {user_id} not found")
            return Response({"message": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        
class UserFollowingView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, user_id):
        try:
            user = User.objects.get(id=user_id)
            following = Follow.objects.filter(follower_id=user_id)
            following_list = []
            for follow in following:
                following_user = follow.following
                following_list.append({
                    'id': following_user.id,
                    'username': following_user.username,
                    'name': following_user.name,
                    'picture': following_user.picture.url if following_user.picture else None
                })
            return Response(following_list, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({"message": "User does not exist"}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            print(f"Error fetching following for user {user_id}: {e}")
            return Response({"message": "Internal server error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
               
class FollowUserView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, user_id):
        logger.info(f"Request headers: {request.headers}")
        logger.info(f"User {request.user.username} is trying to follow user with ID {user_id}")
        try:
            if user_id == request.user.id:
                return Response({"message": "You can't follow yourself"}, status=status.HTTP_400_BAD_REQUEST)
            following_user = User.objects.filter(id=user_id).first()
            if not following_user:
                return Response({"message": "User not found"}, status=status.HTTP_404_NOT_FOUND)
            follow, created = Follow.objects.get_or_create(follower=request.user, following=following_user)
            if created:
                return Response({"message": f"You are now following {following_user.username}"}, status=status.HTTP_201_CREATED)
            return Response({"message": f'You are already following {following_user.username}'}, status=status.HTTP_400_BAD_REQUEST)
        except User.DoesNotExist:
            return Response({"message": "User not found"}, status=status.HTTP_404_NOT_FOUND)

class FollowViewSet(viewsets.ModelViewSet):
    queryset = Follow.objects.all()
    serializer_class = FollowSerializer