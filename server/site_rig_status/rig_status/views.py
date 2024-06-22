from rest_framework import viewsets, status
from drf_spectacular.utils import extend_schema_view
from rest_framework.response import Response

from .docs import TechStatusDocumentation, SensorDocumentation, SensorDataDocumentation, DrillingStatusDocumentation, \
    RigDocumentation
from .models import TechStatus, Sensor, SensorData, DrillingStatus, Rig
from .serializers import (
    TechStatusSerializer,
    SensorSerializer,
    SensorDataSerializer,
    DrillingStatusSerializer,
    RigSerializer,
)


@extend_schema_view(**TechStatusDocumentation())
class TechStatusViewSet(viewsets.ModelViewSet):
    queryset = TechStatus.objects.all()
    serializer_class = TechStatusSerializer


@extend_schema_view(**SensorDocumentation())
class SensorViewSet(viewsets.ModelViewSet):
    queryset = Sensor.objects.all()
    serializer_class = SensorSerializer


@extend_schema_view(**SensorDataDocumentation())
class SensorDataViewSet(viewsets.ModelViewSet):
    queryset = SensorData.objects.all()
    serializer_class = SensorDataSerializer


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

        query_data = self.get_serializer(self.queryset, many=True)
        return Response(query_data.data, status=status.HTTP_200_OK)


@extend_schema_view(**RigDocumentation())
class RigViewSet(viewsets.ModelViewSet):
    queryset = Rig.objects.all()
    serializer_class = RigSerializer
