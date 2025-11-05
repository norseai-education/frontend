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
      
      if (parsedData.type === 'ai_response') {
        return parsedData;
      }
      if (parsedData.type === 'lesson_complete'){
        return "complete";
      }
      if (parsedData.type === 'error'){
        return parsedData.message;
      }
      return parsedData.content;
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
   * Send message with streaming response
   * @param {number} studentId - Student's ID
   * @param {string} message - User's message
   * @param {function} onStreamChunk - Callback function for streaming chunks (type: 'ai_response_stream')
   * @param {function} onFinalResponse - Callback function for final response (type: 'ai_response')
   * @returns {Promise<void>}
   */
  static async sendMessageStream(studentId, message, onStreamChunk, onFinalResponse) {
    try {
      const token = localStorage.getItem('session_token');
      const headers = {
        'Content-Type': 'application/json',
      };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(`${apiClient.defaults.baseURL}/chat/s/${studentId}`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({ message: message.trim() }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        
        // Process complete SSE events (format: "data: {...}\n\n")
        // Split by double newline to get complete events
        const events = buffer.split('\n\n');
        // Keep the last potentially incomplete event in buffer
        buffer = events.pop() || '';

        for (const event of events) {
          if (!event.trim()) continue;
          
          // Each event may have multiple lines, but we only care about "data: " lines
          const lines = event.split('\n');
          for (const line of lines) {
            if (line.startsWith('data: ')) {
              try {
                const jsonString = line.substring(6); // Remove "data: " prefix
                const parsedData = JSON.parse(jsonString);
                
                if (parsedData.type === 'ai_response_stream' && parsedData.content) {
                  onStreamChunk(parsedData.content);
                } else if (parsedData.type === 'ai_response') {
                  onFinalResponse(parsedData);
                } else if (parsedData.type === 'lesson_complete') {
                  onFinalResponse({ type: 'lesson_complete', message: parsedData.message });
                } else if (parsedData.type === 'error') {
                  throw new Error(parsedData.message || 'An error occurred');
                }
              } catch (parseError) {
                console.error('Error parsing SSE data:', parseError, line);
              }
            }
          }
        }
      }

      // Process any remaining buffer content
      if (buffer.trim()) {
        const lines = buffer.split('\n');
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const jsonString = line.substring(6);
              const parsedData = JSON.parse(jsonString);
              
              if (parsedData.type === 'ai_response_stream' && parsedData.content) {
                onStreamChunk(parsedData.content);
              } else if (parsedData.type === 'ai_response') {
                onFinalResponse(parsedData);
              }
            } catch (parseError) {
              console.error('Error parsing SSE data:', parseError, line);
            }
          }
        }
      }
    } catch (error) {
      console.error('Streaming error:', error);
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