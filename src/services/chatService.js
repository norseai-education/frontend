import apiClient from './apiClient';

/**
 * Chat service for handling AI chat operations with streaming support
 */
class ChatService {
  /**
   * Initialize chat session for student
   * @param {number} studentId - Student's ID
   * @param {object} userGraph - Optional user graph object
   * @returns {Promise<{message: string}>}
   */
  static async initializeSession(studentId, userGraph = null) {
    try {
      const response = await apiClient.post(`/chat/init/${studentId}`, userGraph);
      return {
        message: response.data.message
      };
    } catch (error) {
      console.error('Initialize session error:', error);
      throw error;
    }
  }

  /**
   * Send message and get response
   * @param {number} studentId - Student's ID
   * @param {string} message - User's message
   * @returns {Promise<string>} - Complete response
   */
  static async sendMessage(studentId, message) {
    try {
      const response = await apiClient.post(`/chat/s/${studentId}`, {
        message: message.trim()
      });

      console.log('Full response:', response.data);
      
      // Parse the response to dict
      let parsedData;
      if (typeof response.data === 'string' && response.data.startsWith('data: ')) {
        const jsonString = response.data.substring(6); // Remove "data: " prefix
        parsedData = JSON.parse(jsonString);
      } else {
        parsedData = response.data;
      }
      
      console.log('Parsed data:', parsedData);
      console.log('Content:', parsedData.content);
      
      return parsedData.content || parsedData.response || parsedData.message || '';
    } catch (error) {
      console.error('Send message error:', error);
      throw error;
    }
  }

  /**
   * End chat session
   * @param {number} studentId - Student's ID
   * @returns {Promise<{message: string}>}
   */
  static async endSession(studentId) {
    try {
      const response = await apiClient.delete(`/chat/session/${studentId}`);
      return {
        message: response.data.message
      };
    } catch (error) {
      console.error('End session error:', error);
      throw error;
    }
  }

  /**
   * Get chat status for student
   * @param {number} studentId - Student's ID
   * @returns {Promise<{active: boolean, messageCount?: number, lessonState?: object, currentObjective?: string}>}
   */
  static async getStatus(studentId) {
    try {
      const response = await apiClient.get(`/chat/status/${studentId}`);
      return {
        active: response.data.active,
        messageCount: response.data.message_count,
        lessonState: response.data.lesson_state,
        currentObjective: response.data.current_objective
      };
    } catch (error) {
      console.error('Get status error:', error);
      throw error;
    }
  }

  /**
   * Health check for chat service
   * @returns {Promise<boolean>}
   */
  static async healthCheck() {
    try {
      const response = await apiClient.get('/health', { timeout: 2000 });
      return response.status === 200;
    } catch (error) {
      console.error('Health check failed:', error);
      return false;
    }
  }
}

export default ChatService;