from django.contrib import admin
from .models import Producto, Marca

# Register your models here.

admin.site.register(Marca)
admin.site.register(Producto)