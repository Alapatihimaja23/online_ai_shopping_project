"""Flask application factory for the online AI shopping project."""

import os
from dotenv import load_dotenv
from flask import Flask
from .extensions import db, jwt, migrate
from .routes import register_blueprints

def create_app():
    """
    Application factory for the online AI shopping project.

    Loads environment variables, initializes Flask extensions (SQLAlchemy, JWT, Migrate),
    registers blueprints, and configures the application instance.

    Returns:
        Flask: The configured Flask application instance.
    """
    load_dotenv()
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
    app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.init_app(app)
    jwt.init_app(app)
    migrate.init_app(app, db)
    register_blueprints(app)

    return app
