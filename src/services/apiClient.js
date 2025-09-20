import axios from 'axios';

// Base API configuration
const API_BASE_URL = 'http://172.16.0.154:6767/'; // Adjust to match your FastAPI server port

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for auth tokens
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('session_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ECONNABORTED') {
      throw new Error('Request timed out. Please check your connection.');
    }
    
    if (error.response?.status === 401) {
      // Unauthorized - clear tokens and redirect to login
      localStorage.removeItem('session_token');
      localStorage.removeItem('student_id');
      window.location.href = '/login';
    }
    
    // Return formatted error
    const message = error.response?.data?.detail || error.message || 'An unexpected error occurred';
    throw new Error(message);
  }
);

export default apiClient;