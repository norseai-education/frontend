import apiClient from './apiClient';

// Get base URL from apiClient config
const API_BASE_URL = apiClient.defaults?.baseURL || 'https://norseai.sunshinek12.com/api';

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
   * Send message and get streaming response with audio support
   * @param {number} studentId - Student's ID
   * @param {string} message - User's message
   * @param {object} callbacks - Callback functions for different event types
   * @param {function} callbacks.onAudioChunk - Called with base64 audio chunk
   * @param {function} callbacks.onAudioMetadata - Called with audio metadata
   * @param {function} callbacks.onResponse - Called with final AI response
   * @param {function} callbacks.onError - Called on error
   * @returns {Promise<object>} - Final response object
   */
  static async sendMessage(studentId, message, callbacks = {}) {
    const {
      onAudioChunk,
      onAudioMetadata,
      onResponse,
      onError
    } = callbacks;

    try {
      // Get auth token
      const token = localStorage.getItem('session_token');
      const headers = {
        'Content-Type': 'application/json',
      };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      // Use fetch for streaming support
      const response = await fetch(`${API_BASE_URL}/chat/s/${studentId}`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({ message: message.trim() })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Read the stream
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
      let finalResponse = null;

      while (true) {
        const { done, value } = await reader.read();
        
        if (done) {
          break;
        }

        // Decode chunk and add to buffer
        buffer += decoder.decode(value, { stream: true });

        // Process complete SSE messages (format: "data: {...}\n\n")
        const lines = buffer.split('\n');
        buffer = lines.pop() || ''; // Keep incomplete line in buffer

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const jsonString = line.substring(6); // Remove "data: " prefix
              const parsedData = JSON.parse(jsonString);

              console.log('Parsed SSE data:', parsedData);

              // Handle different event types
              if (parsedData.type === 'audio_stream' && parsedData.audio_chunk) {
                if (onAudioChunk) {
                  onAudioChunk(parsedData.audio_chunk);
                }
              } else if (parsedData.type === 'audio_metadata') {
                if (onAudioMetadata) {
                  onAudioMetadata(parsedData);
                }
              } else if (parsedData.type === 'ai_response') {
                finalResponse = parsedData;
                if (onResponse) {
                  onResponse(parsedData);
                }
              } else if (parsedData.type === 'lesson_complete') {
                finalResponse = "complete";
                if (onResponse) {
                  onResponse("complete");
                }
              } else if (parsedData.type === 'error') {
                const error = new Error(parsedData.message || 'Unknown error');
                if (onError) {
                  onError(error);
                }
                throw error;
              }
            } catch (parseError) {
              console.error('Error parsing SSE data:', parseError, 'Line:', line);
            }
          }
        }
      }

      // Return final response for backward compatibility
      if (finalResponse === "complete") {
        return "complete";
      }
      if (finalResponse && typeof finalResponse === 'object') {
        return finalResponse;
      }
      return finalResponse || { content: '' };
    } catch (error) {
      console.error('Send message error:', error);
      if (onError) {
        onError(error);
      }
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