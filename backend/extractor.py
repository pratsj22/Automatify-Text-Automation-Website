import easyocr
import numpy as np
import cv2
from PIL import Image

def extract_text_from_image(file):
    # Initialize the EasyOCR reader
    reader = easyocr.Reader(['en'])  # You can specify multiple languages, e.g., ['en', 'fr']

    # Convert file to image
    with Image.open(file) as img:
        image = np.array(img)

    # Convert image to RGB (EasyOCR expects RGB format)
    image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

    # Perform OCR on the image
    result = reader.readtext(image_rgb)

    # Extract the text from the result
    extracted_text = " ".join([res[1] for res in result])
    
    return extracted_text