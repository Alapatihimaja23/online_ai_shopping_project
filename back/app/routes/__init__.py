"""Flask blueprints for the online AI shopping project."""

from .auth import auth_bp
from .products import products_bp
from .cart import cart_bp
from .orders import orders_bp
from .admin import admin_bp
from .ai import ai_bp

def register_blueprints(app):
    """Register all blueprints for the application."""
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(products_bp, url_prefix='/api/products')
    app.register_blueprint(cart_bp, url_prefix='/api/cart')
    app.register_blueprint(orders_bp, url_prefix='/api/orders')
    app.register_blueprint(admin_bp, url_prefix='/api/admin')
    app.register_blueprint(ai_bp, url_prefix='/api/ai')
