import os
import json
import psycopg2
from dotenv import load_dotenv

load_dotenv()
DATABASE_URL = os.getenv("DATABASE_URL")
BASE_DIR = os.path.dirname(__file__)

def load_json(filename):
    with open(os.path.join(BASE_DIR, filename), "r") as f:
        return json.load(f)

def main():
    conn = psycopg2.connect(DATABASE_URL)
    cur = conn.cursor()

    products = load_json("seed_products.json")
    for p in products:
        cur.execute('''
            INSERT INTO products (title, description, image, price, category, stock_quantity)
            VALUES (%s, %s, %s, %s, %s, %s)
            ON CONFLICT (title) DO UPDATE SET
                description = EXCLUDED.description,
                image = EXCLUDED.image,
                price = EXCLUDED.price,
                category = EXCLUDED.category,
                stock_quantity = EXCLUDED.stock_quantity;
        ''', (
            p["title"],
            p["description"],
            p["image"],
            p["price"],
            p["category"],
            p["stock_quantity"]
        ))
    conn.commit()
    cur.close()
    conn.close()
    print("Products seeded successfully!")

if __name__ == "__main__":
    main()