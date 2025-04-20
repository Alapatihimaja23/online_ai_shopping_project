# Backend Setup

## 1. Create a virtual environment

```sh
python -m venv .venv
```

## 2. Activate the virtual environment
- **Windows:**
  ```sh
  .venv\Scripts\activate
  ```
- **macOS/Linux:**
  ```sh
  source .venv/bin/activate
  ```

## 3. Install dependencies

```sh
pip install -r requirements.txt
```

## 4. Set environment variables

Copy `.env.example` to `.env` and fill in your values (or use the provided `.env`).

## 5. Run the Flask app

```sh
flask --app app run
```

---

**Note:** The `.venv/` folder is ignored by git. Always use a virtual environment for development!
