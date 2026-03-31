import axios from 'axios';

// This creates a custom Axios version with your defaults baked in.
// If VITE_API_URL exists, it uses it. Otherwise, it fails gracefully.
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  withCredentials: true, // Automatically sends cookies with EVERY request
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;