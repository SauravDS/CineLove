const API_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:3001';

const api = {
  async request(method, endpoint, data = null, options = {}) {
    const url = `${API_URL}${endpoint}`;
    const config = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    if (data) {
      config.body = JSON.stringify(data);
    }

    try {
      const response = await fetch(url, config);
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || `HTTP error! Status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`API Error (${method} ${endpoint}):`, error.message);
      throw error;
    }
  },

  get(endpoint, options = {}) {
    return this.request('GET', endpoint, null, options);
  },

  post(endpoint, data, options = {}) {
    return this.request('POST', endpoint, data, options);
  },

  // Add more methods (PUT, DELETE) if needed
};

export default api;