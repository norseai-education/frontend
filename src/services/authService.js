import apiClient from './apiClient';

/**
 * Authentication service for handling user auth operations
 */
class AuthService {
  /**
   * Login user with username and password
   * @param {string} username - User's username
   * @param {string} password - User's password
   * @returns {Promise<{success: boolean, data?: object, error?: string}>}
   */
  static async login(username, password) {
    try {
      const response = await apiClient.post('/auth/login', {
        username,
        password
      });

      const { session_token, student_id, message } = response.data;
      
      // Store tokens in localStorage
      localStorage.setItem('session_token', session_token);
      localStorage.setItem('student_id', student_id.toString());

      return {
        success: true,
        data: {
          message,
          session_token,
          student_id,
          username
        }
      };
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Signup new user
   * @param {string} username - User's username
   * @param {string} password - User's password
   * @param {string} email - User's email (optional)
   * @returns {Promise<{success: boolean, data?: object, error?: string}>}
   */
  static async signup(username, password, email) {
    try {
      const response = await apiClient.post('/auth/signup', {
        username,
        password,
        email
      });

      const { session_token, student_id, message } = response.data;
      
      // Store tokens in localStorage
      localStorage.setItem('session_token', session_token);
      localStorage.setItem('student_id', student_id.toString());

      return {
        success: true,
        data: {
          message,
          session_token,
          student_id,
          username
        }
      };
    } catch (error) {
      console.error('Signup error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Logout current user
   * @returns {Promise<boolean>}
   */
  static async logout() {
    try {
      const sessionToken = localStorage.getItem('session_token');
      
      if (sessionToken) {
        await apiClient.post('/auth/logout');
      }
      
      // Always clear local storage
      localStorage.removeItem('session_token');
      localStorage.removeItem('student_id');
      
      return true;
    } catch (error) {
      console.error('Logout error:', error);
      
      // Still clear local storage even if API call fails
      localStorage.removeItem('session_token');
      localStorage.removeItem('student_id');
      
      return false;
    }
  }

  /**
   * Get current user info
   * @returns {Promise<object|null>}
   */
  static async getUserInfo() {
    try {
      const sessionToken = localStorage.getItem('session_token');
      
      if (!sessionToken) {
        return null;
      }

      const response = await apiClient.get('/auth/user-info');
      const userInfo = response.data;

      if (userInfo.authenticated) {
        return {
          username: userInfo.username,
          student_id: userInfo.student_id,
          authenticated: true
        };
      }
      
      return null;
    } catch (error) {
      console.error('Get user info error:', error);
      
      // Clear invalid tokens
      localStorage.removeItem('session_token');
      localStorage.removeItem('student_id');
      
      return null;
    }
  }

  /**
   * Check if user is currently authenticated
   * @returns {boolean}
   */
  static isAuthenticated() {
    const sessionToken = localStorage.getItem('session_token');
    const studentId = localStorage.getItem('student_id');
    return Boolean(sessionToken && studentId);
  }

  /**
   * Get current student ID
   * @returns {number|null}
   */
  static getCurrentStudentId() {
    const studentId = localStorage.getItem('student_id');
    return studentId ? parseInt(studentId, 10) : null;
  }
}

export default AuthService;