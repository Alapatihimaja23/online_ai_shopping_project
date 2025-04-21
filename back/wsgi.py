"""WSGI application for the online AI shopping project."""

#pylint: disable=import-error
from app import create_app

app = create_app()
