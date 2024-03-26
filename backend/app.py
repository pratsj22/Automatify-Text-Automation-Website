from flask import Flask,jsonify,request
from flask_cors import CORS
from summarize import generate_summary
from extractor import extract_text_from_image
from translate import translate_text, detect_language
from googletrans import LANGUAGES

app= Flask(__name__)
CORS(app)

@app.route('/api',methods=['POST'])
def putData():
    response=""
    if request.method=='POST':
        response=request.get_json()
    return jsonify(generate_summary(response['msg'],int(response['len'])))

res= dict()
@app.route('/file',methods=['GET','POST'])
def uploadFile():
    global res
    if request.method=='POST':
        files= request.files
        i=0
        for file in files.getlist('files[]'):
            res[i]=extract_text_from_image(file)
            i+=1
    return jsonify(res)

@app.route('/languages', methods=['GET'])
def get_languages():
    languages = [{'code': code, 'name': name.capitalize()} for code, name in LANGUAGES.items()]
    return jsonify({'languages': languages})

@app.route('/detect-language', methods=['POST'])
def detect_lang():
    data = request.get_json()
    text = data['text']
    if(text==""):
        return jsonify({'detected_language': ""})
    detected_language = LANGUAGES.get(detect_language(text),detect_language(text)).capitalize()
    return jsonify({'detected_language': detected_language})

@app.route('/translate', methods=['POST'])
def translate():
    data = request.get_json()
    text = data['text']
    if(text==""):
        return jsonify({'translated_text': ""})
    input_language = data['inputLanguage']
    output_language = data['targetLanguage']

    translated_text = translate_text(text, input_language, output_language)
    return jsonify({'translated_text': translated_text})

if __name__=="__main__":
    app.run(debug=True)