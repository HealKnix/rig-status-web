from django.db import models


# Create your models here.


class TechStatus(models.Model):
    name = models.CharField(max_length=255)


class Sensor(models.Model):
    unit = models.CharField(max_length=255)


class SensorData(models.Model):
    sensor = models.ForeignKey(Sensor, on_delete=models.CASCADE)
    value = models.DecimalField(max_digits=8, decimal_places=2)

    class Meta:
        indexes = [
            models.Index(fields=['sensor']),
        ]


class DrillingStatus(models.Model):
    name = models.CharField(max_length=255)


class Rig(models.Model):
    name = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    well_depth = models.IntegerField(help_text='Глубина скважины (сколько надо пробурить (в метрах))')
    bottom_hole_drilling = models.IntegerField(help_text='Глубина бурения (сколько пробурили (в метрах))')
    connection_speed = models.IntegerField(help_text='Скорость соединения (в Кб/с)')
    drilling_status = models.ForeignKey(DrillingStatus, on_delete=models.CASCADE)
    tech_status = models.ForeignKey(TechStatus, on_delete=models.CASCADE)
    tech_date = models.DateField()

    class Meta:
        indexes = [
            models.Index(fields=['drilling_status']),
            models.Index(fields=['tech_status']),
        ]


class RigSensor(models.Model):
    rig = models.ForeignKey(Rig, on_delete=models.CASCADE)
    sensor = models.ForeignKey(Sensor, on_delete=models.CASCADE)

    class Meta:
        indexes = [
            models.Index(fields=['rig']),
            models.Index(fields=['sensor']),
        ]
