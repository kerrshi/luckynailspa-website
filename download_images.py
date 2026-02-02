#!/usr/bin/env python3
"""
Script to download images from the Lucky Nail Spa website
"""
import requests
import os
from urllib.parse import urljoin, urlparse
from bs4 import BeautifulSoup

# Base URL
BASE_URL = "https://www.luckynailspadurham.com"
ASSETS_DIR = "assets"

# Create assets directory if it doesn't exist
os.makedirs(ASSETS_DIR, exist_ok=True)

def download_image(url, filename):
    """Download an image from URL and save it locally"""
    try:
        response = requests.get(url, timeout=10, headers={
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        })
        if response.status_code == 200:
            filepath = os.path.join(ASSETS_DIR, filename)
            with open(filepath, 'wb') as f:
                f.write(response.content)
            print(f"✓ Downloaded: {filename}")
            return True
        else:
            print(f"✗ Failed to download {filename}: Status {response.status_code}")
            return False
    except Exception as e:
        print(f"✗ Error downloading {filename}: {str(e)}")
        return False

def find_images_on_page(url):
    """Find all images on a webpage"""
    try:
        response = requests.get(url, timeout=10, headers={
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        })
        if response.status_code == 200:
            soup = BeautifulSoup(response.content, 'html.parser')
            images = []
            for img in soup.find_all('img'):
                src = img.get('src') or img.get('data-src')
                if src:
                    full_url = urljoin(BASE_URL, src)
                    images.append(full_url)
            return images
    except Exception as e:
        print(f"Error fetching page: {str(e)}")
    return []

def main():
    print("Downloading images from Lucky Nail Spa website...")
    print("=" * 50)
    
    # Try to find images on the homepage
    print("\n1. Scanning homepage for images...")
    home_images = find_images_on_page(BASE_URL)
    
    # Common image paths to try
    common_paths = [
        "/wp-content/uploads/",
        "/images/",
        "/img/",
        "/assets/",
    ]
    
    # Try downloading common image types
    image_extensions = ['.jpg', '.jpeg', '.png', '.webp']
    
    # Download images found on the page
    downloaded = 0
    for i, img_url in enumerate(home_images[:10]):  # Limit to first 10 images
        parsed = urlparse(img_url)
        filename = os.path.basename(parsed.path)
        if filename and any(filename.lower().endswith(ext) for ext in image_extensions):
            if download_image(img_url, filename):
                downloaded += 1
    
    print(f"\n✓ Downloaded {downloaded} images")
    print("\nNote: You may need to manually download specific images from the website.")
    print("Visit https://www.luckynailspadurham.com and save images to the assets/ folder.")

if __name__ == "__main__":
    try:
        import requests
        from bs4 import BeautifulSoup
    except ImportError:
        print("Please install required packages:")
        print("pip install requests beautifulsoup4")
        exit(1)
    
    main()
