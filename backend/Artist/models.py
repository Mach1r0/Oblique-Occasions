from django.db import models
from user.models import User

class Artist(User):
    GENDER = [
        ('male', "Male"),
        ('female', "Female"),
        ("other", "Other")
    ]
    user = models.OneToOneField(User, on_delete=models.CASCADE, blank=True, null=True)
    bio = models.TextField()
    gender = models.CharField(choices=GENDER, default='male', max_length=6, null=True, blank=True)

    def __str__(self):
        return self.name
     