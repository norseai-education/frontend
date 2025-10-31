import apiClient from './apiClient';

class EvaluatorService {
  /**
   * Store evaluation
   * @param {number} student_id - Student's ID
   * @param {string} evaluation - Evaluation string
   * @param {object} grade - Grade object
   * @returns {Promise<{message: string}}>} - returns string of the object_id of stored evaluation
   */
  static async storeEvaluation(student_id, evaluation, grade) {
    try {
      const response = await apiClient.post(`/evaluator_store/store_evaluation`, {
        student_id: student_id,
        evaluation: evaluation,
        grade: grade
      });

      return response.data.message;
    } catch (error) {
      console.error('Store evaluation error:', error);
      throw error;
    }
  }

  /**
   * Update evaluation
   * @param {number} object_id - Object's ID
   * @param {string} student_evaluation - Evaluation string
   * @param {object} student_grade - Student grade object
   * @returns {Promise<message: string>}
   */
  static async updateEvaluation(object_id, student_evaluation, student_grade) {
    try {
      const response = await apiClient.post(`/evaluator_store/update_evaluation`, {
        object_id: object_id,
        student_evaluation: student_evaluation,
        student_grade: student_grade
      });
      return response.data.message;
    } catch (error) {
      console.error('Update evaluation error:', error);
      throw error;
    }
  }
}

export default EvaluatorService;