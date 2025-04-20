"""Database models for the online AI shopping project.

This module defines SQLAlchemy models for users, products, carts, orders, and reviews.
"""

import uuid
from .extensions import db

class User(db.Model):
    """User model for authentication and user management."""
    __tablename__ = 'users'
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    name = db.Column(db.String, nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)
    password_hash = db.Column(db.String, nullable=False)
    role = db.Column(db.String, default='user')
    is_active = db.Column(db.Boolean, default=True)
    products = db.relationship('Product', backref='owner', lazy=True)
    carts = db.relationship('Cart', backref='user', lazy=True)
    orders = db.relationship(
        'Order', backref='user', lazy=True, 
        foreign_keys='Order.user_id'
    )
    merchant_orders = db.relationship('Order', backref='merchant', lazy=True, foreign_keys='Order.merchant_id')
    reviews = db.relationship('Review', backref='user', lazy=True)

class Product(db.Model):
    """Product model for product management."""
    __tablename__ = 'products'
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    title = db.Column(db.String, nullable=False)
    description = db.Column(db.String)
    image = db.Column(db.String)
    price = db.Column(db.Numeric(10,2), nullable=False)
    category = db.Column(db.String)
    stock_quantity = db.Column(db.Integer, default=0)
    user_id = db.Column(db.String(36), db.ForeignKey('users.id'))
    cart_items = db.relationship('CartItem', backref='product', lazy=True)
    order_items = db.relationship('OrderItem', backref='product', lazy=True)
    reviews = db.relationship('Review', backref='product', lazy=True)

class Cart(db.Model):
    """Cart model for managing user's cart."""
    __tablename__ = 'carts'
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = db.Column(db.String(36), db.ForeignKey('users.id'), nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    items = db.relationship('CartItem', backref='cart', lazy=True)

class CartItem(db.Model):
    """Cart item model for managing individual items in a user's cart."""
    __tablename__ = 'cart_items'
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    cart_id = db.Column(db.String(36), db.ForeignKey('carts.id'), nullable=False)
    product_id = db.Column(db.String(36), db.ForeignKey('products.id'), nullable=False)
    quantity = db.Column(db.Integer, default=1)

class Order(db.Model):
    """Order model for managing user's orders."""
    __tablename__ = 'orders'
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = db.Column(db.String(36), db.ForeignKey('users.id'))
    merchant_id = db.Column(db.String(36), db.ForeignKey('users.id'))
    total_price = db.Column(db.Numeric(10,2))
    status = db.Column(db.String, default='pending')
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    items = db.relationship('OrderItem', backref='order', lazy=True)

class OrderItem(db.Model):
    """Order item model for managing individual items in an order."""
    __tablename__ = 'order_items'
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    order_id = db.Column(db.String(36), db.ForeignKey('orders.id'), nullable=False)
    product_id = db.Column(db.String(36), db.ForeignKey('products.id'), nullable=False)
    quantity = db.Column(db.Integer)
    price = db.Column(db.Numeric(10,2))

class Review(db.Model):
    """Review model for managing product reviews."""
    __tablename__ = 'reviews'
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    product_id = db.Column(db.String(36), db.ForeignKey('products.id'), nullable=False)
    user_id = db.Column(db.String(36), db.ForeignKey('users.id'), nullable=False)
    rating = db.Column(db.Integer)
    comment = db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
