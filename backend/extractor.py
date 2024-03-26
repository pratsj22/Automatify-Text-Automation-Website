from PIL import Image
import pytesseract

def extract_text_from_image(image_path):
    try:
        with Image.open(image_path) as img:
            pytesseract.pytesseract.tesseract_cmd = r'C:\Users\prath\AppData\Local\Programs\Tesseract-OCR\tesseract.exe'
            text = pytesseract.image_to_string(img)

            return text
    except Exception as e:
        return str(e)
