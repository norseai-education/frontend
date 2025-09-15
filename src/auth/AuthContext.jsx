import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check authentication status on app load
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    const sessionToken = localStorage.getItem('session_token');
    const studentId = localStorage.getItem('student_id');
    
    if (!sessionToken || !studentId) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/auth/user-info', {
        headers: {
          Authorization: `Bearer ${sessionToken}`,
        },
      });
      
      const userInfo = await response.json();
      
      if (userInfo.authenticated) {
        setUser({
          username: userInfo.username,
          studentId: studentId,
          sessionToken: sessionToken
        });
        setIsAuthenticated(true);
      } else {
        // Invalid token, clear storage
        localStorage.removeItem('session_token');
        localStorage.removeItem('student_id');
        setUser(null);
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
      // Clear invalid tokens
      localStorage.removeItem('session_token');
      localStorage.removeItem('student_id');
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const login = async (username, password) => {
    try {
      const response = await fetch('/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('session_token', data.session_token);
        localStorage.setItem('student_id', data.student_id);
        
        setUser({
          username: data.username || username,
          studentId: data.student_id,
          sessionToken: data.session_token
        });
        setIsAuthenticated(true);
        
        return { success: true, data };
      } else {
        return { success: false, error: data.detail || 'Login failed' };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Connection error. Please try again.' };
    }
  };

  const logout = async () => {
    const sessionToken = localStorage.getItem('session_token');
    
    try {
      if (sessionToken) {
        await fetch('/auth/logout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(sessionToken),
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Always clear local storage
      localStorage.removeItem('session_token');
      localStorage.removeItem('student_id');
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  const signup = async (username, password, email) => {
    try {
      const response = await fetch('/auth/signup', {
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
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    logout,
    signup,
    checkAuthStatus
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

