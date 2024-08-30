from django.db import models
from django.contrib.auth.models import ABaseUserManager, BaseUserManager
from core.models import DefaultModel
from django.utils.text import slugify

class UserManager(BaseUserManager):
    def create_user(self, name, email, username, password = )

        
class User(DefaultModel): 
    name = models.CharField(max_length=100)
    username = models.CharField(max_length=40)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128) 
    date_joined = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)
    picture = models.ImageField(upload_to='user-img/', blank=True, null=True)
    slug = models.SlugField(unique=True, blank=True)
    is_staff = models.BooleanField(default=False)

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['nome','username']
    
    def __str__(self):
        return self.name
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

        