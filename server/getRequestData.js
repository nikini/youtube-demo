const axios = require('axios');
const getCost = require('./getCost');

// Replace 'YOUR_API_KEY' with your actual YouTube Data API v3 key
const API_KEY = 'AIzaSyD6jf5lk4GQGtqtB4TBITA4LyQ8kx08S4w';

module.exports = async (requestName, params = {}) => {
  try {
    const response = await axios.get(`https://www.googleapis.com/youtube/v3/${requestName}`, {
      params: {
        key: API_KEY,
        ...params,
      },
    });

    return {
      data: response.data,
      cost: getCost(requestName),
    };
  } catch (error) {
    if (error.response) {
      console.error('Error in request: ', requestName);
      console.error('Error response:', error.response.data);
      console.error('Error status:', error.response.status);
      console.error('Error headers:', error.response.headers);
    } else if (error.request) {
      console.error('Error request:', error.request);
    } else {
      console.error('Error message:', error.message);
    }
    throw error;
  }
};