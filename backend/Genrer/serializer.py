from rest_framework import serializers
from .models import Genrer

class GenrerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genrer
        fields = '__all__'