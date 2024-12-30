// script.js

// Get references to DOM elements
let apiKeyInput;
const saveKeyBtn = document.getElementById('saveKeyBtn');
const videosContainer = document.getElementById('videosContainer');

// We'll store the keywords in this variable once loaded from keywords.json
let keywords = [];

// On page load, read the stored API key from cookies and fetch data
document.addEventListener('DOMContentLoaded', async () => {
  apiKeyInput = document.getElementById('apiKey');
  const storedApiKey = getCookieValue('youtubeApiKey');
  if (storedApiKey) {
    apiKeyInput.value = storedApiKey;
  }

  // Fetch keywords from keywords.json
  await loadKeywords();
  console.log('Loaded keywords:', keywords); // <-- See what the array actually is

  // Now fetch and display live streams using the stored (or blank) API key
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

/**
 * Load the keywords from keywords.json into the global `keywords` array.
 */
async function loadKeywords() {
  try {
    const response = await fetch('keywords.json');
    const data = await response.json();
    // Convert all keywords to lowercase for case-insensitive matching
    keywords = data.map(k => k.toLowerCase());
  } catch (err) {
    console.error('Error loading keywords.json:', err);
    keywords = []; // fallback
  }
}

/**
 * Main function to fetch and display live streams from the channels.json list.
 */
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
    videosContainer.innerHTML = '<p>Could not load channels.</p>';
  }
}

/**
 * For a given channel, check if they have any currently live videos.
 * If so, filter them by keywords and then display them.
 */
async function getLiveVideoForChannel(apiKey, channelId) {
  const url = `https://www.googleapis.com/youtube/v3/search` +
    `?part=snippet&channelId=${channelId}&eventType=live&type=video&key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    // If the channel is live, data.items may contain one or more videos
    if (data.items && data.items.length > 0) {
      data.items.forEach(item => {
        const snippet = item.snippet;
        const videoTitle = snippet.title;
        const videoId = item.id.videoId;
        const channelTitle = snippet.channelTitle;
        const thumbnailUrl = snippet?.thumbnails?.medium?.url || '';

        // Keyword filter check
        const titleLC = videoTitle.toLowerCase();
        const matchesKeyword = keywords.some(kw => titleLC.includes(kw));

        console.log('Video title:', snippet.title);
        console.log('Lowercase title:', titleLC);
        console.log('Keywords:', keywords);
        console.log('Does it match any keyword?', matchesKeyword);

        if (!matchesKeyword) {
          return; // Skip this video if it doesn't match any keyword
        }

        // If it passes the filter, create the HTML element
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

/**
 * Utility to set a cookie
 */
function setCookie(name, value, days) {
  const d = new Date();
  d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
  const expires = `expires=${d.toUTCString()}`;
  document.cookie = `${name}=${value};${expires};path=/`;
}

/**
 * Utility to get a cookie's value
 */
function getCookieValue(name) {
  const nameEq = name + '=';
  const ca = document.cookie.split(';');
  for (let c of ca) {
    c = c.trim();
    if (c.indexOf(nameEq) === 0) {
      return c.substring(nameEq.length, c.length);
    }
  }
  return null;
}
