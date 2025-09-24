import os
from PIL import Image

# Define the directory containing the images
directory = "Posters"

# Create a text file to log the names
log_file = "poster_names_log.txt"

# Function to resize image to 1080p (smaller dimension = 1080px, preserve aspect ratio)
def resize_to_1080p(input_path, output_path):
    with Image.open(input_path) as img:
        width, height = img.size
        # Calculate aspect ratio
        aspect_ratio = width / height
        # Find the smaller dimension
        if width <= height:
            # Width is smaller or equal
            new_width = min(width, 1080)  # Don't upscale if smaller than 1080
            new_height = int(new_width / aspect_ratio)
        else:
            # Height is smaller
            new_height = min(height, 1080)  # Don't upscale if smaller than 1080
            new_width = int(new_height * aspect_ratio)
        
        # Only resize if necessary
        if width > 1080 or height > 1080:
            img = img.resize((new_width, new_height), Image.Resampling.LANCZOS)
            img.save(output_path, quality=85)  # Save with moderate compression
            print(f"Resized: {input_path} from {width}x{height} to {new_width}x{new_height}")
        else:
            # If no resize needed, copy original
            img.save(output_path, quality=85)
            print(f"No resize needed: {input_path} ({width}x{height})")

# Create temporary directory for resized images
temp_dir = os.path.join(directory, "temp_resized")
os.makedirs(temp_dir, exist_ok=True)

# Get a list of all files in the directory
files = os.listdir(directory)

# Filter out only image files (common extensions)
image_extensions = ('.jpg', '.jpeg', '.png', '.gif', '.bmp', '.tiff', '.webp')
image_files = [f for f in files if os.path.splitext(f)[1].lower() in image_extensions]

# Sort files to ensure consistent numbering
image_files.sort()

# List to store new names for JS array section
new_names = []

# Open the log file with UTF-8 encoding and write the header
with open(log_file, 'w', encoding='utf-8') as f:
    f.write("Poster Names Before and After Renaming\n")
    f.write("=====================================\n")
    f.write("Original Name -> New Name\n")
    f.write("=====================================\n")

    # Process each image: resize, then rename
    for index, old_name in enumerate(image_files, start=1):
        # Get the file extension
        extension = os.path.splitext(old_name)[1]
        # Create new name in the format posterX.extension
        new_name = f"poster{index}{extension}"
        # Store new name for JS array
        new_names.append(new_name)
        # Create full paths for old, temp, and new names
        old_path = os.path.join(directory, old_name)
        temp_path = os.path.join(temp_dir, old_name)
        new_path = os.path.join(directory, new_name)
        
        # Resize image to 1080p
        resize_to_1080p(old_path, temp_path)
        
        # Rename the resized image
        os.rename(temp_path, new_path)
        # Write to log file
        f.write(f"{old_name} -> {new_name}\n")
        print(f"Renamed: {old_name} -> {new_name}")

    # Write the JS array section
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

print(f"Renaming complete! Log saved to {log_file}")