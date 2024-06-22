from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    TechStatusViewSet,
    SensorViewSet,
    SensorDataViewSet,
    DrillingStatusViewSet,
    RigViewSet,
    RigSensorViewSet
)

router = DefaultRouter()
router.register(r'tech-statuses', TechStatusViewSet)
router.register(r'sensors', SensorViewSet)
router.register(r'sensor-data', SensorDataViewSet)
router.register(r'drilling-statuses', DrillingStatusViewSet)
router.register(r'rigs', RigViewSet)
router.register(r'rig-sensors', RigSensorViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
