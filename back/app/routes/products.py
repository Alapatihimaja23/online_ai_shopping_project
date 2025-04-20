"""Flask blueprints for the online AI shopping project."""

from flask import Blueprint, jsonify
from ..models import Product

products_bp = Blueprint('products', __name__)

@products_bp.route('/', methods=['GET'])
def get_products():
    """Get all products."""
    products = Product.query.all()
    return jsonify([{
        'id': p.id,
        'title': p.title,
        'description': p.description,
        'image': p.image,
        'price': str(p.price),
        'category': p.category,
        'stock_quantity': p.stock_quantity
    } for p in products]), 200
    