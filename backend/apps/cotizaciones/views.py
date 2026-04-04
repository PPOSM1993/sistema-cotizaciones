from rest_framework import viewsets
from .models import Cotizacion
from .serializers import CotizacionSerializer
from rest_framework.permissions import IsAuthenticated

class CotizacionViewSet(viewsets.ModelViewSet):
    queryset = Cotizacion.objects.all()
    serializer_class = CotizacionSerializer
    permission_classes = [IsAuthenticated]