from rest_framework import serializers
from .models import Album
from Artist.models import Artist 

class AlbumSerializer(serializers.ModelSerializer):
    artist_name = serializers.CharField(source='Artist.user.name', read_only=True)
    artist_id = serializers.PrimaryKeyRelatedField(
        queryset=Artist.objects.all(),
        source='Artist',
        write_only=True
    )

    class Meta:
        model = Album
        fields = ['id', 'title', 'ReleaseDate', 'price', 'artist_name', 'artist_id', 'genres', 'picture', 'bio']

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['Artist'] = representation.pop('artist_name')
        return representation