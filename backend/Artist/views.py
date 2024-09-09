from django.shortcuts import render, get_object_or_404
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import action
from .models import Artist
from .serializer import ArtistSerializer
from Album.models import Album
from Album.serializer import AlbumSerializer

class ArtistViewSet(viewsets.ModelViewSet):
    queryset = Artist.objects.all()
    serializer_class = ArtistSerializer
    lookup_field = 'slug'  # Add this line

    @action(detail=True, methods=['get'])
    def albums(self, request, slug=None):
        artist = self.get_object()
        albums = Album.objects.filter(Artist=artist)
        serializer = AlbumSerializer(albums, many=True)
        return Response(serializer.data)
