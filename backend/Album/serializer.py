from rest_framework import serializers
from .models import Album
from Artist.models import Artist
from Track.serializer import TrackSerializer

class AlbumSerializer(serializers.ModelSerializer):
    artist_name = serializers.SerializerMethodField()
    artist_slug = serializers.SerializerMethodField()
    slug = serializers.SlugField(read_only=True)
    genres = serializers.SerializerMethodField()  
    tracks = TrackSerializer(many=True, read_only=True)

    class Meta:
        model = Album
        fields = ['id', 'title', 'ReleaseDate', 'price', 'Artist', 'genres', 'picture', 'bio', 'artist_name', 'artist_slug', 'slug', 'tracks']

    def get_artist_name(self, obj):
        return obj.Artist.user.name if obj.Artist and obj.Artist.user else None

    def get_artist_slug(self, obj):
        return obj.Artist.slug if obj.Artist else None

    def get_genres(self, obj):
        return [genre.name for genre in obj.genres.all()]  

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        if representation['picture']:
            representation['picture'] = self.context['request'].build_absolute_uri(representation['picture'])
        return representation
