from rest_framework import serializers
from .models import (
    TechStatus,
    Sensor,
    SensorData,
    DrillingStatus,
    Rig
)


class TechStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = TechStatus
        fields = '__all__'


class SensorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sensor
        fields = '__all__'


class SensorDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = SensorData
        fields = '__all__'


class DrillingStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = DrillingStatus
        fields = '__all__'


class RigSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rig
        fields = '__all__'