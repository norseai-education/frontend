// Assessment API Service
const API_BASE_URL = 'http://localhost:8000';

// Helper function to add timeout to fetch requests
const fetchWithTimeout = async (url, options = {}, timeout = 5000) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') {
      throw new Error('Request timed out. Please check your connection.');
    }
    throw error;
  }
};

export class AssessmentAPI {
  // Fetch assessment data
  static async fetchAssessment(assessmentId = 1) {
    try {
      const response = await fetchWithTimeout(`${API_BASE_URL}/assessments/${assessmentId}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch assessment: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching assessment:', error);
      throw error;
    }
  }

  // Submit assessment answers
  static async submitAssessment(assessmentId, answers, timeTaken) {
    try {
      const submission = {
        assessment_id: assessmentId,
        answers: answers.map((answer, index) => ({
          question_id: index + 1,
          selected_option: answer
        })).filter(answer => answer.selected_option !== null),
        time_taken: timeTaken
      };

      const response = await fetchWithTimeout(`${API_BASE_URL}/assessments/${assessmentId}/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submission)
      });

      if (!response.ok) {
        throw new Error(`Failed to submit assessment: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error submitting assessment:', error);
      throw error;
    }
  }

  // Health check
  static async healthCheck() {
    try {
      const response = await fetchWithTimeout(`${API_BASE_URL}/health`, {}, 2000);
      return response.ok;
    } catch (error) {
      console.error('Health check failed:', error);
      return false;
    }
  }
}

export default AssessmentAPI;
