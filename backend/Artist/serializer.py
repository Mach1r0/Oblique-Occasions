from rest_framework import serializers
from .models import Artist

class ArtistSerializer(serializers.ModelSerializer):
    name = serializers.CharField(source='user.name', read_only=True)
    picture = serializers.ImageField(source='user.picture', read_only=True)
    username = serializers.CharField(source='user.username', read_only=True)
    email = serializers.CharField(source='user.email', read_only=True)
    slug = serializers.SlugField(read_only=True)

    class Meta:
        model = Artist
        fields = ['id', 'user', 'name', 'username', 'email', 'bio', 'gender', 'picture', 'slug']

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        if representation['picture']:
            representation['picture'] = self.context['request'].build_absolute_uri(representation['picture'])
        return representation
