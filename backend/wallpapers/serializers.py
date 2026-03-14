from rest_framework import serializers
from .models import Wallpaper, Category, Tag, Collection, Favorite, Download
from accounts.serializers import UserSerializer

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = '__all__'

class WallpaperSerializer(serializers.ModelSerializer):
    category_details = CategorySerializer(source='category', read_only=True)
    tags_details = TagSerializer(source='tags', many=True, read_only=True)
    uploader_details = UserSerializer(source='uploader', read_only=True)
    
    class Meta:
        model = Wallpaper
        fields = '__all__'
        read_only_fields = ('uploader', 'views', 'downloads', 'is_approved', 'is_trending')

class CollectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Collection
        fields = '__all__'

class FavoriteSerializer(serializers.ModelSerializer):
    wallpaper_details = WallpaperSerializer(source='wallpaper', read_only=True)
    class Meta:
        model = Favorite
        fields = '__all__'

class DownloadSerializer(serializers.ModelSerializer):
    wallpaper_details = WallpaperSerializer(source='wallpaper', read_only=True)
    class Meta:
        model = Download
        fields = '__all__'
