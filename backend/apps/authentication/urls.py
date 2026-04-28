from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()
router.register(r'admin/users', AdminUserViewSet)

urlpatterns = [
    path('auth/', include([
        path('register/', RegisterView.as_view()),
        path('login/', LoginView.as_view()),
        path('me/', ProfileView.as_view()),
        path('update/', UpdateProfileView.as_view()),
        path('change-password/', ChangePasswordView.as_view()),
    ])),

    path('', include(router.urls)),
]