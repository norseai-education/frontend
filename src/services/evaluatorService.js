import apiClient from './apiClient';

class EvaluatorService {
      /**
   * Store evaluation
   * @param {number} student_id - Student's ID
   * @param {string}{evaluation 
   * @param {object} grade
   * @param {string} student_evaluation
   * @param {object} student_grade}
   * @returns {Promise<{message: string}>}
   */
  static async storeEvaluation(student_id, evaluation, grade, student_evaluation, student_grade) {
    try {
      const response = await apiClient.post(`/evaluator_store/store_evaluation`, {
        student_id: student_id,
        evaluation: evaluation,
        grade: grade,
        student_evaluation: student_evaluation,
        student_grade: student_grade
      });

      return response.data.message;
    } catch (error) {
      console.error('Store evaluation error:', error);
      throw error;
    }
  }
}

export default EvaluatorService;