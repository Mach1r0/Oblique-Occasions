from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
from core.models import DefaultModel
from django.utils.text import slugify
from Album.models import Album
from django.apps import apps

class UserManager(BaseUserManager):
    def create_user(self, name, email, username, password=None, **extra_fields):
        if not email:
            raise ValueError('Email field must be set')
        email = self.normalize_email(email)
        user = self.model(name=name, email=email, username=username, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, name, email, username, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True')
        
        return self.create_user(name, email, username, password, **extra_fields)
        

class User(AbstractUser):
    name = models.CharField(max_length=100)
    username = models.CharField(max_length=40, unique=True)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)
    date_joined = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)
    picture = models.ImageField(upload_to='user-img/', blank=True, null=True)
    slug = models.SlugField(unique=True, blank=True)
    is_staff = models.BooleanField(default=False)

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['name', 'email']
    
    def __str__(self):
        return self.name
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.username)
        super().save(*args, **kwargs)

class Follow(models.Model):
    follower = models.ForeignKey(User, on_delete=models.CASCADE, related_name='following') 
    following = models.ForeignKey(User, on_delete=models.CASCADE, related_name='followers')
    created_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ('follower', 'following')
    
    def __str__(self):
        return f'{self.follower} follows {self.following}'
    

from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.utils.text import slugify

class Review(models.Model):
    user = models.ForeignKey('user.User', on_delete=models.CASCADE, related_name='user_reviews')  # Usar string
    album = models.ForeignKey('Album.Album', on_delete=models.CASCADE, related_name='album_reviews')  # Usar string
    created_at = models.DateTimeField(auto_now=True)
    rating = models.IntegerField()

    def __str__(self):
        return f'{self.user} review for {self.album}'


