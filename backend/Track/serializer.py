from rest_framework import serializers 
from .models import Track 

class TrackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Track 
        fields = ['id', 'music_file', 'title', 'artist', 'album', 'duration', 'uploaded_at']