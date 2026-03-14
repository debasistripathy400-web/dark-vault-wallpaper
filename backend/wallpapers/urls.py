from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import WallpaperViewSet, CategoryViewSet, TagViewSet, CollectionViewSet, FavoriteViewSet, DownloadViewSet

router = DefaultRouter()
router.register(r'wallpapers', WallpaperViewSet, basename='wallpaper')
router.register(r'categories', CategoryViewSet, basename='category')
router.register(r'tags', TagViewSet, basename='tag')
router.register(r'collections', CollectionViewSet, basename='collection')
router.register(r'favorites', FavoriteViewSet, basename='favorite')
router.register(r'downloads', DownloadViewSet, basename='download')

urlpatterns = [
    path('', include(router.urls)),
]
