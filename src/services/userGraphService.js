import apiClient from './apiClient';

/**
 * User graph service for handling user graph
 */
class UserGraphService {
  /**
   * Get user graph
   * @param {number} student_id - Student's ID
   * @returns {Promise<{user_graph: object}>}
   */
  static async getUserGraph(student_id) {
    try {
      const response = await apiClient.get(`/user_graph/get_user_graph/${student_id}`);
      return response.data.user_graph;
    } catch (error) {
      console.error('Get user graph error:', error);
      throw error;
    }
  }

  /**
   * Get close concepts
   * @param {number} student_id - Student's ID
   * @returns {Promise<{user_graph: object}>}
   */
    static async getCloseConcepts(student_id) {
      try {
        const response = await apiClient.get(`/user_graph/get_close_graph/${student_id}`);
        return response.data;
      } catch (error) {
        console.error('Get user graph error:', error);
        throw error;
      }
    }

  /**
   * Update user graph
   * @param {number} student_id - Student's ID
   * @param {object} user_graph - User graph object
   * @returns {Promise<{message: string}>}
   */
  static async updateUserGraph(student_id, user_graph) {
    try {
      const response = await apiClient.post(`/user_graph/update_user_graph/${student_id}`, {
        user_graph: user_graph
      });
      return response.data.message;
    } catch (error) {
      console.error('Update user graph error:', error);
      throw error;
    }
  }

  /**
   * Delete user graph
   * @param {number} student_id - Student's ID
   * @returns {Promise<{message: string}>}
   */
  static async deleteUserGraph(student_id) {
    try {
      const response = await apiClient.delete(`/user_graph/delete_user_graph/${student_id}`);
      return response.data.message;
    } catch (error) {
      console.error('Delete user graph error:', error);
      throw error;
    }
  }
}

export default UserGraphService;