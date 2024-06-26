from django.contrib import admin

from rig_status.models import TechStatus, Rig, Sensor, SensorStatus, DrillingStatus, SensorData


# Register your models here.

class TechStatusAdmin(admin.ModelAdmin):
    list_display = ['name']


class RigAdmin(admin.ModelAdmin):
    list_display = ['name']


class SensorAdmin(admin.ModelAdmin):
    list_display = ['name']


class SensorStatusAdmin(admin.ModelAdmin):
    list_display = ['name']


class DrillingStatusAdmin(admin.ModelAdmin):
    list_display = ['name']


class SensorDataAdmin(admin.ModelAdmin):
    list_display = ['id']


admin.site.register(TechStatus, TechStatusAdmin)
admin.site.register(Rig, RigAdmin)
admin.site.register(Sensor, SensorAdmin)
admin.site.register(SensorStatus, SensorStatusAdmin)
admin.site.register(DrillingStatus, DrillingStatusAdmin)
admin.site.register(SensorData, SensorDataAdmin)
