// Example of how you could refactor to use axios
import axios from 'axios';

const API_BASE_URL = 'http://localhost:6700';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for auth tokens (if needed later)
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
    throw error;
  }
);

export class AssessmentAPI {
  // Fetch assessment questions
  static async fetchAssessment() {
    try {
      const response = await apiClient.get('/questions');
      return response.data;
    } catch (error) {
      console.error('Error fetching assessment:', error);
      throw error;
    }
  }

  // Submit assessment answers
  static async submitAssessment(userId, answers) {
    try {
      const submission = {
        user_id: userId,
        answers: answers
      };

      const response = await apiClient.post('/submit', submission);
      return response.data;
    } catch (error) {
      console.error('Error submitting assessment:', error);
      throw error;
    }
  }

  // Get assessment questions (alias for fetchAssessment)
  static async giveAssessment() {
    return this.fetchAssessment();
  }

  // Get assessment result for a user
  static async getAssessmentResult(userId) {
    try {
      const response = await apiClient.get(`/results/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching assessment result:', error);
      throw error;
    }
  }

  // Health check
  static async healthCheck() {
    try {
      const response = await apiClient.get('/profiles/', { timeout: 2000 });
      return response.status === 200;
    } catch (error) {
      console.error('Health check failed:', error);
      return false;
    }
  }
}

export default AssessmentAPI;
