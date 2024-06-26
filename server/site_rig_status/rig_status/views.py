from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer
from drf_spectacular.utils import extend_schema_view
from rest_framework import viewsets, status
from rest_framework.response import Response

from .docs import (
    TechStatusDocumentation,
    SensorDocumentation,
    SensorDataDocumentation,
    DrillingStatusDocumentation,
    RigDocumentation
)
from .models import (
    TechStatus,
    Sensor,
    SensorData,
    DrillingStatus,
    Rig,
    DrillingFluidSystem,
    SensorStatus,
    DrillingMotor,
    RobotStatus,
    Robot,
    HoistingSystem,
    Defectoscope,
    HydraulicPowerTong
)
from .serializers import (
    TechStatusSerializer,
    SensorSerializer,
    SensorDataSerializer,
    DrillingStatusSerializer,
    RigSerializer,
    DrillingFluidSystemSerializer,
    SensorStatusSerializer,
    DrillingMotorSerializer,
    RobotStatusSerializer,
    RobotSerializer,
    HoistingSystemSerializer,
    DefectoscopeSerializer,
    HydraulicPowerTongSerializer
)


# Отправка уведомления о новом пользователе
# channel_layer = get_channel_layer()
# async_to_sync(channel_layer.group_send)(
#     "notifications",
#     {
#         "type": "send_notification",
#         "message": "New user created",
#     }
# )

@extend_schema_view(**TechStatusDocumentation())
class TechStatusViewSet(viewsets.ModelViewSet):
    queryset = TechStatus.objects.all()
    serializer_class = TechStatusSerializer


@extend_schema_view(**SensorDocumentation())
class SensorViewSet(viewsets.ModelViewSet):
    queryset = Sensor.objects.all()
    serializer_class = SensorSerializer

    def list(self, request, *args, **kwargs):
        query_rig_id = self.request.query_params.get("rig_id")

        if query_rig_id is not None:
            filtered_queryset = Sensor.objects.filter(rig_id=query_rig_id)
            return Response(
                self.get_serializer(filtered_queryset, many=True).data,
                status=status.HTTP_200_OK
            )

        query_data = self.get_serializer(self.queryset, many=True).data
        return Response(query_data, status=status.HTTP_200_OK)


@extend_schema_view(**SensorDataDocumentation())
class SensorDataViewSet(viewsets.ModelViewSet):
    queryset = SensorData.objects.all()
    serializer_class = SensorDataSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)

        channel_layer = get_channel_layer()
        async_to_sync(channel_layer.group_send)(
            "sensor_data",
            {
                "type": "send_sensor_data",
                "data": serializer.data,
            }
        )

        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


@extend_schema_view(**DrillingStatusDocumentation())
class DrillingStatusViewSet(viewsets.ModelViewSet):
    queryset = DrillingStatus.objects.all()
    serializer_class = DrillingStatusSerializer

    # Кастомный JSON / Чтобы не забыть =)
    def list(self, request, *args, **kwargs):
        query_filter = self.request.query_params.get("filter")

        if query_filter is not None:
            return Response(
                [
                    {
                        "data": self.get_serializer(self.queryset, many=True).data
                    },
                    {
                        "status": status.HTTP_200_OK
                    }
                ],
                status=status.HTTP_200_OK
            )

        query_data = self.get_serializer(self.queryset, many=True).data
        return Response(query_data, status=status.HTTP_200_OK)


@extend_schema_view(**RigDocumentation())
class RigViewSet(viewsets.ModelViewSet):
    queryset = Rig.objects.all()
    serializer_class = RigSerializer


# @extend_schema_view(**RigDocumentation())
class DrillingFluidSystemViewSet(viewsets.ModelViewSet):
    queryset = DrillingFluidSystem.objects.all()
    serializer_class = DrillingFluidSystemSerializer


# @extend_schema_view(**RigDocumentation())
class SensorStatusViewSet(viewsets.ModelViewSet):
    queryset = SensorStatus.objects.all()
    serializer_class = SensorStatusSerializer


# @extend_schema_view(**RigDocumentation())
class DrillingMotorViewSet(viewsets.ModelViewSet):
    queryset = DrillingMotor.objects.all()
    serializer_class = DrillingMotorSerializer


# @extend_schema_view(**RigDocumentation())
class RobotStatusViewSet(viewsets.ModelViewSet):
    queryset = RobotStatus.objects.all()
    serializer_class = RobotStatusSerializer


# @extend_schema_view(**RigDocumentation())
class RobotViewSet(viewsets.ModelViewSet):
    queryset = Robot.objects.all()
    serializer_class = RobotSerializer


# @extend_schema_view(**RigDocumentation())
class HoistingSystemViewSet(viewsets.ModelViewSet):
    queryset = HoistingSystem.objects.all()
    serializer_class = HoistingSystemSerializer


# @extend_schema_view(**RigDocumentation())
class DefectoscopeViewSet(viewsets.ModelViewSet):
    queryset = Defectoscope.objects.all()
    serializer_class = DefectoscopeSerializer


# @extend_schema_view(**RigDocumentation())
class HydraulicPowerTongViewSet(viewsets.ModelViewSet):
    queryset = HydraulicPowerTong.objects.all()
    serializer_class = HydraulicPowerTongSerializer
