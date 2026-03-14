from django.contrib import admin
from django.utils.html import format_html
from .models import Wallpaper, Category, Tag, Collection, Favorite

class WallpaperAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'resolution', 'uploader', 'is_approved', 'is_trending')
    list_filter = ('category', 'resolution', 'is_approved', 'is_trending')
    search_fields = ('title', 'description', 'uploader__username')
    list_editable = ('is_approved', 'is_trending')

class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug', 'image_preview')
    prepopulated_fields = {'slug': ('name',)}
    fields = ('name', 'cover_image', 'slug')

    @admin.display(description='Preview')
    def image_preview(self, obj):
        if obj.cover_image:
            return format_html('<img src="{}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 5px;" />', obj.cover_image.url)
        return "-"

admin.site.register(Wallpaper, WallpaperAdmin)
admin.site.register(Category, CategoryAdmin)
admin.site.register(Tag)
admin.site.register(Collection)
admin.site.register(Favorite)
