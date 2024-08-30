from django.shortcuts import render
from rest_framework import viewsets
from .models import Genrer
from .serializer import GenrerSerializer

class GenrerViewSet(viewsets.ModelViewSet):
    queryset = Genrer.objects.all()
    serializer_class = GenrerSerializer