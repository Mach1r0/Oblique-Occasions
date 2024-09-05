from rest_framework import serializers
from .models import Album

class AlbumSerializer(serializers.ModelSerializer):
    class Meta:
        model = Album
        fields = ['id', 'title', 'ReleaseDate', 'price', 'Artist', 'genres', 'picture', 'bio']