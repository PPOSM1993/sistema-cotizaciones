from rest_framework import serializers
from django.contrib.auth import get_user_model, authenticate
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

User = get_user_model()


# REGISTER
class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = [
            'email', 'username', 'first_name', 'last_name',
            'rut', 'phone', 'birth_date', 'accepted_terms',
            'password', 'password2'
        ]

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "No coinciden"})
        if not attrs.get("accepted_terms"):
            raise serializers.ValidationError({"accepted_terms": "Debes aceptar términos"})
        return attrs

    def create(self, validated_data):
        validated_data.pop('password2')
        password = validated_data.pop('password')

        return User.objects.create_user(password=password, **validated_data)


# LOGIN
class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    username_field = 'email'  # 🔥 CLAVE

    def validate(self, attrs):
        identifier = attrs.get("username")  # puedes dejarlo así
        password = attrs.get("password")

        user = None
        for field in ['email', 'username', 'rut']:
            user = User.objects.filter(**{field: identifier}).first()
            if user:
                break

        if not user:
            raise serializers.ValidationError("Credenciales incorrectas")

        # 🔥 CORREGIDO
        auth_user = authenticate(email=user.email, password=password)

        if not auth_user:
            raise serializers.ValidationError("Credenciales incorrectas")

        # 🔥 ahora usamos email
        data = super().validate({
            "email": auth_user.email,
            "password": password
        })

        data['user'] = {
            "id": auth_user.id,
            "email": auth_user.email,
            "username": auth_user.username,
            "role": auth_user.role,
        }

        return data

# USER
class UserSerializer(serializers.ModelSerializer):
    full_name = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = '__all__'
        read_only_fields = ['password']

    def get_full_name(self, obj):
        return f"{obj.first_name} {obj.last_name}"


# UPDATE
class UpdateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'phone', 'birth_date']


# CHANGE PASSWORD
class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField()
    new_password = serializers.CharField(validators=[validate_password])

    def validate(self, attrs):
        user = self.context['request'].user
        if not user.check_password(attrs['old_password']):
            raise serializers.ValidationError({"old_password": "Incorrecta"})
        return attrs

    def save(self):
        user = self.context['request'].user
        user.set_password(self.validated_data['new_password'])
        user.save()


# ADMIN
class AdminUserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = User
        fields = '__all__'

    def create(self, validated_data):
        password = validated_data.pop("password", "Temporal123!")
        return User.objects.create_user(password=password, **validated_data)

    def update(self, instance, validated_data):
        password = validated_data.pop("password", None)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        if password:
            instance.set_password(password)

        instance.save()
        return instance