# ⚛️ Frontend Guide — React + Vite + Tailwind + TypeScript

> Windsurf: follow this guide to scaffold, configure, and build the SPA that lives in **/front**.

---

## 1 ▪ Project Metadata

| Key | Value |
| --- | ----- |
| Language | TypeScript |
| Bundler | Vite |
| Styling | Tailwind CSS v3 + Shadcn UI |
| State / Data | TanStack Query v5 (+ Context for auth) |
| Routing | React‑Router DOM v6 |
| Auth | Google OAuth (`react-oauth/google`) + JWT from backend |
| AI | Gemini API (client‑side fetch) |
| Live Chat | Tawk.to widget |

---

## 2 ▪ Folder / File Layout

front/ ├── index.html ├── src/ │ ├── main.tsx │ ├── App.tsx │ ├── api/ # axios + query hooks │ │ └── client.ts │ ├── auth/ │ │ ├── AuthProvider.tsx │ │ └── useAuth.ts │ ├── components/ │ │ ├── Navbar.tsx │ │ ├── ProductCard.tsx │ │ ├── CartIcon.tsx │ │ └── ... │ ├── pages/ │ │ ├── Home.tsx │ │ ├── Product.tsx │ │ ├── Cart.tsx │ │ ├── Checkout.tsx │ │ └── Admin.tsx │ ├── hooks/ │ └── styles/ │ └── index.css # @tailwind directives ├── tailwind.config.js ├── postcss.config.js └── vite.config.ts

---

## 3 ▪ Dependencies to Install

```bash
npm install react-router-dom @tanstack/react-query axios
npm install -D tailwindcss postcss autoprefixer
npm install @shadcn/ui lucide-react
npm install react-oauth/google jwt-decode
Windsurf: ensure Tailwind init (npx tailwindcss init -p) has been run; if not, create the two config files with default content paths.
( i am using powershell here this document is to give you an idea about frontend)

4 ▪ Environment Variables (.env at repo root)

VITE_API_BASE_URL=http://localhost:5000/api
VITE_GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
VITE_GEMINI_API_KEY=your-gemini-key
VITE_TAWKTO_PROPERTY_ID=xxxxxxxxxxxxxxxxxxxxxxxx
5 ▪ Important Implementation Notes
Auth Flow

On Google login success → hit POST /auth/google on backend → receive JWT → store in localStorage and React context.

Query Setup

Wrap <App /> with QueryClientProvider.

Provide a reusable Axios instance (api/client.ts) that auto‑injects JWT header.

Cart Persistence

Anonymous users: cart in localStorage.

On login: POST local cart to /cart/merge.

AI Product Suggestions

Hit /ai/suggest endpoint (backend proxy to Gemini) or call Gemini directly from frontend—choose the lighter path.

Shadcn Theming

Generate components on demand: npx shadcn-ui@latest add button.

PWA Nice‑to‑Have (skip if time tight)
npm i -D vite-plugin-pwa and add basic manifest for installability.

6 ▪ Dev & Build Commands

# Dev server
npm run dev

# Check type safety
npm run type-check

# Production build
npm run build            # output goes to /front/dist
7 ▪ Deploy (Firebase Hosting)
npm install -g firebase-tools

firebase login

firebase init hosting → set public dir to dist

npm run build

firebase deploy