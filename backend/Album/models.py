from django.db import models
from Artist.models import Artist 

class Album(models.Model):
    title = models.CharField(max_length=100, null=False, blank=False)
    ReleaseDate = models.DateTimeField()
    price = models.FloatField()
    ArtistId = models.ForeignKey(Artist, on_delete=models.CASCADE, blank=False, null=False)

    def __str__(self):
        return self.title
    