"""Flask blueprints for the online AI shopping project."""

from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..models import Cart

cart_bp = Blueprint('cart', __name__)

@cart_bp.route('/', methods=['GET'])
@jwt_required()
def get_cart():
    """Get the current user's cart."""
    user_id = get_jwt_identity()
    cart = Cart.query.filter_by(user_id=user_id).first()
    if not cart:
        return jsonify(items=[]), 200
    items = [{
        'product_id': item.product_id,
        'quantity': item.quantity
    } for item in cart.items]
    return jsonify(items=items), 200
