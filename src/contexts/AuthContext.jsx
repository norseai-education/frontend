import React, { createContext, useContext, useState, useEffect } from 'react';
import AuthService from '../services/authService';

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
    try {
      const userInfo = await AuthService.getUserInfo();
      
      if (userInfo && userInfo.authenticated) {
        setUser({
          username: userInfo.username,
          studentId: userInfo.student_id,
          sessionToken: localStorage.getItem('session_token')
        });
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const login = async (username, password) => {
    try {
      const result = await AuthService.login(username, password);
      
      if (result.success) {
        setUser({
          username: result.data.username,
          studentId: result.data.student_id,
          sessionToken: result.data.session_token
        });
        setIsAuthenticated(true);
        
        return { success: true, data: result.data };
      } else {
        return { success: false, error: result.error };
      }
    } catch (error) {
      console.error('Login error in context:', error);
      return { success: false, error: 'An unexpected error occurred' };
    }
  };

  const signup = async (username, password, email) => {
    try {
      const result = await AuthService.signup(username, password, email);
      
      if (result.success) {
        setUser({
          username: result.data.username,
          studentId: result.data.student_id,
          sessionToken: result.data.session_token
        });
        setIsAuthenticated(true);
        
        return { success: true, data: result.data };
      } else {
        return { success: false, error: result.error };
      }
    } catch (error) {
      console.error('Signup error in context:', error);
      return { success: false, error: 'An unexpected error occurred' };
    }
  };

  const logout = async () => {
    try {
      await AuthService.logout();
    } catch (error) {
      console.error('Logout error in context:', error);
    } finally {
      setUser(null);
      setIsAuthenticated(false);
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