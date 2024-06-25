const getRequestData = require('./getRequestData');

const getChannelData = async (handle) => {
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

const getPlaylistItems = async (playlistId) => {
  const page = await getRequestData('playlistItems', {
    part: 'id,snippet,contentDetails,status',
    playlistId,
  });

  if (!page.data || page.data.pageInfo.totalResults < 1) {
    return null;
  }

  return {
    data: page.data.items,
    cost: page.cost,
  };
}

module.exports = {
  getChannelData,
};