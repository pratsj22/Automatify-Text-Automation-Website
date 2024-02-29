from googletrans import Translator

def translate_text(text, input_language, output_language):
    translator = Translator()
    translated = translator.translate(text, src=input_language, dest=output_language)
    return translated.text

def detect_language(text):
    translator = Translator()
    detected = translator.detect(text)
    return detected.lang
