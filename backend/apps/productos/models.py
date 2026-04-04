from django.db import models

class Marca(models.Model):
    nombre = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.nombre

class Producto(models.Model):

    TIPO_CHOICES = [
        ('maquinaria', 'Maquinaria'),
        ('repuesto', 'Repuesto'),
    ]

    nombre = models.CharField(max_length=255)
    descripcion = models.TextField(blank=True)

    tipo = models.CharField(max_length=20, choices=TIPO_CHOICES)

    marca = models.ForeignKey(
        Marca,
        on_delete=models.PROTECT,
        related_name='productos'
    )

    modelo = models.CharField(max_length=100, blank=True, null=True)
    codigo = models.CharField(max_length=100, blank=True, null=True)

    precio = models.DecimalField(max_digits=12, decimal_places=2)
    stock = models.IntegerField()

    activo = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.nombre} - {self.marca.nombre}"