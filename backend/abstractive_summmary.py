import requests
import os
from dotenv import load_dotenv
load_dotenv()
API_URL = "https://api-inference.huggingface.co/models/Pratsj22/pegasus-samsum"
headers = {"Authorization": "Bearer "+os.getenv("HUGGING_FACE_API_TOKEN")}

def abstractive_summary(text,percentage):
    length= len(text.split())
    max_len= int(length*percentage/100)
    min_len=int(max_len/2)
    output = query({
	"inputs": text,
    "parameters": {
				"max_length":length, 
				"min_length":min_len,
                },
    })
    return output[0]['summary_text']

def query(payload):
	response = requests.post(API_URL, headers=headers, json=payload)
	return response.json()
	
