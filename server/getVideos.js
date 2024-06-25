const moment = require('moment');
const { getChannelData } = require('./methods');

// Channels
const channels = ['veganpowerlab', 'veganpostmortem'];

module.exports = async () => {
  const finalResponse = {
    data: [],
    cost: 0,
  };

  await Promise.all(channels.map(async (handle) => {
    const response = await getChannelData(handle);
    
    // We're only interested in uploads right now
    finalResponse.data = finalResponse.data.concat(response.data.uploads);

    // And cost
    finalResponse.cost += response.cost;
  }));

  // Let's sort by date
  finalResponse.data.sort((a, b) => {
    const dateA = moment(a.snippet.publishedAt);
    const dateB = moment(b.snippet.publishedAt);
    return dateB.unix() - dateA.unix();
  });

  return finalResponse;
};