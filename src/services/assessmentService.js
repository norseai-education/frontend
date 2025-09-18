import apiClient from './apiClient';

/**
 * Assessment service for handling assessment-related API operations
 */
class AssessmentService {
  /**
   * Check if student needs to take an assessment
   * @param {number} studentId - Student's ID
   * @returns {Promise<{giveAssessment: boolean}>}
   */
  static async checkNeedAssessment(studentId) {
    try {
      const response = await apiClient.post(`/assessment/check/${studentId}`);
      return response.data;
    } catch (error) {
      console.error('Check assessment error:', error);
      throw error;
    }
  }

  /**
   * Get assessment problems for new student
   * @returns {Promise<{problems: Array, numberProblems: number}>}
   */
  static async getAssessment() {
    try {
      const response = await apiClient.get('/assessment/give_assessment');
      return {
        problems: response.data.problems,
        numberProblems: response.data.number_problems
      };
    } catch (error) {
      console.error('Get assessment error:', error);
      throw error;
    }
  }

  /**
   * Submit assessment answers for evaluation
   * @param {Array} studentAnswers - Array of {problem_id, student_answer}
   * @returns {Promise<{solutions: Array, totalCorrect: number}>}
   */
  static async submitAssessment(studentAnswers) {
    try {
      const response = await apiClient.post('/assessment/submit', {
        student_answers: studentAnswers
      });
      return {
        solutions: response.data.solutions,
        totalCorrect: response.data.total_correct
      };
    } catch (error) {
      console.error('Submit assessment error:', error);
      throw error;
    }
  }

  /**
   * Store assessment for a student
   * @param {number} studentId - Student's ID
   * @param {Array} studentAnswers - Array of {problem_id, student_answer, time_spent_seconds}
   * @returns {Promise<{assessmentId: string}>}
   */
  static async storeAssessment(studentId, studentAnswers) {
    try {
      const response = await apiClient.post(`/assessment/store_assessment/${studentId}`, {
        student_answers: studentAnswers
      });
      return {
        assessmentId: response.data.assessment_id
      };
    } catch (error) {
      console.error('Store assessment error:', error);
      throw error;
    }
  }

  /**
   * Retrieve past assessment for student
   * @param {number} studentId - Student's ID
   * @returns {Promise<{problems: Array, numberProblems: number, numberCorrect: number}>}
   */
  static async retrieveAssessment(studentId) {
    try {
      const response = await apiClient.get(`/assessment/retrieve_assessment/${studentId}`);
      return {
        problems: response.data.problems,
        numberProblems: response.data.number_problems,
        numberCorrect: response.data.number_correct
      };
    } catch (error) {
      console.error('Retrieve assessment error:', error);
      throw error;
    }
  }

  /**
   * Update knowledge graph based on assessment
   * @param {string} assessmentId - Assessment ID
   * @param {object} userGraph - Optional user graph object
   * @returns {Promise<{userGraph: object}>}
   */
  static async updateKnowledgeGraph(assessmentId, userGraph = null) {
    try {
      const response = await apiClient.post(`/assessment/update_knowledge/${assessmentId}`, {
        user_graph: userGraph
      });
      return {
        userGraph: response.data.user_graph
      };
    } catch (error) {
      console.error('Update knowledge graph error:', error);
      throw error;
    }
  }

  /**
   * Delete assessment from database
   * @param {string} assessmentId - Assessment ID
   * @returns {Promise<{message: string}>}
   */
  static async deleteAssessment(assessmentId) {
    try {
      const response = await apiClient.delete(`/assessment/delete_assessment/${assessmentId}`);
      return {
        message: response.data.message
      };
    } catch (error) {
      console.error('Delete assessment error:', error);
      throw error;
    }
  }
}

export default AssessmentService;