const getRequestData = require('./getRequestData');

module.exports = async (playlistId) => {
  const page = await getRequestData('playlistItems', {
    part: 'id,snippet,contentDetails,status',
    playlistId,
    maxResults: 20,
  });

  if (!page.data || page.data.pageInfo.totalResults < 1) {
    return null;
  }

  return {
    data: page.data.items,
    cost: page.cost,
  };
}