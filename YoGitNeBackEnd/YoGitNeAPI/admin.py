from django.contrib import admin

from . import models

admin.site.register(models.MyUser)
admin.site.register(models.Lost)
admin.site.register(models.Found)
admin.site.register(models.Comment)
admin.site.register(models.Who_checked)