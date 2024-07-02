from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer
from django.contrib.auth import authenticate, login, logout
from django.middleware.csrf import get_token
from drf_spectacular.utils import extend_schema_view
from rest_framework import viewsets, status, permissions
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

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
    HydraulicPowerTong, User
)
from .serializers import (
    LoginSerializer,
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
    HydraulicPowerTongSerializer,
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

class LoginViewSet(APIView):
    queryset = User.objects.all()
    serializer_class = LoginSerializer
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        username = serializer.validated_data['username']
        password = serializer.validated_data['password']

        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            csrftoken = get_token(request)
            sessionid = request.session.session_key
            response = Response(
                {
                    'sessionid': sessionid,
                    'csrftoken': csrftoken,
                    'user': {
                        'id': user.id,
                        'username': user.username,
                        'first_name': user.first_name,
                        'last_name': user.last_name,
                        'middle_name': user.middle_name,
                        'email': user.email,
                    }
                },
                status=status.HTTP_200_OK
            )
            print(response.data)
            response.set_cookie('sessionid', sessionid)
            response.set_cookie('csrftoken', csrftoken)
            return response
        else:
            return Response(
                {
                    'error': 'Invalid credentials'
                },
                status=status.HTTP_400_BAD_REQUEST
            )


class LogoutViewSet(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        logout(request)
        response = Response(
            {
                'detail': 'Successfully logged out'
            },
            status=status.HTTP_200_OK
        )
        response.delete_cookie('sessionid')
        response.delete_cookie('csrftoken')
        return response


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
