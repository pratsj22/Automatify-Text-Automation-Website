import requests
import os
from dotenv import load_dotenv
load_dotenv()

API_URL = "https://api-inference.huggingface.co/models/facebook/bart-large-cnn"
headers = {"Authorization": os.getenv("API_TOKEN")}

def query(payload):
	response = requests.post(API_URL, headers=headers, json=payload)
	return response.json()
	
def abstractive_summarization(text,percentage):
    min_length=int(len(text.split())*percentage/100)
    max_length=int(len(text.split())*percentage/100)*2

    output = query({
	"inputs": text,
	"parameters": {
				"max_length":max_length, 
				"min_length":min_length,
                },
    })
    return output[0]['summary_text']