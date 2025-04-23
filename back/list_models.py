"""
List available models and their supported generation methods.
"""
import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

print("Available models and their supported generation methods:")
for model in genai.list_models():
    print(model.name, model.supported_generation_methods)
