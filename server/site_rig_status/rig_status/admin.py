from django.contrib import admin

from rig_status.models import TechStatus, Rig


# Register your models here.

class TechStatusAdmin(admin.ModelAdmin):
    list_display = ['name']

class RigAdmin(admin.ModelAdmin):
    list_display = ['name']


admin.site.register(TechStatus, TechStatusAdmin)
admin.site.register(Rig, RigAdmin)