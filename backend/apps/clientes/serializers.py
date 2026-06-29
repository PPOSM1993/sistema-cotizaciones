from rest_framework import serializers
from .models import (
    Region,
    Province,
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

class ProvinceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Province
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
        read_only_fields = (
            "id",
            "vendedor",
            "created_at",
            "updated_at",
        )

    def validate_rut(self, value):
        return value.lower()

    def validate(self, data):

        region = data.get("region")
        provincia = data.get("provincia")
        ciudad = data.get("ciudad")
        comuna = data.get("comuna")

        if provincia and region:
            if provincia.region != region:
                raise serializers.ValidationError(
                    "La provincia no pertenece a la región seleccionada."
                )

        if ciudad and provincia:
            if ciudad.province != provincia:
                raise serializers.ValidationError(
                    "La ciudad no pertenece a la provincia seleccionada."
                )

        if comuna and ciudad:
            if comuna.city != ciudad:
                raise serializers.ValidationError(
                    "La comuna no pertenece a la ciudad seleccionada."
                )

        return data