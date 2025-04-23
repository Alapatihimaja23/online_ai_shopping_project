"""Flask blueprints for the online AI shopping project."""

import os
from flask import Blueprint, request, jsonify
import google.generativeai as genai

ai_bp = Blueprint('ai', __name__)

genai.configure(api_key=os.getenv('GEMINI_API_KEY'))

@ai_bp.route('/suggest', methods=['POST'])
def suggest():
    """Suggest a product based on a prompt."""
    data = request.json
    prompt = data.get('prompt', 'Suggest a product')
    model = genai.GenerativeModel('gemini-1.5-pro-latest')
    response = model.generate_content(prompt)
    return jsonify({'suggestion': response.text})

@ai_bp.route('/chat', methods=['POST'])
def chat():
    """AI Chatbot endpoint: responds to any user message."""
    data = request.json or {}
    user_message = data.get('message', '')
    if not user_message:
        return jsonify({'error': 'No message provided.'}), 400
    model = genai.GenerativeModel('gemini-1.5-pro-latest')
    system_prompt = (
        "You are an AI chatbot working for 'manashop', a website that sells all kinds of products. "
        "Help users with any shopping or product-related questions, provide suggestions, and always be friendly and helpful. "
        "Format your answers with bold and newlines for readability, and keep responses under 100 words."
    )
    convo = model.start_chat(history=[{"role": "user", "parts": [system_prompt]}])
    ai_response = convo.send_message(user_message)
    return jsonify({'response': ai_response.text})
