from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.core.validators import RegexValidator


# 🔧 MANAGER
class UserManager(BaseUserManager):
    def create_user(self, email, username, first_name, last_name, password=None, rut=None, **extra_fields):
        if not email:
            raise ValueError('El usuario debe tener un correo electrónico')
        if not username:
            raise ValueError('El usuario debe tener un nombre de usuario')

        email = self.normalize_email(email)

        user = self.model(
            email=email,
            username=username,
            first_name=first_name,
            last_name=last_name,
            rut=rut,
            **extra_fields
        )

        user.set_password(password)
        user.is_active = True  # MVP: activo por defecto
        user.save(using=self._db)
        return user

    def create_superuser(self, email, username, first_name, last_name, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)

        if not extra_fields.get('is_staff'):
            raise ValueError('El superusuario debe tener is_staff=True.')
        if not extra_fields.get('is_superuser'):
            raise ValueError('El superusuario debe tener is_superuser=True.')

        return self.create_user(
            email,
            username,
            first_name,
            last_name,
            password=password,
            **extra_fields
        )


# 🇨🇱 VALIDADOR RUT
rut_validator = RegexValidator(
    regex=r'^(\d{7,8})-([\dkK])$',
    message='El RUT debe tener el formato 12345678-5.'
)


# 👤 MODELO USER
class User(AbstractBaseUser, PermissionsMixin):

    ROLE_CHOICES = (
        ('admin', 'Admin'),
        ('agent', 'Vendedor'),
        ('client', 'Cliente'),
    )

    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='agent')

    email = models.EmailField(unique=True)
    username = models.CharField(max_length=150, unique=True)

    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)

    rut = models.CharField(
        max_length=20,
        unique=True,
        null=True,
        blank=True,
        validators=[rut_validator]
    )

    phone = models.CharField(max_length=20, blank=True, null=True)
    birth_date = models.DateField(blank=True, null=True)
    accepted_terms = models.BooleanField(default=False)

    is_active = models.BooleanField(default=True)   # MVP: activo por defecto
    is_staff = models.BooleanField(default=False)

    date_joined = models.DateTimeField(auto_now_add=True)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'first_name', 'last_name']

    def __str__(self):
        return f"{self.username} ({self.email})"

    def save(self, *args, **kwargs):
        if self.is_superuser:
            self.role = "admin"
        super().save(*args, **kwargs)


