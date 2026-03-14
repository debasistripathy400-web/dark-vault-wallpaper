from django.db import models
from django.conf import settings

class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(max_length=100, unique=True)
    cover_image = models.ImageField(upload_to='category_covers/', blank=True, null=True)

    class Meta:
        verbose_name_plural = "Categories"

    def __str__(self):
        return self.name

class Tag(models.Model):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name

class Wallpaper(models.Model):
    RESOLUTION_CHOICES = (
        ('1080p', '1080p'),
        ('1440p', '1440p'),
        ('4K', '4K'),
        ('Mobile', 'Mobile'),
        ('Other', 'Other')
    )

    title = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    image = models.ImageField(upload_to='wallpapers/')
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, related_name='wallpapers')
    tags = models.ManyToManyField(Tag, blank=True)
    resolution = models.CharField(max_length=20, choices=RESOLUTION_CHOICES, default='1080p')
    
    uploader = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='uploaded_wallpapers')
    uploaded_at = models.DateTimeField(auto_now_add=True)
    
    views = models.PositiveIntegerField(default=0)
    downloads = models.PositiveIntegerField(default=0)
    
    is_approved = models.BooleanField(default=True) # Set to True for now, can be toggled via admin
    is_trending = models.BooleanField(default=False)
    
    def __str__(self):
        return self.title

class Collection(models.Model):
    name = models.CharField(max_length=100)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='collections')
    wallpapers = models.ManyToManyField(Wallpaper, blank=True, related_name='in_collections')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.name}"

class Favorite(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='favorites')
    wallpaper = models.ForeignKey(Wallpaper, on_delete=models.CASCADE, related_name='favorited_by')
    added_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'wallpaper')

    def __str__(self):
        return f"{self.user.username} fav {self.wallpaper.title}"

class Download(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='download_history')
    wallpaper = models.ForeignKey(Wallpaper, on_delete=models.CASCADE, related_name='download_records')
    downloaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} downloaded {self.wallpaper.title}"
