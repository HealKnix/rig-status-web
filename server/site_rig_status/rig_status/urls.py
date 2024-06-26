from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import (
    TechStatusViewSet,
    SensorViewSet,
    SensorDataViewSet,
    DrillingStatusViewSet,
    RigViewSet
)

router = DefaultRouter()
router.register(r'tech-statuses', TechStatusViewSet)
router.register(r'sensors', SensorViewSet)
router.register(r'sensor-data', SensorDataViewSet)
router.register(r'drilling-statuses', DrillingStatusViewSet)
router.register(r'rigs', RigViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
