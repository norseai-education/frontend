import { useAuth0 } from '@auth0/auth0-react';

class LogoutService {
  /**
   * Logout from both Auth0 and custom auth system
   * @param {boolean} clearAuth0Session - Whether to clear Auth0 session (true for manual logout, false for tab close)
   * @returns {Promise<boolean>}
   */
  static async logout(clearAuth0Session = true) {
    try {
      // Clear custom auth system
      const sessionToken = localStorage.getItem('session_token');
      
      if (sessionToken) {
        await fetch('/auth/logout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(sessionToken),
        });
      }
      
      // Always clear local storage
      localStorage.removeItem('session_token');
      localStorage.removeItem('student_id');
      
      // If this is a manual logout, we need to clear Auth0 session
      if (clearAuth0Session) {
        // We'll need to call this from a component that has access to useAuth0
        return { success: true, clearAuth0: true };
      }
      
      return { success: true, clearAuth0: false };
    } catch (error) {
      console.error('Logout error:', error);
      
      // Still clear local storage even if API call fails
      localStorage.removeItem('session_token');
      localStorage.removeItem('student_id');
      
      return { success: false, clearAuth0: clearAuth0Session };
    }
  }
}

export default LogoutService;
