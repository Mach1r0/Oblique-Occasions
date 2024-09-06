from rest_framework import serializers
from .models import User 
from rest_framework import serializers
from .models import User
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from rest_framework.authtoken.models import Token

User = get_user_model()

class RegisterSerializer(serializers.ModelSerializer): 
    email =  serializers.EmailField(required=True)
    username = serializers.CharField(required=True) 
    password = serializers.CharField(required=True, validators=[validate_password])
    
    class Meta: 
        model = User 
        fields =  [ 'name', 'email', 'username', 'password']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def validate(self, attrs):
        if User.objects.filter(email=attrs['email']).exists():
            raise serializers.ValidationError({'email': 'Email is already in use'})
    
        if User.objects.filter(username=attrs['username']).exists():
            raise serializers.ValidationError({'username': 'Username is already in use'})
        
        return attrs

    def create(self, validated_data):
        user = User.objects.create_user(
            name=validated_data['name'],
            email=validated_data['email'],
            username=validated_data['username'],
            password=validated_data['password']
        )
        return user

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(required=True, write_only=True)
    password = serializers.CharField(required=True, write_only=True)
    
    def validate(self, data):
        username = data.get('username')
        password = data.get('password')
        
        if not username or not password:
            raise serializers.ValidationError("username and password are required")
        
        if not User.objects.filter(username=username).exists():
            raise serializers.ValidationError("username is not valid")
        
        user = User.objects.filter(username=username).first()
        if user and not user.check_password(password):
            raise serializers.ValidationError("Password is not valid")
        
        return data
    
    def save(self, **kwargs):
        username = self.validated_data['username']
        user = User.objects.get(username=username)
        token, created = Token.objects.get_or_create(user=user)
        return {
            'token': token.key,
            'user_id': user.pk,
            'username': user.username
        }

class UserSerializer(serializers.ModelSerializer):
    slug = serializers.SlugField(read_only=True)
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    picture = serializers.ImageField(required=False)

    class Meta:
        model = User
        fields = ['name', 'picture', 'username', 'email', 'date_joined', 'is_active', 'slug', 'password']
        read_only_fields = ['date_joined', 'slug']

    def create(self, validated_data):
        picture = validated_data.pop('picture', None)
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            name=validated_data['name'],
            password=validated_data['password'],
            picture=picture  # Add this line
        )
        return user

    def update(self, instance, validated_data):
        if 'password' in validated_data:
            password = validated_data.pop('password')
            instance.set_password(password)
        if 'picture' in validated_data:
            instance.picture = validated_data.pop('picture')
        return super().update(instance, validated_data)

class SuperUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'name', 'username', 'email', 'date_joined', 'is_active', 'picture', 'slug', 'is_staff', 'is_superuser']
        read_only_fields = ['id', 'date_joined', 'slug']

    def create(self, validated_data):
        return User.objects.create_superuser(**validated_data)

    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)
        user = super().update(instance, validated_data)
        if password:
            user.set_password(password)
            user.save()
        return user