from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.core.exceptions import ValidationError
from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _


# Create your models here.


class CustomUserManager(BaseUserManager):
    def create_user(self, email, username, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        if not username:
            raise ValueError('The Username field must be set')

        # Проверка на уникальность email
        if self.model.objects.filter(email=email).exists():
            raise ValidationError('A user with this email already exists.')

        # Проверка на уникальность username
        if self.model.objects.filter(username=username).exists():
            raise ValidationError('A user with this username already exists.')

        email = self.normalize_email(email)
        user = self.model(email=email, username=username, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, username, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValidationError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValidationError('Superuser must have is_superuser=True.')

        return self.create_user(email, username, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(_('Почта'), unique=True)
    password = models.CharField(_("Пароль"), max_length=128)
    username = models.CharField(_('Логин'), max_length=150)
    first_name = models.CharField(_('Имя'), max_length=30)
    last_name = models.CharField(_('Фамилия'), max_length=30)
    middle_name = models.CharField(_('Отчество'), max_length=30)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=True)
    date_joined = models.DateTimeField(default=timezone.now)
    last_login = models.DateTimeField(blank=True, null=True)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'first_name', 'last_name', 'middle_name']

    def __str__(self):
        return self.email


class TechStatus(models.Model):
    name = models.CharField(max_length=255)

    class Meta:
        db_table = 'tech_status'
        verbose_name_plural = 'Tech Statuses'


class DrillingStatus(models.Model):
    name = models.CharField(max_length=255)

    class Meta:
        db_table = 'drilling_status'
        verbose_name_plural = 'Drilling Statuses'


class Rig(models.Model):
    name = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    well_depth = models.IntegerField(help_text='Глубина скважины (сколько надо пробурить (в метрах))')
    bottom_hole_drilling = models.IntegerField(help_text='Глубина бурения (сколько пробурили (в метрах))')
    connection_speed = models.IntegerField(help_text='Скорость соединения (в Кб/с)')
    drilling_status_id = models.ForeignKey(
        DrillingStatus,
        on_delete=models.CASCADE,
        db_column="drilling_status_id"
    )
    tech_status_id = models.ForeignKey(
        TechStatus,
        on_delete=models.CASCADE,
        db_column="tech_status_id"
    )
    tech_date = models.DateField()

    class Meta:
        db_table = 'rig'
        verbose_name_plural = 'Rigs'
        indexes = [
            models.Index(fields=['drilling_status_id']),
            models.Index(fields=['tech_status_id']),
        ]

    def __str__(self):
        return self.name


class SensorStatus(models.Model):
    name = models.CharField(max_length=255)

    class Meta:
        db_table = 'sensor_status'
        verbose_name_plural = 'Sensor Statuses'

    def __str__(self):
        return self.name


class Sensor(models.Model):
    rig_id = models.ForeignKey(
        Rig,
        on_delete=models.CASCADE,
        db_column="rig_id"
    )

    name = models.CharField(max_length=255, null=True)
    unit = models.CharField(max_length=255)

    status_id = models.ForeignKey(
        SensorStatus,
        on_delete=models.CASCADE,
        db_column="status_id"
    )

    class Meta:
        db_table = 'sensor'
        verbose_name_plural = 'Sensors'
        indexes = [
            models.Index(fields=['rig_id']),
            models.Index(fields=['status_id']),
        ]

    def __str__(self):
        return self.name


class SensorData(models.Model):
    sensor_id = models.ForeignKey(
        Sensor,
        on_delete=models.CASCADE,
        db_column="sensor_id"
    )
    value = models.DecimalField(max_digits=8, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'sensor_data'
        verbose_name_plural = 'Sensor Data'
        indexes = [
            models.Index(fields=['sensor_id']),
        ]


class RobotStatus(models.Model):
    name = models.CharField(max_length=255)

    class Meta:
        db_table = 'robot_status'
        verbose_name_plural = 'Robot Statuses'


class Robot(models.Model):
    name = models.CharField(max_length=255)
    rig_id = models.ForeignKey(
        Rig,
        on_delete=models.CASCADE,
        db_column="rig_id"
    )
    pipe_count = models.IntegerField()
    status_id = models.ForeignKey(
        RobotStatus,
        on_delete=models.CASCADE,
        db_column="status_id"
    )

    class Meta:
        db_table = 'robot'
        verbose_name_plural = 'Robots'
        indexes = [
            models.Index(fields=['rig_id']),
            models.Index(fields=['status_id']),
        ]


# Элементы буровой установки (Rig)

class HoistingSystem(models.Model):
    rig_id = models.ForeignKey(
        Rig,
        on_delete=models.CASCADE,
        db_column="rig_id"
    )

    class Meta:
        db_table = 'hoisting_system'
        verbose_name_plural = 'Hoisting Systems'
        indexes = [
            models.Index(fields=['rig_id']),
        ]


class Defectoscope(models.Model):
    rig_id = models.ForeignKey(
        Rig,
        on_delete=models.CASCADE,
        db_column="rig_id"
    )
    frequency = models.DecimalField(max_digits=8, decimal_places=2)
    working_time = models.DecimalField(max_digits=8, decimal_places=2)
    ative = models.BooleanField(default=False)

    class Meta:
        db_table = 'defectoscope'
        verbose_name_plural = 'Defectoscopes'
        indexes = [
            models.Index(fields=['rig_id']),
        ]


class HydraulicPowerTong(models.Model):
    rig_id = models.ForeignKey(
        Rig,
        on_delete=models.CASCADE,
        db_column="rig_id"
    )
    screwing_torque = models.DecimalField(max_digits=8, decimal_places=2)
    unscrewing_torque = models.DecimalField(max_digits=8, decimal_places=2)
    spinner_torque = models.DecimalField(max_digits=8, decimal_places=2)
    active = models.BooleanField(default=False)

    class Meta:
        db_table = 'hydraulic_power_tong'
        verbose_name_plural = 'Hydraulic Power Tongs'
        indexes = [
            models.Index(fields=['rig_id']),
        ]


class DrillingMotor(models.Model):
    rig_id = models.ForeignKey(
        Rig,
        on_delete=models.CASCADE,
        db_column="rig_id"
    )
    axial_load = models.DecimalField(max_digits=8, decimal_places=2)
    shaft_rotation_speed = models.DecimalField(max_digits=8, decimal_places=2)
    momentum_force = models.DecimalField(max_digits=8, decimal_places=2)
    active = models.BooleanField(default=False)

    class Meta:
        db_table = 'drilling_motor'
        verbose_name_plural = 'Drilling Motors'
        indexes = [
            models.Index(fields=['rig_id']),
        ]


class DrillingFluidSystem(models.Model):
    rig_id = models.ForeignKey(
        Rig,
        on_delete=models.CASCADE,
        db_column="rig_id"
    )
    density = models.DecimalField(max_digits=8, decimal_places=2)
    viscosity = models.DecimalField(max_digits=8, decimal_places=2)
    filtration = models.DecimalField(max_digits=8, decimal_places=2)
    stability = models.BigIntegerField()
    suspended_particle_concentration = models.DecimalField(max_digits=8, decimal_places=2)
    active = models.BooleanField(default=False)

    class Meta:
        db_table = 'drilling_fluid_system'
        verbose_name_plural = 'Drilling Fluid Systems'
        indexes = [
            models.Index(fields=['rig_id']),
        ]
