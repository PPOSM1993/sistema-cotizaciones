from rest_framework import serializers
from .models import Producto


from rest_framework import serializers
from .models import Cotizacion, DetalleCotizacion
from apps.productos.models import Producto


class DetalleCotizacionSerializer(serializers.ModelSerializer):

    class Meta:
        model = DetalleCotizacion
        fields = ['producto', 'cantidad']

class CotizacionSerializer(serializers.ModelSerializer):

    detalles = DetalleCotizacionSerializer(many=True)

    class Meta:
        model = Cotizacion
        fields = ['id', 'cliente', 'estado', 'observaciones', 'detalles']

    def create(self, validated_data):
        detalles_data = validated_data.pop('detalles')

        cotizacion = Cotizacion.objects.create(**validated_data)

        subtotal = 0

        for detalle in detalles_data:
            producto = detalle['producto']
            cantidad = detalle['cantidad']

            precio = producto.precio
            sub = precio * cantidad

            DetalleCotizacion.objects.create(
                cotizacion=cotizacion,
                producto=producto,
                cantidad=cantidad,
                precio_unitario=precio,
                subtotal=sub
            )

            subtotal += sub

        iva = subtotal * 0.19
        total = subtotal + iva

        cotizacion.subtotal = subtotal
        cotizacion.iva = iva
        cotizacion.total = total
        cotizacion.save()

        return cotizacion