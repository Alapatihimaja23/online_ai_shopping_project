
### `backend_instructions.md`

```md
# 🐍 Backend Guide — Flask + JWT + Supabase (PostgreSQL)

> Windsurf: build this service in **/back**. It must expose a REST/JSON API under `/api`.

---

## 1 ▪ Project Metadata

| Key | Value |
| --- | ----- |
| Language | Python 3.11 |
| Framework | Flask 3 |
| Auth | `flask-jwt-extended` |
| DB | Supabase Postgres |
| ORM | SQLAlchemy 2 |
| Seed | FakeStore API |
| CORS | `flask-cors` |
| Deployment | Railway free tier |

---

## 2 ▪ Folder / File Layout

back/ ├── app/ │ ├── init.py # create_app() │ ├── models.py # SQLAlchemy models │ ├── routes/ │ │ ├── auth.py │ │ ├── products.py │ │ ├── cart.py │ │ ├── orders.py │ │ ├── admin.py │ │ └── ai.py │ ├── schemas.py # marshmallow / pydantic models │ ├── extensions.py # db, jwt, migrate │ └── seed.py # fetch & insert FakeStore data ├── migrations/ ├── requirements.txt ├── .env.example └── wsgi.py # for Gunicorn



---

## 3 ▪ Dependencies

```text
Flask==3.*
Flask-JWT-Extended
Flask-Cors
Flask-SQLAlchemy
Flask-Migrate
python-dotenv
requests                # for seeding + Gemini
gunicorn
psycopg2-binary
4 ▪ Environment Variables (.env)
ini
Copy
Edit
FLASK_ENV=development
DATABASE_URL=postgresql+psycopg2://USER:PASSWORD@HOST:PORT/db
JWT_SECRET=change-me
GEMINI_API_KEY=your-gemini-key
5 ▪ Database Schema (Supabase SQL)
sql
Copy
Edit
-- Users
create table public.users (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text unique not null,
  password_hash text not null,
  role text check (role in ('guest','user','merchant','admin','delivery')) default 'user',
  is_active boolean default true
);

-- Products
create table public.products (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  image text,
  price numeric(10,2) not null,
  category text,
  stock_quantity int default 0,
  user_id uuid references public.users(id) on delete set null
);

-- Cart + Items
create table public.carts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete cascade,
  created_at timestamp default now()
);
create table public.cart_items (
  id uuid primary key default gen_random_uuid(),
  cart_id uuid references public.carts(id) on delete cascade,
  product_id uuid references public.products(id),
  quantity int default 1
);

-- Orders + Items
create table public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id),
  merchant_id uuid references public.users(id),
  total_price numeric(10,2),
  status text check (status in ('pending','confirmed','delivered')) default 'pending',
  created_at timestamp default now()
);
create table public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references public.orders(id) on delete cascade,
  product_id uuid references public.products(id),
  quantity int,
  price numeric(10,2)
);

-- Admin Actions
create table public.admin_actions (
  id uuid primary key default gen_random_uuid(),
  admin_id uuid references public.users(id),
  action_type text,
  target_user_id uuid,
  product_id uuid,
  timestamp timestamp default now()
);

-- Reviews (optional polish)
create table public.reviews (
  id uuid primary key default gen_random_uuid(),
  product_id uuid references public.products(id),
  user_id uuid references public.users(id),
  rating int check (rating between 1 and 5),
  comment text,
  created_at timestamp default now()
);
Windsurf: run the above in Supabase SQL editor OR via Alembic migrations generated from models.py.

6 ▪ Key Flask Blueprints

Blueprint	Endpoint Prefix	Purpose
auth	/auth	Google login → JWT, email/password fallback
products	/products	CRUD (merchant restricted) + public listing
cart	/cart	Get / update current user cart
orders	/orders	Checkout, payment stub, status
admin	/admin	Approve merchants, deactivate users, etc.
ai	/ai/suggest	Proxy to Gemini, return JSON product ideas
7 ▪ Seed Script (python -m app.seed)
Fetch 20 items from https://fakestoreapi.com/products.

Transform fields to our schema (map title, description, price, etc.).

Insert under a default merchant user.

8 ▪ Run & Test Locally
bash
Copy
Edit
# inside /back
python -m venv venv && venv\Scripts\activate  # Windows
pip install -r requirements.txt
flask --app app db upgrade     # migrations
python -m app.seed
flask --app app run -p 5000
9 ▪ Deploy (Railway)
Connect repo → pick /back path.

Set environment variables (DATABASE_URL, JWT_SECRET, GEMINI_API_KEY).

Start command:

bash
Copy
Edit
gunicorn --chdir back app:wsgi --bind 0.0.0.0:${PORT}
Add free Postgres plugin only as fallback; primary DB is Supabase.

markdown
Copy
Edit

---

## 👩‍💻 What **you** (not Windsurf) need to do manually

1. **Supabase project**  
   * Go to [app.supabase.com] → create new project → copy the `Connection string`.  
   * In SQL Editor, paste the **Database Schema** block above and run.  
   * Under *Project Settings → API*, copy the **anon/public** key.

2. **Environment files**  
   * Back‑end: create `/back/.env` with `DATABASE_URL` (Supabase string), `JWT_SECRET`, and `GEMINI_API_KEY`.  
   * Front‑end: create `/front/.env` with `VITE_API_BASE_URL` (pointing to Railway URL once deployed), Google client ID, Gemini key, and Tawk.to ID.

3. **Local test**  
   * Start backend: `flask --app app run`  
   * Start frontend: `npm run dev` in `/front` → confirm Tailwind classes render.

4. **Deploy**  
   * **Backend**: push to GitHub, link Railway, add env vars.  
   * **Frontend**: `firebase login`, `firebase init hosting`, set public dir to `front/dist`, build & deploy.

5. **Domain linking** (optional)  
   Point a custom domain at Firebase; add an A record for Railway if needed.
