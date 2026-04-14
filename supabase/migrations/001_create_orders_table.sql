-- Run this in your Supabase SQL Editor (https://supabase.com/dashboard → SQL Editor)
-- This creates the `orders` table for storing payment records

CREATE TABLE IF NOT EXISTS orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT NOT NULL,
  razorpay_order_id TEXT,
  payment_id TEXT,
  payment_method TEXT NOT NULL CHECK (payment_method IN ('online', 'COD')),
  amount NUMERIC(10, 2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('paid', 'pending', 'failed')),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Allow inserts from service role (API routes use service role key)
CREATE POLICY "Allow service role insert" ON orders
  FOR INSERT
  WITH CHECK (true);

-- Allow service role to select
CREATE POLICY "Allow service role select" ON orders
  FOR SELECT
  USING (true);
