/**
 * CSRF Token Utility
 * Helper functions to read and include CSRF tokens in API requests
 */

/**
 * Get CSRF token from cookie
 * @returns {string|null} CSRF token or null if not found
 */
export const getCsrfToken = () => {
  // Read cookie value
  const cookies = document.cookie.split(';');
  for (let cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === 'csrf-token') {
      return decodeURIComponent(value);
    }
  }
  return null;
};

/**
 * Get headers with CSRF token included
 * @param {object} additionalHeaders - Additional headers to include
 * @returns {object} Headers object with CSRF token
 */
export const getHeadersWithCsrfToken = (additionalHeaders = {}) => {
  const csrfToken = getCsrfToken();
  return {
    'Content-Type': 'application/json',
    ...(csrfToken && { 'X-CSRF-Token': csrfToken }),
    ...additionalHeaders
  };
};

/**
 * Configure axios instance to include CSRF token in all requests
 * This should be called once during app initialization
 */
export const configureAxiosWithCsrf = (axiosInstance) => {
  // Add request interceptor to include CSRF token in headers
  axiosInstance.interceptors.request.use(
    (config) => {
      const csrfToken = getCsrfToken();
      if (csrfToken) {
        config.headers['X-CSRF-Token'] = csrfToken;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  
  return axiosInstance;
};

export default {
  getCsrfToken,
  getHeadersWithCsrfToken,
  configureAxiosWithCsrf
};

