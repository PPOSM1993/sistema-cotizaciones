from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()
router.register(r'admin/users', AdminUserViewSet)

urlpatterns = [
    path('auth/register/', RegisterView.as_view()),
    path('login/', LoginView.as_view()),
    path('auth/me/', ProfileView.as_view()),
    path('auth/update/', UpdateProfileView.as_view()),
    path('auth/change-password/', ChangePasswordView.as_view()),

    path('authentication/', include(router.urls)),
]