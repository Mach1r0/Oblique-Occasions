from rest_framework import serializers
from .models import Album
from Artist.models import Artist

class AlbumSerializer(serializers.ModelSerializer):
    artist_name = serializers.SerializerMethodField()

    class Meta:
        model = Album
        fields = ['id', 'title', 'ReleaseDate', 'price', 'Artist', 'genres', 'picture', 'bio', 'artist_name']

    def get_artist_name(self, obj):
        return obj.Artist.user.name if obj.Artist and obj.Artist.user else None