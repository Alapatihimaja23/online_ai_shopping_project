"""
Cleanup script for products table.
Deletes all products from the database. Use this before reseeding new products.

Instructions:
1. Make sure your DATABASE_URL environment variable is set (or .env file is present).
2. Run: python cleanup_products.py
"""
import os
import psycopg2
from dotenv import load_dotenv

load_dotenv()
DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    raise RuntimeError("DATABASE_URL not set in environment or .env file")

conn = psycopg2.connect(DATABASE_URL)
cur = conn.cursor()
cur.execute("DELETE FROM products;")
conn.commit()
cur.close()
conn.close()
print("All products deleted. You can now re-run your seed script.")
