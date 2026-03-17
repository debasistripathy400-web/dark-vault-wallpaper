import os
import sys

# This helps Django find the 'core' module when running on Vercel
current_dir = os.path.dirname(os.path.abspath(__file__))
if current_dir not in sys.path:
    sys.path.append(current_dir)

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')

from core.wsgi import application

# 'app' is the standard name for the WSGI/ASGI object on Vercel
app = application
