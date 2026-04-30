from rest_framework.routers import DefaultRouter
from .views import (
    RegionViewSet, CityViewSet, CommuneViewSet,
    ClienteViewSet, ContactoClienteViewSet,
    ClienteFinanzaViewSet, ClienteCuentaViewSet
)

router = DefaultRouter()

router.register(r'regiones', RegionViewSet)
router.register(r'ciudades', CityViewSet)
router.register(r'comunas', CommuneViewSet)
router.register(r'clientes', ClienteViewSet)
router.register(r'contactos', ContactoClienteViewSet)
router.register(r'finanzas', ClienteFinanzaViewSet)
router.register(r'cuentas', ClienteCuentaViewSet)

urlpatterns = router.urls