// Auth Service - Centralized authentication API calls
const API_BASE_URL = 'http://localhost:8025'; // Update to match your FastAPI port

class AuthService {
  // Login user
  static async login(username, password) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        return { success: true, data };
      } else {
        return { success: false, error: data.detail || 'Login failed' };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Connection error. Please try again.' };
    }
  }

  // Signup user
  static async signup(username, password, email) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, email }),
      });

      const data = await response.json();

      if (response.ok) {
        return { success: true, data };
      } else {
        return { success: false, error: data.detail || 'Signup failed' };
      }
    } catch (error) {
      console.error('Signup error:', error);
      return { success: false, error: 'Connection error. Please try again.' };
    }
  }

  // Logout user
  static async logout(sessionToken) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sessionToken),
      });

      return response.ok;
    } catch (error) {
      console.error('Logout error:', error);
      return false;
    }
  }

  // Check user info
  static async getUserInfo(sessionToken) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/user-info`, {
        headers: {
          Authorization: `Bearer ${sessionToken}`,
        },
      });

      if (response.ok) {
        return await response.json();
      } else {
        return null;
      }
    } catch (error) {
      console.error('Get user info error:', error);
      return null;
    }
  }

  // Verify token validity
  static async verifyToken(sessionToken) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/verify-token`, {
        headers: {
          Authorization: `Bearer ${sessionToken}`,
        },
      });

      return response.ok;
    } catch (error) {
      console.error('Token verification error:', error);
      return false;
    }
  }
}

export default AuthService;

