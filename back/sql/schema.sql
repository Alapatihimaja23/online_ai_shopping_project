-- ========== EXTENSIONS ==========
-- pgcrypto provides gen_random_uuid()
create extension if not exists pgcrypto;

-- ========== TABLES ==========

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

-- Carts
create table public.carts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete cascade,
  created_at timestamp default now()
);

-- Cart items
create table public.cart_items (
  id uuid primary key default gen_random_uuid(),
  cart_id uuid references public.carts(id) on delete cascade,
  product_id uuid references public.products(id),
  quantity int default 1
);

-- Orders
create table public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id),
  merchant_id uuid references public.users(id),
  total_price numeric(10,2),
  status text check (status in ('pending','confirmed','delivered')) default 'pending',
  created_at timestamp default now()
);

-- Order items
create table public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references public.orders(id) on delete cascade,
  product_id uuid references public.products(id),
  quantity int,
  price numeric(10,2)
);

-- Admin actions
create table public.admin_actions (
  id uuid primary key default gen_random_uuid(),
  admin_id uuid references public.users(id),
  action_type text,
  target_user_id uuid,
  product_id uuid,
  timestamp timestamp default now()
);

-- Optional: product reviews
create table public.reviews (
  id uuid primary key default gen_random_uuid(),
  product_id uuid references public.products(id),
  user_id uuid references public.users(id),
  rating int check (rating between 1 and 5),
  comment text,
  created_at timestamp default now()
);
