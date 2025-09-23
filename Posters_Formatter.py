import os

# Define the directory containing the images
directory = "Posters"

# Create a text file to log the names
log_file = "poster_names_log.txt"

# Get a list of all files in the directory
files = os.listdir(directory)

# Filter out only image files (common extensions)
image_extensions = ('.jpg', '.jpeg', '.png', '.gif', '.bmp', '.tiff')
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

    # Rename each image file and log the names
    for index, old_name in enumerate(image_files, start=1):
        # Get the file extension
        extension = os.path.splitext(old_name)[1]
        # Create new name in the format posterX.extension
        new_name = f"poster{index}{extension}"
        # Store new name for JS array
        new_names.append(new_name)
        # Create full paths for old and new names
        old_path = os.path.join(directory, old_name)
        new_path = os.path.join(directory, new_name)
        # Rename the file
        os.rename(old_path, new_path)
        # Write to log file
        f.write(f"{old_name} -> {new_name}\n")
        print(f"Renamed: {old_name} -> {new_name}")

    # Write the JS array section
    f.write("\n=====================================\n")
    f.write("Copy the Following to use in JS file\n")
    f.write("=====================================\n")
    for name in new_names:
        f.write(f'  "{name}",\n')

print(f"Renaming complete! Log saved to {log_file}")