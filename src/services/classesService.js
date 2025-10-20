import apiClient from './apiClient';

/**
 * User graph service for handling user graph
 */
class classesService {
  /**
   * Get available classes
   * @returns {Promise<{class_ids: string[], class_names: string[], class_descriptions: string[]}>}
   */
  static async getAvailableClasses() {
    try {
      const response = await apiClient.get(`/classes/available_classes`);
      return response.data;
    } catch (error) {
      console.error('Get available classes error:', error);
      throw error;
    }
  }

  /**
   * Get my classes
   * @param {number} student_id - Student's ID
   * @returns {Promise<{class_ids: string[], class_names: string[], class_descriptions: string[]}>}
   */
    static async getMyClasses(student_id) {
      try {
        const response = await apiClient.get(`/classes/my_classes/${student_id}`);
        return response.data;
      } catch (error) {
        console.error('Get my classes error:', error);
        throw error;
      }
    }

  /**
   * add class
   * @param {number} student_id - Student's ID
   * @param {string} class_id - Class ID
   * @returns {Promise<{message: string}>}
   */
  static async addClasses(student_id, class_id) {
    try {
      const response = await apiClient.post(`/classes/add_class/${student_id}`, {
        class_id: class_id
      });
      return response.data.message;
    } catch (error) {
      console.error('Add class error:', error);
      throw error;
    }
  }

  /**
   * Create a new class
   * @param {string} class_name - Name of the class
   * @param {string} class_description - Description of the class
   * @returns {Promise<{message: string}>}
   */
  static async createClass(class_name, class_description) {
    try {
      const response = await apiClient.post(`/classes/create_class`, {
        class_name: class_name,
        class_description: class_description
      });
      return response.data.message;
    } catch (error) {
      console.error('Create class error:', error);
      throw error;
    }
  }

  /**
   * remove class
   * @param {number} student_id - Student's ID
   * @param {string} class_id - Class ID
   * @returns {Promise<{message: string}>}
   */
  static async removeClass(student_id, class_id) {
    try {
      const response = await apiClient.delete(`/classes/remove_class/${student_id}`, {
        data: {
          class_id: class_id
        }
      });
      return response.data.message;
    } catch (error) {
      console.error('Remove classes error:', error);
      throw error;
    }
  }

  /**
   * delete class
   * @param {string} class_id - Class ID
   * @returns {Promise<{message: string}>}
   */
  static async deleteClass(class_id) {
    try {
      const response = await apiClient.delete(`/classes/delete_class`, {
        data: {
          class_id: class_id
        }
      });
      return response.data.message;
    } catch (error) {
      console.error('Delete class error:', error);
      throw error;
    }
  }
}


export default classesService;