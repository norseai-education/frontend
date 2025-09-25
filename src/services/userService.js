import apiClient from './apiClient';

/**
 * User service for handling user profile-related API operations
 */
class UserService {
  /**
   * Get all user profiles
   * @returns {Promise<Object>} Dictionary of user profiles
   */
  static async getAllProfiles() {
    try {
      const response = await apiClient.get('/profiles/');
      return response.data;
    } catch (error) {
      console.error('Get all profiles error:', error);
      throw error;
    }
  }

  /**
   * Get a specific user profile by ID
   * @param {string} userId - User's UUID
   * @returns {Promise<Object>} User profile object
   */
  static async getUserProfile(userId) {
    try {
      const response = await apiClient.get(`/profiles/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Get user profile error:', error);
      throw error;
    }
  }

  /**
   * Create a new user profile
   * @param {Object} profileData - User profile data (name, email, bio, age)
   * @returns {Promise<Object>} Created user profile
   */
  static async createUserProfile(profileData) {
    try {
      const response = await apiClient.post('/profiles/', profileData);
      return response.data;
    } catch (error) {
      console.error('Create user profile error:', error);
      throw error;
    }
  }

  /**
   * Update an existing user profile
   * @param {string} userId - User's UUID
   * @param {Object} profileData - Updated profile data
   * @returns {Promise<Object>} Updated user profile
   */
  static async updateUserProfile(userId, profileData) {
    try {
      const response = await apiClient.put(`/profiles/${userId}`, profileData);
      return response.data;
    } catch (error) {
      console.error('Update user profile error:', error);
      throw error;
    }
  }

  /**
   * Delete a user profile
   * @param {string} userId - User's UUID
   * @returns {Promise<void>}
   */
  static async deleteUserProfile(userId) {
    try {
      await apiClient.delete(`/profiles/${userId}`);
    } catch (error) {
      console.error('Delete user profile error:', error);
      throw error;
    }
  }
}

export default UserService;
