const getRequestData = require('./getRequestData');
const getPlaylistItems = require('./getPlaylistItems');

module.exports = async (handle) => {
  const page = await getRequestData('channels', {
    part: 'snippet,contentDetails,statistics',
    forHandle: handle,
    maxResults: 5,
  });

  if (!page.data || page.data.pageInfo.totalResults < 1) {
      return null;
  }

  let totalCost = page.cost;
  const channelData = page.data.items[0];
  
  // Get uploads
  const uploadPlaylistId = channelData.contentDetails.relatedPlaylists.uploads;
  const uploadedItems = await getPlaylistItems(uploadPlaylistId);
  totalCost += uploadedItems.cost;

  return {
    data: {
      ...channelData,
      uploads: [
        ...uploadedItems.data,
      ],
    },
    cost: totalCost,
  };
}