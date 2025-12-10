from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .api_views import ProductViewSet, CartViewSet
from .auth_views import AuthViewSet, OrderViewSet

router = DefaultRouter()
router.register(r'products', ProductViewSet, basename='product')
router.register(r'cart', CartViewSet, basename='cart')
router.register(r'auth', AuthViewSet, basename='auth')
router.register(r'orders', OrderViewSet, basename='order')

urlpatterns = [
    path('', include(router.urls)),
]
