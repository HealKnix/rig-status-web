from rest_framework import serializers

from .models import (
    TechStatus,
    Sensor,
    SensorData,
    DrillingStatus,
    Rig,
    Robot,
    RobotStatus,
    DrillingMotor,
    SensorStatus,
    DrillingFluidSystem,
    HoistingSystem,
    Defectoscope,
    HydraulicPowerTong,
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


class DrillingMotorSerializer(serializers.ModelSerializer):
    class Meta:
        model = DrillingMotor
        fields = '__all__'


class DefectoscopeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Defectoscope
        fields = '__all__'


class HydraulicPowerTongSerializer(serializers.ModelSerializer):
    class Meta:
        model = HydraulicPowerTong
        fields = '__all__'


class DrillingFluidSystemSerializer(serializers.ModelSerializer):
    class Meta:
        model = DrillingFluidSystem
        fields = '__all__'


class RobotStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = RobotStatus
        fields = '__all__'


class SensorStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = SensorStatus
        fields = '__all__'


class HoistingSystemSerializer(serializers.ModelSerializer):
    class Meta:
        model = HoistingSystem
        fields = '__all__'
