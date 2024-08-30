from django.urls import (
    path,
    include
)
from rest_framework.routers import DefaultRouter

from .views import (
    TechStatusViewSet,
    SensorViewSet,
    SensorDataViewSet,
    DrillingStatusViewSet,
    RigViewSet,
    RobotViewSet,
    SubsystemViewSet,
    SensorStatusViewSet,
    RobotStatusViewSet
)

router = DefaultRouter()
router.register(r'subsystems', SubsystemViewSet)
router.register(r'robot-statuses', RobotStatusViewSet)
router.register(r'robots', RobotViewSet)
router.register(r'sensor-statuses', SensorStatusViewSet)
router.register(r'sensors', SensorViewSet)
router.register(r'sensor-data', SensorDataViewSet)
router.register(r'tech-statuses', TechStatusViewSet)
router.register(r'drilling-statuses', DrillingStatusViewSet)
router.register(r'rigs', RigViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
