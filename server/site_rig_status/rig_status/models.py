from django.db import models


# Create your models here.

class TechStatus(models.Model):
    name = models.CharField(max_length=255)

    class Meta:
        db_table = 'tech_status'
        ordering = ['id']
        verbose_name_plural = 'Tech Status'


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
        ordering = ['id']
        verbose_name_plural = 'Rigs'


class SensorStatus(models.Model):
    name = models.CharField(max_length=255)

    class Meta:
        db_table = 'sensor_status'


class Sensor(models.Model):
    rig_id = models.ForeignKey(Rig, on_delete=models.CASCADE)
    unit = models.CharField(max_length=255)
    status_id = models.ForeignKey(SensorStatus, on_delete=models.CASCADE)

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


class RobotStatus(models.Model):
    name = models.CharField(max_length=255)

    class Meta:
        db_table = 'robot_status'


class Robot(models.Model):
    name = models.CharField(max_length=255)
    rig_id = models.ForeignKey(Rig, on_delete=models.CASCADE)
    pipe_count = models.IntegerField()
    status_id = models.ForeignKey(RobotStatus, on_delete=models.CASCADE)

    class Meta:
        db_table = 'robot'
        indexes = [
            models.Index(fields=['rig_id']),
        ]


# Элементы буровой установки (Rig)

class HoistingSystem(models.Model):
    rig_id = models.ForeignKey(Rig, on_delete=models.CASCADE)

    class Meta:
        db_table = 'hoisting_system'


class Defectoscope(models.Model):
    rig_id = models.ForeignKey(Rig, on_delete=models.CASCADE)
    frequency = models.DecimalField(max_digits=8, decimal_places=2)
    working_time = models.DecimalField(max_digits=8, decimal_places=2)
    ative = models.BooleanField(default=False)

    class Meta:
        db_table = 'defectoscope'
        indexes = [
            models.Index(fields=['rig_id']),
        ]


class HydraulicPowerTong(models.Model):
    rig_id = models.ForeignKey(Rig, on_delete=models.CASCADE)
    screwing_torque = models.DecimalField(max_digits=8, decimal_places=2)
    unscrewing_torque = models.DecimalField(max_digits=8, decimal_places=2)
    spinner_torque = models.DecimalField(max_digits=8, decimal_places=2)
    active = models.BooleanField(default=False)

    class Meta:
        db_table = 'hydraulic_power_tong'
        indexes = [
            models.Index(fields=['rig_id']),
        ]


class DrillingMotor(models.Model):
    rig_id = models.ForeignKey(Rig, on_delete=models.CASCADE)
    axial_load = models.DecimalField(max_digits=8, decimal_places=2)
    shaft_rotation_speed = models.DecimalField(max_digits=8, decimal_places=2)
    momentum_force = models.DecimalField(max_digits=8, decimal_places=2)
    active = models.BooleanField(default=False)

    class Meta:
        db_table = 'drilling_motor'
        indexes = [
            models.Index(fields=['rig_id']),
        ]


class DrillingFluidSystem(models.Model):
    rig_id = models.ForeignKey(Rig, on_delete=models.CASCADE)
    density = models.DecimalField(max_digits=8, decimal_places=2)
    viscosity = models.DecimalField(max_digits=8, decimal_places=2)
    filtration = models.DecimalField(max_digits=8, decimal_places=2)
    stability = models.BigIntegerField()
    suspended_particle_concentration = models.DecimalField(max_digits=8, decimal_places=2)
    active = models.BooleanField(default=False)

    class Meta:
        db_table = 'drilling_fluid_system'
        indexes = [
            models.Index(fields=['rig_id']),
        ]
