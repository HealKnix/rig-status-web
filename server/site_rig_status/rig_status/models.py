from django.db import models

# Create your models here.


class TechStatus(models.Model):
    name = models.CharField(max_length=255)

    class Meta:
        db_table = 'tech_status'


class DrillingStatus(models.Model):
    name = models.CharField(max_length=255)

    class Meta:
        db_table = 'drilling_status'


class Rig(models.Model):
    name = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    well_depth = models.IntegerField(help_text='Глубина скважины (сколько надо пробурить (в метрах))')
    bottom_hole_drilling = models.IntegerField(help_text='Глубина бурения (сколько пробурили (в метрах))')
    connection_speed = models.IntegerField(help_text='Скорость соединения (в Кб/с)')
    drilling_status_id = models.ForeignKey(DrillingStatus, on_delete=models.CASCADE)
    tech_status_id = models.ForeignKey(TechStatus, on_delete=models.CASCADE)
    tech_date = models.DateField()

    class Meta:
        db_table = 'rig'
        indexes = [
            models.Index(fields=['drilling_status_id']),
            models.Index(fields=['tech_status_id']),
        ]


class Sensor(models.Model):
    rig_id = models.ForeignKey(Rig, on_delete=models.CASCADE)
    unit = models.CharField(max_length=255)

    class Meta:
        db_table = 'sensor'
        indexes = [
            models.Index(fields=['rig_id']),
        ]


class SensorData(models.Model):
    sensor_id = models.ForeignKey(Sensor, on_delete=models.CASCADE)
    value = models.DecimalField(max_digits=8, decimal_places=2)

    class Meta:
        db_table = 'sensor_data'
        indexes = [
            models.Index(fields=['sensor_id']),
        ]
