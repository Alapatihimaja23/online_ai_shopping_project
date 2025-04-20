"""Flask blueprints for the online AI shopping project."""

from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..models import Order

orders_bp = Blueprint('orders', __name__)

@orders_bp.route('/', methods=['GET'])
@jwt_required()
def get_orders():
    """Get the current user's orders."""
    user_id = get_jwt_identity()
    orders = Order.query.filter_by(user_id=user_id).all()
    return jsonify([{
        'id': o.id,
        'status': o.status,
        'total_price': str(o.total_price),
        'created_at': o.created_at.isoformat()
    } for o in orders]), 200
