from rest_framework import viewsets
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.permissions import IsAuthenticated
from .models import Producto, Marca
from .serializers import ProductoSerializer, MarcaSerializer


class MarcaViewSet(viewsets.ModelViewSet):
    queryset = Marca.objects.all()
    serializer_class = MarcaSerializer
    permission_classes = [IsAuthenticated]


class ProductoViewSet(viewsets.ModelViewSet):

    queryset = Producto.objects.select_related('marca').all()
    serializer_class = ProductoSerializer
    permission_classes = [IsAuthenticated]

    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]

    filterset_fields = ['tipo', 'nombre', 'marca']
    search_fields = ['nombre', 'descripcion']
    ordering_fields = ['precio', 'created_at']