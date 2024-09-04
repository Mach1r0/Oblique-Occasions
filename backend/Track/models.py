from django.db import models
from Artist.models import Artist
from Album.models import Album
from datetime import datetime

class Track(models.Model):
    title = models.CharField(max_length=200)
    artist = models.ForeignKey(Artist, on_delete=models.CASCADE)
    album = models.ForeignKey(Album, related_name='tracks', on_delete=models.CASCADE)
    music_file = models.FileField(upload_to='music/', null=True, blank=True)
    duration = models.FloatField()
    uploaded_at = models.DateTimeField(default=datetime.now) 