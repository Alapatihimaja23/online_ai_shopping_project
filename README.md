# 🛒 Online AI Shopping Project

A modern, full-stack AI-powered shopping platform built with Flask (backend) and React + Vite + shadcn/ui (frontend).

---

## Features

- User authentication (JWT + Google OAuth)
- Product browsing, cart, checkout, order history
- Admin dashboard for product/order management
- AI-powered product suggestions (Gemini API)
- Real-time chat support (Tawk.to)
- Beautiful UI with shadcn/ui and MUI icons
- Fully typed with TypeScript and SQLAlchemy

---

## Tech Stack

| Layer    | Tech                                         |
|----------|----------------------------------------------|
| Backend  | Flask, SQLAlchemy, JWT, Supabase, Gunicorn   |
| Frontend | React, Vite, Tailwind, shadcn/ui, MUI Icons  |
| State    | TanStack Query, Context API                  |
| Styling  | Tailwind CSS, shadcn/ui                      |
| Auth     | JWT, Google OAuth                            |
| AI       | Gemini API                                   |
| Chat     | Tawk.to                                      |

---

## Project Structure

```
/online_ai_shopping_project
├── back/
│   ├── app/         # Flask app (models, routes, seed, etc)
│   ├── wsgi.py      # WSGI entry point for Flask
│   ├── requirements.txt
│   └── ...
├── front/
│   ├── src/         # React app source (pages, components)
│   ├── vite.config.js
│   └── ...
├── README.md
└── ...
```

---

## Getting Started

### Backend Setup

```sh
cd back
python -m venv .venv
. .venv/Scripts/activate  # Windows
pip install -r requirements.txt
cp .env.example .env
# Edit .env with your DB and API keys (Supabase, JWT, Gemini, etc)
flask db upgrade
```

**Running the Backend:**

```sh
# From the 'back' directory
python -m flask run --host=0.0.0.0
```
- The backend runs on http://localhost:5000
- The main app factory is in `app/__init__.py` and exposed via `wsgi.py`

**Seeding Products:**

```sh
cd app
python seed.py
```
- This loads products from `seed_products.json` into your database.

### Frontend Setup

```sh
cd front
npm install
npm run dev
```
- The frontend runs on http://localhost:5173

**Proxy API Requests:**
- Ensure your `vite.config.js` includes:
```js
server: {
  proxy: {
    '/api': 'http://localhost:5000',
  },
},
```
- This allows React to call Flask APIs at `/api/...` without CORS issues.

---

## Usage & Testing

- **Homepage**: Shows 4 products by default. Search and category filters are supported.
- **Products Page**: (Navbar) Lists all products.
- **Categories**: Click a category to see up to 4 products, or an "out of stock" message if empty.
- **API Endpoints**:
  - `/api/products?limit=4` — Get 4 products
  - `/api/products?q=term` — Search by title
  - `/api/products?category=Fruits` — Filter by category

---

## Adding Products or Categories
- Edit `back/app/seed_products.json` and re-run `python seed.py`.
- Categories are defined by the `category` field of each product.
- Add new images using Unsplash or fakestoreapi links.

---

## Troubleshooting

- **JSON Parse Error (`<DOCTYPE ... is not valid JSON`)**:
  - Make sure Flask backend is running on port 5000.
  - Ensure proxy is set up in `vite.config.js`.
  - Check that `/api/products` returns JSON (not HTML) in the browser.
- **Flask Import Error**:
  - Use `$env:FLASK_APP = "wsgi:app"` and run from the `back` directory.
- **Seeding Issues**:
  - Ensure your DB is migrated (`flask db upgrade`) and `.env` is correct.

---

## Contribution & Contact

- Open issues or PRs for bugs and features.
- Contact: [Your Name/Email Here]

---

Happy hacking! 🚀

---

## Deployment

1. **Backend**
   - Push to GitHub
   - Link to Railway
   - Add environment variables
   - Set deployment command: `gunicorn --chdir back app:wsgi --bind 0.0.0.0:${PORT}`
   - Add free Postgres plugin

2. **Frontend**
   - `firebase login`
   - `firebase init hosting` → set public dir to `front/dist`
   - `npm run build`
   - `firebase deploy`