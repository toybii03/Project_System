// src/api/transaction.ts
import axios from 'axios';

export const createTransaction = async (data: { product_id: number; quantity: number }) => {
  const response = await axios.post('/api/transactions', data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  return response.data;
};
