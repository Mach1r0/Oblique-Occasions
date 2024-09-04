from django.shortcuts import render
from .models import Track 
from rest_framework import viewsets
from .serializer import TrackSerializer

class TrackViewSet(viewsets.ModelViewSet):
    queryset = Track.objects.all()
    serializer_class = TrackSerializer