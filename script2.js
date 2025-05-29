// Main script logic
document.addEventListener('DOMContentLoaded', () => {
    const API_KEY_STORAGE_KEY = 'youtubeApiKey';
    const apiKeyInput = document.getElementById('apiKey');
    const saveApiKeyButton = document.getElementById('saveApiKey');
    const apiKeyStatus = document.getElementById('apiKeyStatus');
    const loadingIndicator = document.getElementById('loadingIndicator');
    const errorDisplay = document.getElementById('errorDisplay');
    const videoSectionsContainer = document.getElementById('videoSectionsContainer');

    const keywordLiveStreamsContainer = document.getElementById('keywordLiveStreams');
    const otherLiveStreamsContainer = document.getElementById('otherLiveStreams');
    const upcomingStreamsContainer = document.getElementById('upcomingStreams');

    const noKeywordLiveStreamsMsg = document.getElementById('noKeywordLiveStreams');
    const noOtherLiveStreamsMsg = document.getElementById('noOtherLiveStreams');
    const noUpcomingStreamsMsg = document.getElementById('noUpcomingStreams');

    // Modal related elements and functions removed

    let currentApiKey = '';

    // --- API Key Management ---
    function loadApiKey() {
        const storedKey = localStorage.getItem(API_KEY_STORAGE_KEY);
        if (storedKey) {
            apiKeyInput.value = storedKey;
            currentApiKey = storedKey;
            apiKeyStatus.textContent = 'API Key loaded.';
            apiKeyStatus.className = 'text-xs mt-1.5 text-green-400';
            fetchAllVideos();
        } else {
            apiKeyStatus.textContent = 'Enter API Key.';
            apiKeyStatus.className = 'text-xs mt-1.5 text-yellow-400';
            videoSectionsContainer.classList.add('hidden');
        }
    }

    saveApiKeyButton.addEventListener('click', () => {
        const key = apiKeyInput.value.trim();
        if (key) {
            localStorage.setItem(API_KEY_STORAGE_KEY, key);
            currentApiKey = key;
            apiKeyStatus.textContent = 'Key saved! Loading...';
            apiKeyStatus.className = 'text-xs mt-1.5 text-green-400';
            fetchAllVideos();
        } else {
            apiKeyStatus.textContent = 'Key cannot be empty.';
            apiKeyStatus.className = 'text-xs mt-1.5 text-red-400';
            localStorage.removeItem(API_KEY_STORAGE_KEY);
            currentApiKey = '';
            clearAllVideoSections();
            videoSectionsContainer.classList.add('hidden');
        }
    });

    // --- YouTube API Fetching (Optimized) ---
    async function fetchFromYouTubeAPI(endpoint, params) {
        if (!currentApiKey) {
            showError('API Key is missing. Please enter your YouTube API Key.');
            return null;
        }
        const baseUrl = 'https://www.googleapis.com/youtube/v3/';
        const queryParams = new URLSearchParams({
            key: currentApiKey,
            ...params
        });
        const url = `${baseUrl}${endpoint}?${queryParams}`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                const errorData = await response.json();
                console.error('YouTube API Error:', errorData);
                let errorMessage = `API Error: ${response.status} ${response.statusText}.`;
                if (errorData.error && errorData.error.message) {
                    errorMessage += ` Details: ${errorData.error.message}`;
                }
                    if (response.status === 403) {
                    errorMessage += " This might be due to an invalid API key, incorrect API restrictions (ensure HTTP referrers allow your GitHub Pages URL or are unrestricted for testing), or quota exhaustion.";
                }
                if (response.status === 400 && errorData.error.errors[0].reason === "keyInvalid"){
                    errorMessage = "The provided API Key is invalid. Please check and try again.";
                }
                showError(errorMessage);
                return null;
            }
            return await response.json();
        } catch (error) {
            console.error('Network or other error fetching from YouTube API:', error);
            showError(`Network error or failed to fetch data: ${error.message}`);
            return null;
        }
    }

    async function getChannelUploadsPlaylistId(channelId) {
        const data = await fetchFromYouTubeAPI('channels', {
            part: 'contentDetails',
            id: channelId
        });
        if (data && data.items && data.items.length > 0) {
            return data.items[0].contentDetails.relatedPlaylists.uploads;
        }
        console.warn(`Could not find uploads playlist for channel ID: ${channelId}`);
        return null;
    }

    async function getPlaylistVideoIds(playlistId) {
        const data = await fetchFromYouTubeAPI('playlistItems', {
            part: 'contentDetails',
            playlistId: playlistId,
            maxResults: window.YOUTUBE_CONFIG.maxResultsPerChannel || 10
        });
        if (data && data.items) {
            return data.items.map(item => item.contentDetails.videoId);
        }
        console.warn(`Could not fetch video IDs for playlist ID: ${playlistId}`);
        return [];
    }

    async function getVideoDetails(videoIds) {
        if (!videoIds || videoIds.length === 0) return [];
        let allVideoDetails = [];
        const batchSize = 50;
        for (let i = 0; i < videoIds.length; i += batchSize) {
            const batch = videoIds.slice(i, i + batchSize);
            const data = await fetchFromYouTubeAPI('videos', {
                part: 'snippet,liveStreamingDetails',
                id: batch.join(',')
            });
            if (data && data.items) {
                allVideoDetails.push(...data.items);
            }
        }
        return allVideoDetails;
    }

    async function fetchAllVideos() {
        if (!currentApiKey) {
            showError("API Key is required to fetch videos.");
            videoSectionsContainer.classList.add('hidden');
            return;
        }
        if (!window.YOUTUBE_CONFIG || !window.YOUTUBE_CONFIG.channelIds || window.YOUTUBE_CONFIG.channelIds.length === 0) {
            showError("No channel IDs configured in config.js. Please add channel IDs to fetch streams.");
            videoSectionsContainer.classList.add('hidden');
            return;
        }

        loadingIndicator.classList.remove('hidden');
        errorDisplay.classList.add('hidden');
        videoSectionsContainer.classList.add('hidden');
        clearAllVideoSections();

        let allVideoIdsToFetchDetails = new Set();
        for (const channelId of window.YOUTUBE_CONFIG.channelIds) {
            const uploadsPlaylistId = await getChannelUploadsPlaylistId(channelId);
            if (uploadsPlaylistId) {
                const videoIds = await getPlaylistVideoIds(uploadsPlaylistId);
                videoIds.forEach(id => allVideoIdsToFetchDetails.add(id));
            }
        }
        
        const uniqueVideoIds = Array.from(allVideoIdsToFetchDetails);
        if (uniqueVideoIds.length === 0) {
            console.log("No video IDs found to fetch details for.");
            loadingIndicator.classList.add('hidden');
            videoSectionsContainer.classList.remove('hidden');
            processAndDisplayVideos([]);
            return;
        }

        const allVideosWithDetails = await getVideoDetails(uniqueVideoIds);
        processAndDisplayVideos(allVideosWithDetails);
        loadingIndicator.classList.add('hidden');
        videoSectionsContainer.classList.remove('hidden');
    }
    
    function processAndDisplayVideos(allVideos) {
        const keywords = (window.YOUTUBE_CONFIG.keywords || []).map(k => k.toLowerCase());
        const upcomingHours = window.YOUTUBE_CONFIG.upcomingHoursAhead || 48;
        document.getElementById('upcomingHours').textContent = upcomingHours;
        document.querySelectorAll('.upcomingHoursText').forEach(el => el.textContent = upcomingHours);

        const liveKeywordMatches = [];
        const otherLiveStreams = [];
        const upcomingStreams = [];
        const now = new Date();
        const upcomingCutoff = new Date(now.getTime() + upcomingHours * 60 * 60 * 1000);

        allVideos.forEach(video => {
            if (!video.snippet) {
                console.warn("Video object missing snippet:", video);
                return; 
            }
            const title = video.snippet.title.toLowerCase();
            const description = (video.snippet.description || "").toLowerCase();

            if (video.snippet.liveBroadcastContent === 'live') {
                const isKeywordMatch = keywords.some(keyword => title.includes(keyword));
                if (isKeywordMatch) {
                    liveKeywordMatches.push(video);
                } else {
                    otherLiveStreams.push(video);
                }
            } else if (video.snippet.liveBroadcastContent === 'upcoming') {
                if (video.liveStreamingDetails && video.liveStreamingDetails.scheduledStartTime) {
                    const scheduledTime = new Date(video.liveStreamingDetails.scheduledStartTime);
                    if (scheduledTime > now && scheduledTime <= upcomingCutoff) {
                        upcomingStreams.push(video);
                    }
                }
            }
        });
        
        upcomingStreams.sort((a, b) => new Date(a.liveStreamingDetails.scheduledStartTime) - new Date(b.liveStreamingDetails.scheduledStartTime));

        displayVideos(liveKeywordMatches, keywordLiveStreamsContainer, noKeywordLiveStreamsMsg, 'No keyword live streams.');
        displayVideos(otherLiveStreams, otherLiveStreamsContainer, noOtherLiveStreamsMsg, 'No other live streams.');
        displayVideos(upcomingStreams, upcomingStreamsContainer, noUpcomingStreamsMsg, `No upcoming streams in the next ${upcomingHours} hours.`);
    }

    function createVideoCard(video) {
        const videoId = video.id; 
        const title = video.snippet.title;
        const thumbnailUrl = video.snippet.thumbnails && video.snippet.thumbnails.medium ? video.snippet.thumbnails.medium.url : 'https://placehold.co/320x180/1f2937/374151?text=No+Thumb';
        const channelTitle = video.snippet.channelTitle;
        
        let statusText = '';
        if (video.snippet.liveBroadcastContent === 'live') {
            statusText = `<span class="text-red-400 font-bold">● LIVE</span> ${new Date(video.liveStreamingDetails.actualStartTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', hour12: false })}`;
        } else if (video.snippet.liveBroadcastContent === 'upcoming' && video.liveStreamingDetails && video.liveStreamingDetails.scheduledStartTime) {
            statusText = `Scheduled: ${new Date(video.liveStreamingDetails.scheduledStartTime).toLocaleDateString([], {month: 'short', day: 'numeric'})} ${new Date(video.liveStreamingDetails.scheduledStartTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', hour12: false })}`;
        } else {
            statusText = `Published: ${new Date(video.snippet.publishedAt).toLocaleDateString()}`;
        }

        const card = document.createElement('div');
        // Added cursor-pointer to the whole card
        card.className = 'video-card rounded-lg overflow-hidden shadow-lg flex flex-col cursor-pointer'; 
        card.innerHTML = `
            <img src="${thumbnailUrl}" alt="${escapeHtml(title)}" class="video-thumbnail w-full" onerror="this.onerror=null;this.src='https://placehold.co/320x180/1f2937/374151?text=Missing';" loading="lazy">
            <div class="video-card-content flex flex-col flex-grow">
                <h3 class="font-semibold text-gray-100 leading-tight">${truncateText(title, 50)}</h3>
                <p class="text-gray-400 mt-auto pt-1">${channelTitle}</p>
                <p class="text-gray-500">${statusText}</p>
            </div>
        `;
        // Event listener for the whole card to open video in new tab
        card.addEventListener('click', () => {
            window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
        });
        return card;
    }
    
    function escapeHtml(unsafe) {
        if (typeof unsafe !== 'string') {
            console.warn("escapeHtml called with non-string value:", unsafe);
            return '';
        }
        return unsafe
                .replace(/&/g, "&amp;") // Must be first
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/"/g, "&quot;")
                .replace(/'/g, "&#039;");
    }

    function truncateText(text, maxLength) {
        if (text.length <= maxLength) return text;
        return text.substr(0, maxLength) + '...';
    }

    function displayVideos(videos, container, noResultsMsgElement, noResultsText) {
        container.innerHTML = ''; 
        if (videos.length === 0) {
            noResultsMsgElement.textContent = noResultsText;
            noResultsMsgElement.classList.remove('hidden');
        } else {
            noResultsMsgElement.classList.add('hidden');
            videos.forEach(video => {
                const card = createVideoCard(video);
                container.appendChild(card);
            });
        }
    }

    function clearAllVideoSections() {
        keywordLiveStreamsContainer.innerHTML = '';
        otherLiveStreamsContainer.innerHTML = '';
        upcomingStreamsContainer.innerHTML = '';
        noKeywordLiveStreamsMsg.classList.remove('hidden');
        noOtherLiveStreamsMsg.classList.remove('hidden');
        noUpcomingStreamsMsg.classList.remove('hidden');
    }

    function showError(message) {
        errorDisplay.textContent = message;
        errorDisplay.classList.remove('hidden');
        loadingIndicator.classList.add('hidden');
        videoSectionsContainer.classList.add('hidden');
    }

    if (typeof YOUTUBE_CONFIG !== 'undefined') {
            document.getElementById('upcomingHours').textContent = YOUTUBE_CONFIG.upcomingHoursAhead || 48;
            document.querySelectorAll('.upcomingHoursText').forEach(el => el.textContent = YOUTUBE_CONFIG.upcomingHoursAhead || 48);
    } else {
        showError("Configuration file (config.js) not loaded or YOUTUBE_CONFIG is not defined. Please ensure config.js is present and correct.");
    }
    loadApiKey();
});
