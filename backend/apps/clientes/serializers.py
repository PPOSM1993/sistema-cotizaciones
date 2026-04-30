from rest_framework import serializers
from .models import (
    Region,
    City,
    Commune,
    Cliente,
    ContactoCliente,
    ClienteFinanza,
    ClienteCuenta,
)


class RegionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Region
        fields = "__all__"


class CitySerializer(serializers.ModelSerializer):
    class Meta:
        model = City
        fields = "__all__"


class CommuneSerializer(serializers.ModelSerializer):
    class Meta:
        model = Commune
        fields = "__all__"


class ContactoClienteSerializer(serializers.ModelSerializer):

    class Meta:
        model = ContactoCliente
        fields = "__all__"

    def validate(self, data):
        if not data.get("email") and not data.get("telefono"):
            raise serializers.ValidationError(
                "El contacto debe tener al menos email o teléfono."
            )
        return data


class ClienteFinanzaSerializer(serializers.ModelSerializer):

    class Meta:
        model = ClienteFinanza
        fields = "__all__"

    def validate(self, data):
        if data["deuda"] > data["credito"]:
            raise serializers.ValidationError("La deuda no puede ser mayor al crédito.")
        return data


class ClienteCuentaSerializer(serializers.ModelSerializer):

    class Meta:
        model = ClienteCuenta
        fields = "__all__"


class ClienteSerializer(serializers.ModelSerializer):

    contactos = ContactoClienteSerializer(many=True, read_only=True)
    finanzas = ClienteFinanzaSerializer(many=True, read_only=True)
    cuentas = ClienteCuentaSerializer(many=True, read_only=True)

    class Meta:
        model = Cliente
        fields = "__all__"

    def validate_rut(self, value):
        return value.lower()

    def validate(self, data):

        # Validar coherencia región/comuna
        region = data.get("region")
        comuna = data.get("comuna")

        if comuna and region:
            if comuna.city.region != region:
                raise serializers.ValidationError(
                    "La comuna no pertenece a la región seleccionada."
                )

        return data
