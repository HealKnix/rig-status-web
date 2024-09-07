from django.urls import path

from .consumers import SensorDataConsumer

websocket_urlpatterns = [
    path('ws/sensor_data/<str:room_name>/', SensorDataConsumer.as_asgi()),
]
