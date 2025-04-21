"""Flask blueprints for the online AI shopping project."""

import random
import os
from flask import Blueprint, jsonify, request
import google.generativeai as genai
from dotenv import load_dotenv
from ..models import Product

load_dotenv()


products_bp = Blueprint('products', __name__)


@products_bp.route('/', methods=['GET'])
def get_products():
    """Get a diverse set of products (by category if possible),
    with search, category, and limit support."""
    query = request.args.get('q')
    category = request.args.get('category')
    limit = request.args.get('limit', type=int, default=4)
    products_query = Product.query
    if query:
        products_query = products_query.filter(Product.title.ilike(f'%{query}%'))
    if category:
        products_query = products_query.filter(Product.category == category)
    # Get all products, shuffle for diversity
    all_products = products_query.all()
    random.shuffle(all_products)
    # Try to get up to one product per category (if enough categories)
    seen_cats = set()
    diverse_products = []
    for p in all_products:
        if p.category not in seen_cats:
            diverse_products.append(p)
            seen_cats.add(p.category)
        if len(diverse_products) >= limit:
            break
    # If not enough, fill with randoms
    if len(diverse_products) < limit:
        for p in all_products:
            if p not in diverse_products:
                diverse_products.append(p)
            if len(diverse_products) >= limit:
                break
    products = diverse_products[:limit]
    if not products:
        return jsonify({'error': 'No products found.'}), 404
    return jsonify([{
        'id': p.id,
        'title': p.title,
        'description': p.description,
        'image': p.image,
        'price': str(p.price),
        'category': p.category,
        'stock_quantity': p.stock_quantity
    } for p in products]), 200

@products_bp.route('/ai_suggest', methods=['POST'])
def ai_suggest():
    """Suggest a product or category using Gemini AI and recommend from DB."""
    data = request.json or {}
    prompt = data.get('prompt', 'Suggest a product for an online shopping user.')
    user_id = data.get('user_id')
    # Fetch all products for context
    products = Product.query.all()
    product_titles = ', '.join([p.title for p in products])
    # Compose prompt with DB context
    full_prompt = f"{prompt}\nAvailable products: {product_titles}"
    genai.configure(api_key=os.getenv('GEMINI_API_KEY'))
    model = genai.GenerativeModel('gemini-pro')
    response = model.generate_content(full_prompt)
    suggestion = response.text.strip()
    # Try to match a product from DB
    recommended = None
    for p in products:
        if p.title.lower() in suggestion.lower():
            recommended = p
            break
    return jsonify({
        'suggestion': suggestion,
        'recommended': {
            'id': recommended.id,
            'title': recommended.title,
            'description': recommended.description,
            'image': recommended.image,
            'price': str(recommended.price),
            'category': recommended.category,
            'stock_quantity': recommended.stock_quantity
        } if recommended else None
    })
