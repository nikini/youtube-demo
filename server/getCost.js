module.exports = (request = '') => {
  const costs = {
    channels: 1,
    playlistItems: 1,
  };
  
  return costs[request] || 0;
};