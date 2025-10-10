import apiClient from './apiClient';

/**
 * User service for handling student_id
 */
class UserService {
  /**
   * Get student_id from email
   * @param {string} email - Student's email
   * @returns {Promise<{student_id: number}>}
   */
  static async getStudentId(email) {
    try {
      const response = await apiClient.post(`/user/get_student_id`, {
        email: email
      });
      return response.data;
    } catch (error) {
      console.error('Get student_id error:', error);
      throw error;
    }
  }

    }

export default UserService;