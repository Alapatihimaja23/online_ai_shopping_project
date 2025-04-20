"""Flask blueprints for the online AI shopping project."""

from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token
from ..models import User
# from ..extensions import db

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/login', methods=['POST'])
def login():
    """Login endpoint for user authentication."""
    data = request.json
    user = User.query.filter_by(email=data.get('email')).first()
    if user and user.password_hash == data.get('password'):
        access_token = create_access_token(identity=user.id)
        return jsonify(access_token=access_token), 200
    return jsonify(msg='Bad credentials'), 401
