from django.db import models
from django.utils.text import slugify
from user.models import User

class Artist(models.Model):
    GENDER = [
        ('male', "Male"),
        ('female', "Female"),
        ("other", "Other")
    ]
    
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='artist_profile')
    bio = models.TextField()
    age = models.IntegerField(null=True, blank=True)
    gender = models.CharField(choices=GENDER, default='male', max_length=6, null=True, blank=True)
    slug = models.SlugField(unique=True, max_length=255)
    soundcloud = models.URLField(null=True, blank=True)
    spotify = models.URLField(null=True, blank=True)

    def __str__(self):
        return self.user.name

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.user.username)
        super().save(*args, **kwargs)