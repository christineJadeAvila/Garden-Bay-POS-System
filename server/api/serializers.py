from rest_framework import serializers
from app1.models import Corder

class CorderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Corder
        fields = '__all__'