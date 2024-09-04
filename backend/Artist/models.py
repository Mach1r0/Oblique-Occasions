from django.db import models
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

    def __str__(self):
        return self.user.name