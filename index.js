const express = require('express');
const axios = require('axios');
const path = require('path');

const getVideos = require('./server/getVideos');

// Make the app
const app = express();
const port = 3000;

// Set EJS as the view engine
app.set('view engine', 'ejs');
// Define the directory where your HTML files (views) are located
app.set('views', path.join(__dirname, 'views'));

app.get('/', async (req, res) => {
  const response = await getVideos();
  res.render('index', {
    data: response.data,
    cost: response.cost,
  });
});

// API to get the videos
app.get('/videos', async (req, res) => {
  let videos = [];
  let nextPageToken = '';

  try {
    const response = await getVideos();
    res.json(response);
  } catch (error) {
    res.status(500).send('Error retrieving videos. Check server logs for more details.');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
