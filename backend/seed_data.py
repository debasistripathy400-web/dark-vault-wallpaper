import os
import django

# Set up Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from django.contrib.auth import get_user_model
from wallpapers.models import Category, Wallpaper, Tag

User = get_user_model()

def seed_data():
    # 1. Create Superuser
    if not User.objects.filter(username='admin').exists():
        User.objects.create_superuser('admin', 'admin@example.com', 'admin123')
        print("Created superuser: admin (pass: admin123)")

    # 2. Categories
    categories_data = [
        ('Nature', 'nature', 'https://images.unsplash.com/photo-1470071459604-3b5ec3a760b0?q=80&w=1000&auto=format&fit=crop'),
        ('Cars & Bikes', 'cars-bikes', 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1000&auto=format&fit=crop'),
        ('Gaming', 'gaming', 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1000&auto=format&fit=crop'),
        ('Anime', 'anime', 'https://images.unsplash.com/photo-1541562232579-512a21360020?q=80&w=1000&auto=format&fit=crop'),
        ('Space', 'space', 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=1000&auto=format&fit=crop'),
        ('Abstract', 'abstract', 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=1000&auto=format&fit=crop'),
    ]

    for name, slug, cover in categories_data:
        cat, created = Category.objects.get_or_create(name=name, slug=slug)
        # We manually set the image URL string if it's empty to bypass ImageField storage requirements for demo
        if not cat.cover_image:
             Category.objects.filter(id=cat.id).update(cover_image=cover)
        print(f"Ensured category: {name}")

    # 3. Wallpapers
    admin_user = User.objects.get(username='admin')
    
    wallpapers_data = [
        ('Deep Forest Mist', 'nature', 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2000&auto=format&fit=crop', '4K'),
        ('Cyberpunk Cityscape', 'gaming', 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=2000&auto=format&fit=crop', '4K'),
        ('Supercar Night Shift', 'cars-bikes', 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2000&auto=format&fit=crop', '4K'),
        ('Andromeda Galaxy', 'space', 'https://images.unsplash.com/photo-1464802686167-b939a6910659?q=80&w=2000&auto=format&fit=crop', '4K'),
        ('Minimalist Peak', 'nature', 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2000&auto=format&fit=crop', '1080p'),
        ('Abstract Flow', 'abstract', 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2000&auto=format&fit=crop', '4K'),
    ]

    for title, cat_slug, img_url, res in wallpapers_data:
        cat = Category.objects.get(slug=cat_slug)
        if not Wallpaper.objects.filter(title=title).exists():
            # Create object but use .update() to force raw URL into ImageField for Vercel demo
            wp = Wallpaper.objects.create(
                title=title,
                category=cat,
                uploader=admin_user,
                resolution=res,
                is_trending=True
            )
            Wallpaper.objects.filter(id=wp.id).update(image=img_url)
            print(f"Created wallpaper: {title}")

if __name__ == "__main__":
    seed_data()
