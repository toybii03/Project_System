# React + Vite Frontend Starter

## Setup
1. Run `npm install`
2. Run `npm run dev`
3. Visit http://localhost:5173 in your browser

## API connection
API base URL set to http://127.0.0.1:8000/api via `.env` file

## Axios sample usage
```ts
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export default api;
```
