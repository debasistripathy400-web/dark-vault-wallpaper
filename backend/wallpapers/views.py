from rest_framework import viewsets, filters, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated, AllowAny
from .models import Wallpaper, Category, Tag, Collection, Favorite, Download
from .serializers import (
    WallpaperSerializer, CategorySerializer, TagSerializer, 
    CollectionSerializer, FavoriteSerializer, DownloadSerializer
)
import django_filters.rest_framework

class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    lookup_field = 'slug'

class TagViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer

class WallpaperViewSet(viewsets.ModelViewSet):
    queryset = Wallpaper.objects.filter(is_approved=True)
    serializer_class = WallpaperSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [django_filters.rest_framework.DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['category__slug', 'resolution']
    search_fields = ['title', 'description', 'tags__name']
    ordering_fields = ['uploaded_at', 'views', 'downloads']
    ordering = ['-uploaded_at']

    def perform_create(self, serializer):
        serializer.save(uploader=self.request.user)

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.views += 1
        instance.save()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

    @action(detail=True, methods=['post'], permission_classes=[IsAuthenticated])
    def favorite(self, request, pk=None):
        wallpaper = self.get_object()
        fav, created = Favorite.objects.get_or_create(user=request.user, wallpaper=wallpaper)
        if not created:
            fav.delete()
            return Response({'status': 'unfavorited'})
        return Response({'status': 'favorited'})

    @action(detail=True, methods=['post'], permission_classes=[AllowAny])
    def download(self, request, pk=None):
        instance = self.get_object()
        instance.downloads += 1
        instance.save()
        
        # Record history if user is logged in
        if request.user.is_authenticated:
            Download.objects.create(user=request.user, wallpaper=instance)
            
        return Response({'downloads': instance.downloads})

class CollectionViewSet(viewsets.ModelViewSet):
    serializer_class = CollectionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Collection.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class FavoriteViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = FavoriteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Favorite.objects.filter(user=self.request.user).order_by('-added_at')

class DownloadViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = DownloadSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Download.objects.filter(user=self.request.user).order_by('-downloaded_at')
