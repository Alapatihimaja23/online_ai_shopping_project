-- ========== EXTENSIONS ==========
-- pgcrypto provides gen_random_uuid()
create extension if not exists pgcrypto;

-- ========== TABLES ==========

-- Users
create table if not exists public.users (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text unique not null,
  password_hash text not null,
  role text check (role in ('guest','user','merchant','admin','delivery')) default 'user',
  is_active boolean default true
);

-- Products
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  image text,
  price numeric(10,2) not null,
  category text,
  stock_quantity int default 0,
  user_id uuid references public.users(id) on delete set null,
  constraint unique_product_title unique (title)
);

-- Carts
create table if not exists public.carts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete cascade,
  created_at timestamp default now()
);

-- Cart items
create table if not exists public.cart_items (
  id uuid primary key default gen_random_uuid(),
  cart_id uuid references public.carts(id) on delete cascade,
  product_id uuid references public.products(id),
  quantity int default 1,
  constraint unique_cartitem unique (cart_id, product_id)
);

-- Orders
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id),
  merchant_id uuid references public.users(id),
  total_price numeric(10,2),
  status text check (status in ('pending','confirmed','delivered')) default 'pending',
  created_at timestamp default now()
);

-- Order items
create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references public.orders(id) on delete cascade,
  product_id uuid references public.products(id),
  quantity int,
  price numeric(10,2)
);

-- Admin actions
create table if not exists public.admin_actions (
  id uuid primary key default gen_random_uuid(),
  admin_id uuid references public.users(id),
  action_type text,
  target_user_id uuid,
  product_id uuid,
  timestamp timestamp default now()
);

-- Optional: product reviews
create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  product_id uuid references public.products(id),
  user_id uuid references public.users(id),
  rating int check (rating between 1 and 5),
  comment text,
  created_at timestamp default now()
);

--
-- NOTE for Supabase SQL Editor:
-- This schema is idempotent and can be run multiple times safely.
-- Product title is unique for upsert/merge in seed scripts.
-- Add ON CONFLICT (title) DO UPDATE for upserts in data scripts.
--
