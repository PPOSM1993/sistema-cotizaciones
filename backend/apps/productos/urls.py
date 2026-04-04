from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter

from apps.clientes.views import ClienteViewSet
from apps.productos.views import ProductoViewSet, MarcaViewSet
from apps.cotizaciones.views import CotizacionViewSet


router = DefaultRouter()
router.register(r'clientes', ClienteViewSet)
router.register(r'productos', ProductoViewSet)
router.register(r'cotizaciones', CotizacionViewSet)
router.register(r'marcas', MarcaViewSet)



urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
]