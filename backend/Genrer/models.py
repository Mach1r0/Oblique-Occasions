from django.db import models
from core.models import DefaultModel

class Genrer(DefaultModel):
    picture = models.ImageField(upload_to='genrer-img/', blank=True, null=True)
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name
