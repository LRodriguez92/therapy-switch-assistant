/**
 * API Client for Therapy Switch Assistant
 * Handles all HTTP requests to the backend API
 */

const API_BASE_URL = '/api';

/**
 * Generic fetch wrapper with error handling
 */
async function fetchAPI(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  // Add body if provided
  if (options.body && typeof options.body === 'object') {
    config.body = JSON.stringify(options.body);
  }

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `HTTP error! status: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

/**
 * Submit session feedback
 * @param {Object} feedback - Feedback data
 * @param {number} feedback.userId - User ID
 * @param {number} feedback.rating - Rating from 1-5
 * @param {string} [feedback.comment] - Optional comment
 * @returns {Promise<Object>} Response with status and message
 */
export async function submitFeedback({ userId, rating, comment = '' }) {
  return fetchAPI('/feedback', {
    method: 'POST',
    body: { userId, rating, comment },
  });
}

/**
 * Get therapist matches for a user
 * @param {number} userId - User ID
 * @returns {Promise<Object>} Response with therapists array
 */
export async function getMatches(userId) {
  return fetchAPI(`/matches?userId=${userId}`, {
    method: 'GET',
  });
}

/**
 * Switch user's therapist
 * @param {Object} switchData - Switch data
 * @param {number} switchData.userId - User ID
 * @param {number} switchData.therapistId - New therapist ID
 * @returns {Promise<Object>} Response with status and therapist data
 */
export async function switchTherapist({ userId, therapistId }) {
  return fetchAPI('/switch', {
    method: 'POST',
    body: { userId, therapistId },
  });
}

