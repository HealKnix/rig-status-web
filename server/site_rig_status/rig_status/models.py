from django.contrib.auth.models import (
    AbstractBaseUser,
    BaseUserManager,
    PermissionsMixin,
)
from django.core.exceptions import ValidationError
from django.utils import timezone
from django.db import models
from django.utils.translation import gettext_lazy as _


# Create your models here.
class CustomUserManager(BaseUserManager):
    def create_user(self, email, username, password=None, **extra_fields):
        if not email:
            raise ValueError("The Email field must be set")
        if not username:
            raise ValueError("The Username field must be set")

        # Проверка на уникальность email
        if self.model.objects.filter(email=email).exists():
            raise ValidationError("A user with this email already exists.")

        # Проверка на уникальность username
        if self.model.objects.filter(username=username).exists():
            raise ValidationError("A user with this username already exists.")

        email = self.normalize_email(email)
        user = self.model(email=email, username=username, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, username, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        if extra_fields.get("is_staff") is not True:
            raise ValidationError("Superuser must have is_staff=True.")
        if extra_fields.get("is_superuser") is not True:
            raise ValidationError("Superuser must have is_superuser=True.")

        return self.create_user(email, username, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(_("Почта"), unique=True)
    password = models.CharField(_("Пароль"), max_length=128)
    username = models.CharField(_("Логин"), max_length=150)
    first_name = models.CharField(_("Имя"), max_length=30)
    last_name = models.CharField(_("Фамилия"), max_length=30)
    patronymic = models.CharField(_("Отчество"), max_length=30)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=True)
    date_joined = models.DateTimeField(default=timezone.now)
    last_login = models.DateTimeField(blank=True, null=True)

    objects = CustomUserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username", "first_name", "last_name", "patronymic"]

    def __str__(self):
        return self.email


class TechStatus(models.Model):
    name = models.CharField(max_length=255)

    class Meta:
        db_table = "tech_status"
        verbose_name_plural = "Tech Statuses"


class DrillingStatus(models.Model):
    name = models.CharField(max_length=255)

    class Meta:
        db_table = "drilling_status"
        verbose_name_plural = "Drilling Statuses"


class WellPad(models.Model):
    name = models.CharField(max_length=255)
    location = models.CharField(max_length=255)

    class Meta:
        db_table = "well_pad"
        verbose_name_plural = "Well Pads"


class WellType(models.Model):
    name = models.CharField(max_length=255)

    class Meta:
        db_table = "well_type"
        verbose_name_plural = "Well Types"


class Rig(models.Model):
    name = models.CharField(max_length=255)
    longitude = models.FloatField()
    latitude = models.FloatField()
    well_pad_id = models.ForeignKey(
        WellPad, on_delete=models.CASCADE, db_column="well_pad_id"
    )
    well_type_id = models.ForeignKey(
        WellType, on_delete=models.CASCADE, db_column="well_type_id"
    )
    well_number = models.FloatField()
    well_depth = models.FloatField()
    drilling_status_id = models.ForeignKey(
        DrillingStatus, on_delete=models.CASCADE, db_column="drilling_status_id"
    )
    tech_status_id = models.ForeignKey(
        TechStatus, on_delete=models.CASCADE, db_column="tech_status_id"
    )
    start_date = models.DateField(default=timezone.now)
    end_date_fact = models.DateField(null=True)
    end_date_plan = models.DateField()
    tech_date = models.DateField(null=True)

    class Meta:
        db_table = "rig"
        verbose_name_plural = "Rigs"

    def __str__(self):
        return self.name


class Screen(models.Model):
    name = models.CharField(max_length=255)
    rig_id = models.ForeignKey(Rig, on_delete=models.CASCADE, db_column="rig_id")
    ipv4 = models.GenericIPAddressField()
    ipv6 = models.GenericIPAddressField(null=True)
    mac_address = models.GenericIPAddressField()
    online = models.BooleanField(default=False)

    class Meta:
        db_table = "screen"
        verbose_name_plural = "Screens"
        indexes = [models.Index(fields=["mac_address"])]


class Subsystem(models.Model):
    rig_id = models.ForeignKey(Rig, on_delete=models.CASCADE, db_column="rig_id")
    name = models.CharField(max_length=255)
    description = models.CharField(max_length=255, null=True)
    active = models.BooleanField(default=False)

    class Meta:
        db_table = "subsystem"
        verbose_name_plural = "Subsystems"
        indexes = [
            models.Index(fields=["rig_id"]),
        ]


class SensorStatus(models.Model):
    name = models.CharField(max_length=255)

    class Meta:
        db_table = "sensor_status"
        verbose_name_plural = "Sensor Statuses"

    def __str__(self):
        return self.name


class SensorOutputType(models.Model):
    name = models.CharField(max_length=255)

    class Meta:
        db_table = "sensor_output_type"
        verbose_name_plural = "Sensor Output Types"


class Sensor(models.Model):
    rig_id = models.ForeignKey(Rig, on_delete=models.CASCADE, db_column="rig_id")
    subsystem_id = models.ForeignKey(
        Subsystem, on_delete=models.CASCADE, db_column="subsystem_id"
    )
    name = models.CharField(max_length=255)
    data_type = models.CharField(max_length=255)
    unit = models.CharField(max_length=255, null=True)
    status_id = models.ForeignKey(
        SensorStatus, on_delete=models.CASCADE, db_column="status_id"
    )
    min_value = models.FloatField()
    max_value = models.FloatField()
    output_type_id = models.ForeignKey(
        SensorOutputType, on_delete=models.CASCADE, db_column="output_type_id"
    )

    class Meta:
        db_table = "sensor"
        verbose_name_plural = "Sensors"
        indexes = [
            models.Index(fields=["rig_id"]),
        ]

    def __str__(self):
        return self.name


class SensorData(models.Model):
    sensor_id = models.ForeignKey(
        Sensor, on_delete=models.CASCADE, db_column="sensor_id"
    )
    value = models.DecimalField(max_digits=8, decimal_places=2)
    created_at = models.DateTimeField(default=timezone.now)

    class Meta:
        db_table = "sensor_data"
        verbose_name_plural = "Sensor Data"
        indexes = [
            models.Index(fields=["sensor_id"]),
        ]


class RobotStatus(models.Model):
    name = models.CharField(max_length=255)

    class Meta:
        db_table = "robot_status"
        verbose_name_plural = "Robot Statuses"


class Robot(models.Model):
    name = models.CharField(max_length=255)
    rig_id = models.ForeignKey(Rig, on_delete=models.CASCADE, db_column="rig_id")
    pipe_count = models.IntegerField()
    status_id = models.ForeignKey(
        RobotStatus, on_delete=models.CASCADE, db_column="status_id"
    )

    class Meta:
        db_table = "robot"
        verbose_name_plural = "Robots"
        indexes = [
            models.Index(fields=["rig_id"]),
        ]
