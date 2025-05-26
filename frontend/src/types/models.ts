// src/types/models.ts

export interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  description?: string;
}

export interface Transaction {
  id: number;
  product_id: number;
  quantity: number;
  total_price: number;
  date: string; // ISO date string
  discount?: number; // percentage discount, optional
}

export interface Feedback {
  id: number;
  transaction_id: number;
  rating: number; // 1 to 5
  comments?: string;
  created_at: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'cashier' | 'manager';
  token?: string; // Auth token if needed
}

export interface SalesTrend {
  date: string; // e.g., '2025-05-20'
  total_sales: number;
}

export interface FeedbackSummary {
  rating: number; // 1 to 5
  count: number;
}
