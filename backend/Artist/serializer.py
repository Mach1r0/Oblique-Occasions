from rest_framework import serializers
from .models import Artist

class ArtistSerializer(serializers.ModelSerializer):
    name = serializers.CharField(source='user.name', read_only=True)
    picture = serializers.ImageField(source='user.picture', read_only=True)
    username = serializers.CharField(source='user.username', read_only=True)
    email = serializers.CharField(source='user.email', read_only=True )

    class Meta:
        model = Artist
        fields = ['id', 'user', 'name', 'username', 'email', 'bio', 'gender', 'picture']
