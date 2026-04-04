from rest_framework import serializers
from .models import Producto


class MarcaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Producto.marca.field.related_model
        fields = '__all__'

class ProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Producto
        fields = '__all__'