// script.js

// Get references to DOM elements
const apiKeyInput = document.getElementById('apiKey');
const saveKeyBtn = document.getElementById('saveKeyBtn');
const videosContainer = document.getElementById('videosContainer');

// On page load, read the stored API key from cookies
document.addEventListener('DOMContentLoaded', () => {
  const storedApiKey = getCookieValue('youtubeApiKey');
  if (storedApiKey) {
    apiKeyInput.value = storedApiKey;
  }
  // Fetch and display live streams
  fetchLiveStreams(storedApiKey);
});

// When the button is clicked, save the key in a cookie and fetch live streams
saveKeyBtn.addEventListener('click', () => {
  const newApiKey = apiKeyInput.value.trim();
  if (!newApiKey) {
    alert('Please enter a valid YouTube API key.');
    return;
  }
  setCookie('youtubeApiKey', newApiKey, 365); // store for 365 days
  fetchLiveStreams(newApiKey);
});

// Helper function to fetch live streams from the channels.json
async function fetchLiveStreams(apiKey) {
  if (!apiKey) {
    videosContainer.innerHTML = '<p>Please enter a YouTube API key above.</p>';
    return;
  }

  try {
    // Load channel IDs from channels.json
    const res = await fetch('channels.json');
    const channelIds = await res.json();

    // Clear the container
    videosContainer.innerHTML = '';

    // For each channel, call YouTube API to check if there's a live stream
    for (const channelId of channelIds) {
      await getLiveVideoForChannel(apiKey, channelId);
    }
  } catch (error) {
    console.error('Error fetching live streams:', error);
  }
}

// Get the live video for a given channel
async function getLiveVideoForChannel(apiKey, channelId) {
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&eventType=live&type=video&key=${apiKey}`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.items && data.items.length > 0) {
      // Usually, there will be only one live item per channel, 
      // but let's just handle all items in case there are multiple
      data.items.forEach(item => {
        const videoId = item.id.videoId;
        const snippet = item.snippet;

        const thumbnailUrl = snippet.thumbnails && snippet.thumbnails.medium
          ? snippet.thumbnails.medium.url
          : '';
        const channelTitle = snippet.channelTitle;
        const videoTitle = snippet.title;

        // Create HTML elements to display the video
        const videoEl = document.createElement('div');
        videoEl.className = 'video-item';

        videoEl.innerHTML = `
          <a href="https://www.youtube.com/watch?v=${videoId}" target="_blank">
            <img src="${thumbnailUrl}" alt="Thumbnail" />
            <h3>${videoTitle}</h3>
          </a>
          <p>${channelTitle}</p>
        `;

        videosContainer.appendChild(videoEl);
      });
    }
  } catch (error) {
    console.error('Error retrieving live video for channel:', channelId, error);
  }
}

// Utility: Set a cookie
function setCookie(name, value, days) {
  const d = new Date();
  d.setTime(d.getTime() + (days*24*60*60*1000));
  const expires = `expires=${d.toUTCString()}`;
  document.cookie = `${name}=${value};${expires};path=/`;
}

// Utility: Retrieve a cookie value
function getCookieValue(name) {
  const nameEq = name + '=';
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i].trim();
    if (c.indexOf(nameEq) === 0) {
      return c.substring(nameEq.length, c.length);
    }
  }
  return null;
}
