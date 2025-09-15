// Example of how you could refactor to use axios
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8025';

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
  // Fetch assessment data
  static async fetchAssessment(assessmentId = 1) {
    try {
      const response = await apiClient.get(`/assessments/${assessmentId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching assessment:', error);
      throw error;
    }
  }

  // Submit assessment answers
  static async submitAssessment(assessmentId, answers, timeTaken) {
    try {
      const submission = {
        assessment_id: assessmentId,
        answers: answers.map((answer, index) => ({
          question_id: index + 1,
          selected_option: answer
        })).filter(answer => answer.selected_option !== null),
        time_taken: timeTaken
      };

      const response = await apiClient.post(`/assessments/${assessmentId}/submit`, submission);
      return response.data;
    } catch (error) {
      console.error('Error submitting assessment:', error);
      throw error;
    }
  }

  // Get assessment problems
  static async giveAssessment() {
    try {
      const response = await apiClient.get('/assessment/give_assessment');
      return response.data;
    } catch (error) {
      console.error('Error fetching assessment problems:', error);
      throw error;
    }
  }

  // Health check
  static async healthCheck() {
    try {
      const response = await apiClient.get('/health', { timeout: 2000 });
      return response.status === 200;
    } catch (error) {
      console.error('Health check failed:', error);
      return false;
    }
  }
}

export default AssessmentAPI;
