from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer
from django.contrib.auth import authenticate, login, logout
from django.middleware.csrf import get_token
from drf_spectacular.utils import extend_schema_view
from rest_framework import viewsets, status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView

import docs
import models
import serializers


# Отправка уведомления о новом пользователе по Websocket
# channel_layer = get_channel_layer()
# async_to_sync(channel_layer.group_send)(
#     "notifications",
#     {
#         "type": "send_notification",
#         "message": "New user created",
#     }
# )


class LoginViewSet(APIView):
    queryset = models.User.objects.all()
    serializer_class = serializers.LoginSerializer
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = serializers.LoginSerializer(data=request.data)
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
    queryset = models.User.objects.all()
    permission_classes = [permissions.IsAuthenticated]

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


@extend_schema_view(**docs.TechStatusDocumentation())
class TechStatusViewSet(viewsets.ModelViewSet):
    queryset = models.TechStatus.objects.all()
    serializer_class = serializers.TechStatusSerializer


@extend_schema_view(**docs.SensorDocumentation())
class SensorViewSet(viewsets.ModelViewSet):
    queryset = models.Sensor.objects.all()
    serializer_class = serializers.SensorSerializer

    def list(self, request, *args, **kwargs):
        query_rig_id = self.request.query_params.get("rig_id")

        if query_rig_id is not None:
            filtered_queryset = models.Sensor.objects.filter(rig_id=query_rig_id)
            return Response(
                self.get_serializer(filtered_queryset, many=True).data,
                status=status.HTTP_200_OK
            )

        query_data = self.get_serializer(self.queryset, many=True).data
        return Response(query_data, status=status.HTTP_200_OK)


@extend_schema_view(**docs.SensorDataDocumentation())
class SensorDataViewSet(viewsets.ModelViewSet):
    queryset = models.SensorData.objects.all()
    serializer_class = serializers.SensorDataSerializer

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


@extend_schema_view(**docs.DrillingStatusDocumentation())
class DrillingStatusViewSet(viewsets.ModelViewSet):
    queryset = models.DrillingStatus.objects.all()
    serializer_class = serializers.DrillingStatusSerializer

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


@extend_schema_view(**docs.RigDocumentation())
class RigViewSet(viewsets.ModelViewSet):
    queryset = models.Rig.objects.all()
    serializer_class = serializers.RigSerializer

    def list(self, request, *args, **kwargs):
        channel_layer = get_channel_layer()
        async_to_sync(channel_layer.group_send)(
            "rig",
            {
                "type": "send_rig",
                "data": self.get_serializer(self.get_queryset().order_by('id'), many=True).data,
            }
        )
        return Response(self.get_serializer(self.queryset.order_by('id'), many=True).data, status=status.HTTP_200_OK)

    def partial_update(self, request, *args, **kwargs):
        kwargs['partial'] = True

        data = self.update(request, *args, **kwargs)

        channel_layer = get_channel_layer()
        async_to_sync(channel_layer.group_send)(
            "rig",
            {
                "type": "send_rig",
                "data": self.get_serializer(self.get_queryset(), many=True).data,
            }
        )

        return data


# @extend_schema_view(**RigDocumentation())
class DrillingFluidSystemViewSet(viewsets.ModelViewSet):
    queryset = models.DrillingFluidSystem.objects.all()
    serializer_class = serializers.DrillingFluidSystemSerializer


# @extend_schema_view(**RigDocumentation())
class SensorStatusViewSet(viewsets.ModelViewSet):
    queryset = models.SensorStatus.objects.all()
    serializer_class = serializers.SensorStatusSerializer


# @extend_schema_view(**RigDocumentation())
class DrillingMotorViewSet(viewsets.ModelViewSet):
    queryset = models.DrillingMotor.objects.all()
    serializer_class = serializers.DrillingMotorSerializer


# @extend_schema_view(**RigDocumentation())
class RobotStatusViewSet(viewsets.ModelViewSet):
    queryset = models.RobotStatus.objects.all()
    serializer_class = serializers.RobotStatusSerializer


# @extend_schema_view(**RigDocumentation())
class RobotViewSet(viewsets.ModelViewSet):
    queryset = models.Robot.objects.all()
    serializer_class = serializers.RobotSerializer


# @extend_schema_view(**RigDocumentation())
class HoistingSystemViewSet(viewsets.ModelViewSet):
    queryset = models.HoistingSystem.objects.all()
    serializer_class = serializers.HoistingSystemSerializer


# @extend_schema_view(**RigDocumentation())
class DefectoscopeViewSet(viewsets.ModelViewSet):
    queryset = models.Defectoscope.objects.all()
    serializer_class = serializers.DefectoscopeSerializer


# @extend_schema_view(**RigDocumentation())
class HydraulicPowerTongViewSet(viewsets.ModelViewSet):
    queryset = models.HydraulicPowerTong.objects.all()
    serializer_class = serializers.HydraulicPowerTongSerializer
