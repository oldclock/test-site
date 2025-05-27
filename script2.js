// script.js

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

    const videoPlayerModal = document.getElementById('videoPlayerModal');
    const videoPlayerTitle = document.getElementById('videoPlayerTitle');
    const youtubePlayerContainer = document.getElementById('youtubePlayerContainer');
    const closeModalButton = document.getElementById('closeModalButton');
    const closeModalFooterButton = document.getElementById('closeModalFooterButton');

    let currentApiKey = '';

    // --- Modal Logic ---
    function openModal(videoId, videoTitle) {
        videoPlayerTitle.textContent = videoTitle;
        // Corrected YouTube embed URL
        youtubePlayerContainer.innerHTML = `<iframe class="w-full h-full rounded-md" src="https://www.youtube.com/embed/${videoId}?autoplay=1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
        videoPlayerModal.style.display = "block";
    }

    function closeModal() {
        videoPlayerModal.style.display = "none";
        youtubePlayerContainer.innerHTML = ""; // Stop video by removing iframe
        videoPlayerTitle.textContent = "Video Player";
    }

    closeModalButton.onclick = closeModal;
    closeModalFooterButton.onclick = closeModal;
    window.onclick = function(event) {
        if (event.target == videoPlayerModal) {
            closeModal();
        }
    }

    // --- API Key Management ---
    function loadApiKey() {
        const storedKey = localStorage.getItem(API_KEY_STORAGE_KEY);
        if (storedKey) {
            apiKeyInput.value = storedKey;
            currentApiKey = storedKey;
            apiKeyStatus.textContent = 'API Key loaded from local storage.';
            apiKeyStatus.className = 'text-sm mt-2 text-green-400';
            fetchAllVideos();
        } else {
            apiKeyStatus.textContent = 'Please enter your YouTube API Key.';
            apiKeyStatus.className = 'text-sm mt-2 text-yellow-400';
            videoSectionsContainer.classList.add('hidden');
        }
    }

    saveApiKeyButton.addEventListener('click', () => {
        const key = apiKeyInput.value.trim();
        if (key) {
            localStorage.setItem(API_KEY_STORAGE_KEY, key);
            currentApiKey = key;
            apiKeyStatus.textContent = 'API Key saved! Loading streams...';
            apiKeyStatus.className = 'text-sm mt-2 text-green-400';
            fetchAllVideos();
        } else {
            apiKeyStatus.textContent = 'API Key cannot be empty.';
            apiKeyStatus.className = 'text-sm mt-2 text-red-400';
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

    // Step 1: Get the "uploads" playlist ID for a channel
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

    // Step 2: Get video IDs from a playlist
    async function getPlaylistVideoIds(playlistId) {
        const data = await fetchFromYouTubeAPI('playlistItems', {
            part: 'contentDetails', // Only need videoId from here
            playlistId: playlistId,
            maxResults: window.YOUTUBE_CONFIG.maxResultsPerChannel || 10
        });
        if (data && data.items) {
            return data.items.map(item => item.contentDetails.videoId);
        }
        console.warn(`Could not fetch video IDs for playlist ID: ${playlistId}`);
        return [];
    }

    // Step 3: Get details for a list of video IDs
    async function getVideoDetails(videoIds) {
        if (!videoIds || videoIds.length === 0) return [];
        
        let allVideoDetails = [];
        const batchSize = 50; // Max video IDs per call for videos.list

        for (let i = 0; i < videoIds.length; i += batchSize) {
            const batch = videoIds.slice(i, i + batchSize);
            const data = await fetchFromYouTubeAPI('videos', {
                part: 'snippet,liveStreamingDetails', // Get snippet and live details
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

        let allVideoIdsToFetchDetails = new Set(); // Use Set to avoid duplicate video IDs initially

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
            videoSectionsContainer.classList.remove('hidden'); // Show sections (they will show "no videos" messages)
            processAndDisplayVideos([]); // Call with empty array to show "no videos" messages
            return;
        }

        const allVideosWithDetails = await getVideoDetails(uniqueVideoIds);
        
        // The API might return videos in a different order or not all if some IDs were invalid
        // No need to remove duplicates here as getVideoDetails fetches unique IDs
        
        processAndDisplayVideos(allVideosWithDetails);

        loadingIndicator.classList.add('hidden');
        videoSectionsContainer.classList.remove('hidden');
    }
    
    // --- Video Processing and Display ---
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
                return; // Skip malformed video objects
            }

            const title = video.snippet.title.toLowerCase();
            const description = (video.snippet.description || "").toLowerCase(); // Ensure description exists

            // Check for Live Videos
            if (video.snippet.liveBroadcastContent === 'live') {
                const isKeywordMatch = keywords.some(keyword => title.includes(keyword) || description.includes(keyword));
                if (isKeywordMatch) {
                    liveKeywordMatches.push(video);
                } else {
                    otherLiveStreams.push(video);
                }
            }
            // Check for Upcoming Videos
            else if (video.snippet.liveBroadcastContent === 'upcoming') {
                if (video.liveStreamingDetails && video.liveStreamingDetails.scheduledStartTime) {
                    const scheduledTime = new Date(video.liveStreamingDetails.scheduledStartTime);
                    if (scheduledTime > now && scheduledTime <= upcomingCutoff) {
                        upcomingStreams.push(video);
                    }
                }
            }
        });
        
        // Sort upcoming videos by scheduled time (earliest first)
        upcomingStreams.sort((a, b) => new Date(a.liveStreamingDetails.scheduledStartTime) - new Date(b.liveStreamingDetails.scheduledStartTime));

        displayVideos(liveKeywordMatches, keywordLiveStreamsContainer, noKeywordLiveStreamsMsg, 'No keyword live streams.');
        displayVideos(otherLiveStreams, otherLiveStreamsContainer, noOtherLiveStreamsMsg, 'No other live streams.');
        displayVideos(upcomingStreams, upcomingStreamsContainer, noUpcomingStreamsMsg, `No upcoming streams in the next ${upcomingHours} hours.`);
    }

    function createVideoCard(video) {
        // video.id is now an object like { kind: "youtube#video", videoId: "VIDEO_ID_HERE" } if coming from search
        // or video.id is just the videoId string if coming from playlistItems then processed by videos.list
        // The `getVideoDetails` function ensures `video.id` is the string ID.
        const videoId = video.id; 
        const title = video.snippet.title;
        const thumbnailUrl = video.snippet.thumbnails && video.snippet.thumbnails.medium ? video.snippet.thumbnails.medium.url : 'https://placehold.co/320x180/1f2937/374151?text=No+Thumbnail';
        const channelTitle = video.snippet.channelTitle;
        
        let statusText = '';
        if (video.snippet.liveBroadcastContent === 'live') {
            statusText = '<span class="text-red-400 font-bold">● LIVE</span>';
        } else if (video.snippet.liveBroadcastContent === 'upcoming' && video.liveStreamingDetails && video.liveStreamingDetails.scheduledStartTime) {
            statusText = `Scheduled: ${new Date(video.liveStreamingDetails.scheduledStartTime).toLocaleString()}`;
        } else {
                // Fallback for videos that might not be live/upcoming but were fetched
            statusText = `Published: ${new Date(video.snippet.publishedAt).toLocaleDateString()}`;
        }


        const card = document.createElement('div');
        card.className = 'video-card rounded-lg overflow-hidden shadow-lg flex flex-col';
        card.innerHTML = `
            <img src="${thumbnailUrl}" alt="${title}" class="video-thumbnail w-full cursor-pointer" onerror="this.onerror=null;this.src='https://placehold.co/320x180/1f2937/374151?text=Missing+Img';" loading="lazy">
            <div class="p-4 flex flex-col flex-grow">
                <h3 class="text-md font-semibold text-gray-100 mb-1 leading-tight">${truncateText(title, 60)}</h3>
                <p class="text-xs text-gray-400 mb-2">Channel: ${channelTitle}</p>
                <p class="text-xs text-gray-500 mb-3">
                    ${statusText}
                </p>
                <button class="mt-auto watch-video-btn btn-secondary text-sm py-2 px-3 rounded-md w-full hover:bg-gray-600 transition-colors duration-150" data-video-id="${videoId}" data-video-title="${escapeHtml(title)}">Watch Stream</button>
            </div>
        `;
        card.querySelector('.video-thumbnail').addEventListener('click', () => openModal(videoId, title));
        card.querySelector('.watch-video-btn').addEventListener('click', () => openModal(videoId, title));
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
        container.innerHTML = ''; // Clear previous videos
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

    // --- Initialization ---
    if (typeof YOUTUBE_CONFIG !== 'undefined') {
            document.getElementById('upcomingHours').textContent = YOUTUBE_CONFIG.upcomingHoursAhead || 48;
            document.querySelectorAll('.upcomingHoursText').forEach(el => el.textContent = YOUTUBE_CONFIG.upcomingHoursAhead || 48);
    } else {
        showError("Configuration file (config.js) not loaded or YOUTUBE_CONFIG is not defined. Please ensure config.js is present and correct.");
    }
    loadApiKey(); // Load API key on page start
});
