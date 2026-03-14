import os
import django

# Set up Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from wallpapers.models import Category

categories = [
    ('Nature', 'nature'),
    ('Cars & Bikes', 'cars-bikes'),
    ('Gaming', 'gaming'),
    ('Anime', 'anime'),
    ('Abstract', 'abstract'),
    ('Space', 'space'),
    ('Technology', 'technology'),
    ('Minimalist', 'minimalist')
]

def seed_categories():
    for name, slug in categories:
        cat, created = Category.objects.get_or_create(name=name, slug=slug)
        if created:
            print(f"Created category: {name}")
        else:
            print(f"Category already exists: {name}")

if __name__ == "__main__":
    seed_categories()
