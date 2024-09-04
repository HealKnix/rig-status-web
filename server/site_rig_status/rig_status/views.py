from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer
from django.contrib.auth import authenticate, login, logout
from django.contrib.sessions.models import Session
from django.middleware.csrf import get_token
from drf_spectacular.utils import extend_schema_view
from rest_framework import status, viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .docs import (
    DrillingStatusDocumentation,
    RigDocumentation,
    RobotDocumentation,
    RobotStatusDocumentation,
    SensorDataDocumentation,
    SensorDocumentation,
    SensorStatusDocumentation,
    SubsystemDocumentation,
    TechStatusDocumentation,
)
from .models import (
    DrillingStatus,
    Rig,
    Robot,
    RobotStatus,
    Sensor,
    SensorData,
    SensorStatus,
    Subsystem,
    TechStatus,
    User,
)
from .serializers import (
    DrillingStatusSerializer,
    LoginSerializer,
    LogoutSerializer,
    RigSerializer,
    RobotSerializer,
    RobotStatusSerializer,
    SensorDataSerializer,
    SensorSerializer,
    SensorStatusSerializer,
    SubsystemSerializer,
    TechStatusSerializer,
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


class AuthenticatedAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        try:
            sessionid = request.session.session_key
            session = Session.objects.get(session_key=sessionid)
            session_data = session.get_decoded()

            user_id = session_data.get("_auth_user_id")
            user = User.objects.get(id=user_id)

            return Response(
                {
                    "id": user.id,
                    "username": user.username,
                    "first_name": user.first_name,
                    "last_name": user.last_name,
                    "patronymic": user.patronymic,
                    "email": user.email,
                },
                status=status.HTTP_200_OK,
            )
        except (Session.DoesNotExist, User.DoesNotExist):
            return None


class LoginViewSet(APIView):
    queryset = User.objects.all()
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        email = serializer.validated_data["email"]
        password = serializer.validated_data["password"]

        user = authenticate(request, email=email, password=password)

        if user is not None:
            login(request, user)
            csrftoken = get_token(request)
            sessionid = request.session.session_key
            response = Response(
                {
                    "sessionid": sessionid,
                    "csrftoken": csrftoken,
                    "user": {
                        "id": user.id,
                        "username": user.username,
                        "first_name": user.first_name,
                        "last_name": user.last_name,
                        "patronymic": user.patronymic,
                        "email": user.email,
                    },
                },
                status=status.HTTP_200_OK,
            )

            response.set_cookie("sessionid", sessionid)
            response.set_cookie("csrftoken", csrftoken)

            return response
        else:
            return Response(
                {"error": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST
            )


class LogoutViewSet(APIView):
    queryset = User.objects.all()
    serializer_class = LogoutSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        logout(request)
        response = Response(
            {"detail": "Successfully logged out"}, status=status.HTTP_200_OK
        )

        response.delete_cookie("sessionid")
        response.delete_cookie("csrftoken")

        return response


@extend_schema_view(**TechStatusDocumentation())
class TechStatusViewSet(viewsets.ModelViewSet):
    queryset = TechStatus.objects.all()
    serializer_class = TechStatusSerializer
    permission_classes = [IsAuthenticated]


@extend_schema_view(**SensorDocumentation())
class SensorViewSet(viewsets.ModelViewSet):
    queryset = Sensor.objects.all()
    serializer_class = SensorSerializer
    permission_classes = [IsAuthenticated]

    def list(self, request, *args, **kwargs):
        query_rig_id = self.request.query_params.get("rig_id")
        query_subsystem_id = self.request.query_params.get("subsystem_id")

        filtered_queryset = self.get_queryset()

        if query_rig_id is not None:
            filtered_queryset = filtered_queryset.filter(rig_id=query_rig_id)

        if query_subsystem_id is not None:
            filtered_queryset = filtered_queryset.filter(
                subsystem_id=query_subsystem_id
            )

        query_data = self.get_serializer(filtered_queryset, many=True).data
        return Response(query_data, status=status.HTTP_200_OK)


@extend_schema_view(**SensorDataDocumentation())
class SensorDataViewSet(viewsets.ModelViewSet):
    queryset = SensorData.objects.all()
    serializer_class = SensorDataSerializer
    permission_classes = [IsAuthenticated]

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
            },
        )

        return Response(
            serializer.data, status=status.HTTP_201_CREATED, headers=headers
        )


@extend_schema_view(**DrillingStatusDocumentation())
class DrillingStatusViewSet(viewsets.ModelViewSet):
    queryset = DrillingStatus.objects.all()
    serializer_class = DrillingStatusSerializer
    permission_classes = [IsAuthenticated]

    # Кастомный JSON / Чтобы не забыть =)
    def list(self, request, *args, **kwargs):
        query_filter = self.request.query_params.get("filter")

        if query_filter is not None:
            return Response(
                [
                    {"data": self.get_serializer(self.queryset, many=True).data},
                    {"status": status.HTTP_200_OK},
                ],
                status=status.HTTP_200_OK,
            )

        query_data = self.get_serializer(self.get_queryset(), many=True).data
        return Response(query_data, status=status.HTTP_200_OK)


@extend_schema_view(**RigDocumentation())
class RigViewSet(viewsets.ModelViewSet):
    queryset = Rig.objects.all()
    serializer_class = RigSerializer
    permission_classes = [IsAuthenticated]

    def list(self, request, *args, **kwargs):
        channel_layer = get_channel_layer()
        async_to_sync(channel_layer.group_send)(
            "rig",
            {
                "type": "send_rig",
                "data": self.get_serializer(
                    self.get_queryset().order_by("id"), many=True
                ).data,
            },
        )
        return Response(
            self.get_serializer(self.queryset.order_by("id"), many=True).data,
            status=status.HTTP_200_OK,
        )

    def partial_update(self, request, *args, **kwargs):
        kwargs["partial"] = True

        data = self.update(request, *args, **kwargs)

        channel_layer = get_channel_layer()
        async_to_sync(channel_layer.group_send)(
            "rig",
            {
                "type": "send_rig",
                "data": self.get_serializer(self.get_queryset(), many=True).data,
            },
        )

        return data


@extend_schema_view(**SubsystemDocumentation())
class SubsystemViewSet(viewsets.ModelViewSet):
    queryset = Subsystem.objects.all()
    serializer_class = SubsystemSerializer
    permission_classes = [IsAuthenticated]


@extend_schema_view(**SensorStatusDocumentation())
class SensorStatusViewSet(viewsets.ModelViewSet):
    queryset = SensorStatus.objects.all()
    serializer_class = SensorStatusSerializer
    permission_classes = [IsAuthenticated]


@extend_schema_view(**RobotStatusDocumentation())
class RobotStatusViewSet(viewsets.ModelViewSet):
    queryset = RobotStatus.objects.all()
    serializer_class = RobotStatusSerializer
    permission_classes = [IsAuthenticated]


@extend_schema_view(**RobotDocumentation())
class RobotViewSet(viewsets.ModelViewSet):
    queryset = Robot.objects.all()
    serializer_class = RobotSerializer
    permission_classes = [IsAuthenticated]
