from django.urls import path
from .views import WatchlistViewSet, PositionViewSet, SoldAssetViewSet
from rest_framework.routers import DefaultRouter


router = DefaultRouter()
router.register(r'positions', PositionViewSet, basename='positions')
router.register(r'watchlist', WatchlistViewSet, basename='watchlist')
router.register(r'soldassets', SoldAssetViewSet, basename='soldassets')
urlpatterns = router.urls
