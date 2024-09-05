from django.shortcuts import render
from rest_framework import viewsets, status, permissions
from .models import Album
from .serializer import AlbumSerializer
from rest_framework.decorators import action
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from Artist.models import Artist
from rest_framework.parsers import MultiPartParser, FormParser

class AlbumViewSet(viewsets.ModelViewSet):
    queryset = Album.objects.all()
    serializer_class = AlbumSerializer
    parser_classes = (MultiPartParser, FormParser)

    def retrieve(self, request, pk=None):
        try:
            album = Album.objects.get(pk=pk)
            serializer = self.get_serializer(album)
            return Response(serializer.data)
        except Album.DoesNotExist:
            return Response({"detail": "Album not found"}, status=status.HTTP_404_NOT_FOUND)
        
    def get_serializer_context(self):
        context = super().get_serializer_context()
        context.update({"request": self.request})
        return context

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

    def list(self, request, artist_name=None):
        if artist_name:
            artist = get_object_or_404(Artist, user__name=artist_name)
            albums = Album.objects.filter(Artist=artist)
        else:
            albums = Album.objects.all()
        serializer = AlbumSerializer(albums, many=True, context=self.get_serializer_context())
        return Response(serializer.data)

    @action(detail=False, methods=['get'], url_path='name/(?P<album_name>[\w-]+)')
    def retrieve_by_name(self, request, album_name=None):
        album = get_object_or_404(Album, title__iexact=album_name.replace('-', ' '))
        serializer = self.get_serializer(album)
        return Response(serializer.data)

    def partial_update(self, request, *args, **kwargs):
        kwargs['partial'] = True
        return self.update(request, *args, **kwargs)