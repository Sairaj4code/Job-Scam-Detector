const VITE_API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

/**
 * Sends a job analysis request to the backend
 * @param {Object} data - The job data to analyze
 * @returns {Promise<Object>} The analysis result from the backend
 * @throws {Error} If the request fails
 */
export async function analyzeJob(data) {
  const response = await fetch(`${VITE_API_URL}/analyze`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error(`Failed to analyze job: ${response.statusText}`);
  }

  return await response.json();
}

/**
 * Sends a chat message to the AI assistant
 * @param {string} message - The message to send
 * @returns {Promise<Object>} The AI response
 * @throws {Error} If the request fails
 */
export async function chatWithAI(message) {
  const response = await fetch(`${VITE_API_URL}/ai/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ message })
  });

  if (!response.ok) {
    throw new Error(`Failed to get AI response: ${response.statusText}`);
  }

  return await response.json();
}

/**
 * Reports a scam to the backend
 * @param {Object} data - The scam report data
 * @returns {Promise<Object>} The report confirmation
 * @throws {Error} If the request fails
 */
export async function reportScam(data) {
  const response = await fetch(`${VITE_API_URL}/report`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error(`Failed to report scam: ${response.statusText}`);
  }

  return await response.json();
}
