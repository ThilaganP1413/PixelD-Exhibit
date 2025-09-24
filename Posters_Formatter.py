import os
from PIL import Image

directory = "Posters"
log_file = "poster_names_log.txt"

# Function to resize image to 1080p (smaller dimension = 1080px, preserve aspect ratio)
def resize_to_1080p(input_path, output_path):
    with Image.open(input_path) as img:
        width, height = img.size
        aspect_ratio = width / height
        if width <= height:
            new_width = min(width, 1080)  # Don't upscale if smaller than 1080
            new_height = int(new_width / aspect_ratio)
        else:
            new_height = min(height, 1080)
            new_width = int(new_height * aspect_ratio)
        
        if width > 1080 or height > 1080:
            img = img.resize((new_width, new_height), Image.Resampling.LANCZOS)
            img.save(output_path, 'WEBP', quality=85)  # Save as WEBP
            print(f"Resized and converted: {input_path} from {width}x{height} to {new_width}x{new_height}")
        else:
            img.save(output_path, 'WEBP', quality=85)
            print(f"Converted (no resize needed): {input_path} ({width}x{height})")

# Create temporary directory for resized images
temp_dir = os.path.join(directory, "temp_resized")
os.makedirs(temp_dir, exist_ok=True)

files = os.listdir(directory)

image_extensions = ('.jpg', '.jpeg', '.png', '.gif', '.bmp', '.tiff', '.webp')
image_files = [f for f in files if os.path.splitext(f)[1].lower() in image_extensions]

image_files.sort()

new_names = []

with open(log_file, 'w', encoding='utf-8') as f:
    f.write("Poster Names Before and After Renaming\n")
    f.write("=====================================\n")
    f.write("Original Name -> New Name\n")
    f.write("=====================================\n")

    for index, old_name in enumerate(image_files, start=1):
        new_name = f"poster{index}.webp"  # Always use .webp extension
        new_names.append(new_name)
        old_path = os.path.join(directory, old_name)
        temp_path = os.path.join(temp_dir, new_name)
        new_path = os.path.join(directory, new_name)
        
        # Resize and convert image to WEBP
        resize_to_1080p(old_path, temp_path)
        
        # Move to final location
        os.rename(temp_path, new_path)
        f.write(f"{old_name} -> {new_name}\n")
        print(f"Renamed: {old_name} -> {new_name}")
        
        # Delete original file
        if os.path.exists(old_path):
            os.remove(old_path)
            print(f"Deleted original: {old_name}")

    f.write("\n=====================================\n")
    f.write("Copy the Following to use in JS file\n")
    f.write("=====================================\n")
    for name in new_names:
        f.write(f'  "{name}",\n')

# Clean up temporary directory
if os.path.exists(temp_dir):
    for temp_file in os.listdir(temp_dir):
        os.remove(os.path.join(temp_dir, temp_file))
    os.rmdir(temp_dir)

print(f"Conversion and renaming complete! Log saved to {log_file}")