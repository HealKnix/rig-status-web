from django.urls import path

from rig_status.consumers import SensorDataConsumer, RigConsumer

websocket_urlpatterns = [
    path('ws/sensor_data/', SensorDataConsumer.as_asgi()),
    path('ws/rig/', RigConsumer.as_asgi()),
]
