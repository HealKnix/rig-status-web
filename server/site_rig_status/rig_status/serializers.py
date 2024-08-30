from rest_framework import serializers

from .models import (
    TechStatus,
    Sensor,
    SensorData,
    DrillingStatus,
    Rig,
    Robot,
    RobotStatus,
    SensorStatus,
    Subsystem,
)


class LoginSerializer(serializers.Serializer):
    email = serializers.CharField(required=True)
    password = serializers.CharField(required=True, write_only=True)


class LogoutSerializer(serializers.Serializer):
    pass


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


class RobotSerializer(serializers.ModelSerializer):
    class Meta:
        model = Robot
        fields = '__all__'


class RobotStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = RobotStatus
        fields = '__all__'


class SensorStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = SensorStatus
        fields = '__all__'


class SubsystemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subsystem
        fields = '__all__'
