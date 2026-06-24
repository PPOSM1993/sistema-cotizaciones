from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from .models import (
    Region, City, Commune,
    Cliente, ContactoCliente,
    ClienteFinanza, ClienteCuenta
)

from .serializers import (
    RegionSerializer, CitySerializer, CommuneSerializer,
    ClienteSerializer, ContactoClienteSerializer,
    ClienteFinanzaSerializer, ClienteCuentaSerializer
)

class RegionViewSet(viewsets.ModelViewSet):
    queryset = Region.objects.all()
    serializer_class = RegionSerializer
    permission_classes = [IsAuthenticated]


class CityViewSet(viewsets.ModelViewSet):
    queryset = City.objects.all()
    serializer_class = CitySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = City.objects.all()
        region_id = self.request.query_params.get("region")

        if region_id:
            queryset = queryset.filter(region_id=region_id)

        return queryset


class CommuneViewSet(viewsets.ModelViewSet):
    queryset = Commune.objects.all()
    serializer_class = CommuneSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = Commune.objects.all()
        city_id = self.request.query_params.get("city")

        if city_id:
            queryset = queryset.filter(city_id=city_id)

        return queryset


class ClienteViewSet(viewsets.ModelViewSet):
    queryset = Cliente.objects.all().select_related(
        "region", "comuna", "vendedor"
    ).prefetch_related(
        "contactos", "finanzas", "cuentas"
    )
    serializer_class = ClienteSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(vendedor=self.request.user)


class ContactoClienteViewSet(viewsets.ModelViewSet):
    queryset = ContactoCliente.objects.all()
    serializer_class = ContactoClienteSerializer
    permission_classes = [IsAuthenticated]


class ClienteFinanzaViewSet(viewsets.ModelViewSet):
    queryset = ClienteFinanza.objects.all()
    serializer_class = ClienteFinanzaSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(actualizado_por=self.request.user)

class ClienteCuentaViewSet(viewsets.ModelViewSet):
    queryset = ClienteCuenta.objects.all()
    serializer_class = ClienteCuentaSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(actualizado_por=self.request.user)