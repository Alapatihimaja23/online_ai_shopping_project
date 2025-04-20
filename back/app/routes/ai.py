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
    model = genai.GenerativeModel('gemini-pro')
    response = model.generate_content(prompt)
    return jsonify({'suggestion': response.text})
