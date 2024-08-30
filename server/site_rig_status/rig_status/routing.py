from django.urls import path

from rig_status.consumers import SensorDataConsumer

websocket_urlpatterns = [
    path('ws/sensor_data/', SensorDataConsumer.as_asgi()),
]
