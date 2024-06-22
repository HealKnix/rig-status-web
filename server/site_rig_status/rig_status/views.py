from django.shortcuts import render

# Create your views here.

from rest_framework import viewsets
from drf_spectacular.utils import extend_schema, extend_schema_view
from .models import TechStatus, Sensor, SensorData, DrillingStatus, Rig, RigSensor
from .serializers import (
    TechStatusSerializer,
    SensorSerializer,
    SensorDataSerializer,
    DrillingStatusSerializer,
    RigSerializer,
    RigSensorSerializer
)


@extend_schema_view(
    list=extend_schema(tags=['Tech Statuses']),
    retrieve=extend_schema(tags=['Tech Statuses']),
    create=extend_schema(tags=['Tech Statuses']),
    update=extend_schema(tags=['Tech Statuses']),
    partial_update=extend_schema(tags=['Tech Statuses']),
    destroy=extend_schema(tags=['Tech Statuses']),
)
class TechStatusViewSet(viewsets.ModelViewSet):
    queryset = TechStatus.objects.all()
    serializer_class = TechStatusSerializer


@extend_schema_view(
    list=extend_schema(tags=['Sensors']),
    retrieve=extend_schema(tags=['Sensors']),
    create=extend_schema(tags=['Sensors']),
    update=extend_schema(tags=['Sensors']),
    partial_update=extend_schema(tags=['Sensors']),
    destroy=extend_schema(tags=['Sensors']),
)
class SensorViewSet(viewsets.ModelViewSet):
    queryset = Sensor.objects.all()
    serializer_class = SensorSerializer


@extend_schema_view(
    list=extend_schema(tags=['Sensor Data']),
    retrieve=extend_schema(tags=['Sensor Data']),
    create=extend_schema(tags=['Sensor Data']),
    update=extend_schema(tags=['Sensor Data']),
    partial_update=extend_schema(tags=['Sensor Data']),
    destroy=extend_schema(tags=['Sensor Data']),
)
class SensorDataViewSet(viewsets.ModelViewSet):
    queryset = SensorData.objects.all()
    serializer_class = SensorDataSerializer


@extend_schema_view(
    list=extend_schema(tags=['Drilling Statuses']),
    retrieve=extend_schema(tags=['Drilling Statuses']),
    create=extend_schema(tags=['Drilling Statuses']),
    update=extend_schema(tags=['Drilling Statuses']),
    partial_update=extend_schema(tags=['Drilling Statuses']),
    destroy=extend_schema(tags=['Drilling Statuses']),
)
class DrillingStatusViewSet(viewsets.ModelViewSet):
    queryset = DrillingStatus.objects.all()
    serializer_class = DrillingStatusSerializer


@extend_schema_view(
    list=extend_schema(tags=['Rigs']),
    retrieve=extend_schema(tags=['Rigs']),
    create=extend_schema(tags=['Rigs']),
    update=extend_schema(tags=['Rigs']),
    partial_update=extend_schema(tags=['Rigs']),
    destroy=extend_schema(tags=['Rigs']),
)
class RigViewSet(viewsets.ModelViewSet):
    queryset = Rig.objects.all()
    serializer_class = RigSerializer


@extend_schema_view(
    list=extend_schema(tags=['Rig Sensors']),
    retrieve=extend_schema(tags=['Rig Sensors']),
    create=extend_schema(tags=['Rig Sensors']),
    update=extend_schema(tags=['Rig Sensors']),
    partial_update=extend_schema(tags=['Rig Sensors']),
    destroy=extend_schema(tags=['Rig Sensors']),
)
class RigSensorViewSet(viewsets.ModelViewSet):
    queryset = RigSensor.objects.all()
    serializer_class = RigSensorSerializer
