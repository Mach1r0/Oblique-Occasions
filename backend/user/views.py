from django.shortcuts import render
from rest_framework import permissions, viewsets, status
from rest_framework.permissions import AllowAny
from Artist.models import Artist  # Adjust the import based on your project structure
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
            'slug': user.slug 
        }
        
        return Response({
            'refresh': str(refresh),
            'access': str(access),
            'user': user_data
        }, status=status.HTTP_200_OK)

class UpdateUserView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request):
        print("Received data:", request.data)
        user = request.user
        serializer = UserSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class FollowUserView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, user_id):
        logger.info(f"User {request.user.username} is trying to follow user with ID {user_id}")
        try:
            if user_id == request.user_id:
                return Response({"message": "You can't follow yourself"}, status=status.HTTP_400_BAD_REQUEST)
            following_user = User.objects.filter(id=user_id).first()
            follow, created = Follow.objects.get_or_create(follower=request.user, following=following_user)
            if created:
                return Response({"message": f"You are now following {following_user.username}"}, status=status.HTTP_201_CREATED)
            return Response({"message": f'You are already following {following_user.username}'}, status=status.HTTP_400_BAD_REQUEST)
        except User.DoesNotExist:
            return Response({"message": "User not found"}, status=status.HTTP_404_NOT_FOUND)

class FollowViewSet(viewsets.ModelViewSet):
    queryset = Follow.objects.all()
    serializer_class = FollowSerializer

class UserFollowingView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, user_id):
        try:
            user = User.objects.get(id=user_id)
            following = Follow.objects.filter(following=user)
            following_list = [following.follower for following in following]
            return Response(following_list, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({})

class UserFollowersView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, user_id):
        try:
            user = User.objects.get(id=user_id)
            followers = Follow.objects.filter(folowing_id=user_id)
            followers_list = [followers.follower for followers in followers]
            return Response(followers_list, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({"message": "User does exist"}, status=status.HTTP_400_BAD_REQUEST)
        
class UnfollowUserView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, user_id):
        try:
            follow = Follow.objects.get(follower=request.user, following_id=user_id)
            follow.delete()
            return Response({"message": "Unfollowed successfully"}, status=status.HTTP_204_NO_CONTENT)
        except Follow.DoesNotExist:
            return Response({"message": "You are not following this user"}, status=status.HTTP_400_BAD_REQUEST)
        
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
        try:
            artist = Artist.objects.get(id=artist_id)
            follow, created = Follow.objects.get_or_create(follower=request.user, following=artist)
            if created:
                return Response({"message": f"You are now following {artist.name}"}, status=status.HTTP_201_CREATED)
            return Response({"message": f'You are already following {artist.name}'}, status=status.HTTP_400_BAD_REQUEST)
        except Artist.DoesNotExist:
            return Response({"message": "Artist not found"}, status=status.HTTP_404_NOT_FOUND)