document.addEventListener("DOMContentLoaded", function() {
    const channelsUrl = 'channels.json';
    const channelList = document.getElementById('channel-list');
    const apiKeyInput = document.getElementById('api-key');

    const apiKey = getCookie('youtubeApiKey');
    if (apiKey) {
        apiKeyInput.value = apiKey;
        fetchChannels(apiKey);
    }

    document.querySelector('button').addEventListener('click', function() {
        const apiKey = apiKeyInput.value.trim();
        if (apiKey) {
            setCookie('youtubeApiKey', apiKey, 365);
            fetchChannels(apiKey);
        }
    });

    function fetchChannels(apiKey) {
        fetch(channelsUrl)
            .then(response => response.json())
            .then(channelIds => {
                channelIds.forEach(channelId => {
                    fetchLiveStream(channelId, apiKey);
                });
            });
    }

    function fetchLiveStream(channelId, apiKey) {
        fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&eventType=live&type=video&key=${apiKey}`)
            .then(response => response.json())
            .then(data => {
                if (data.items && data.items.length > 0) {
                    const liveVideo = data.items[0];
                    const videoId = liveVideo.id.videoId;
                    const title = liveVideo.snippet.title;
                    const thumbnail = liveVideo.snippet.thumbnails.medium.url;

                    const channelDiv = document.createElement('div');
                    channelDiv.className = 'channel';
                    channelDiv.innerHTML = `
                        <h2>${title}</h2>
                        <a href="https://www.youtube.com/watch?v=${videoId}" target="_blank">
                            <img src="${thumbnail}" alt="${title}">
                        </a>
                    `;

                    channelList.appendChild(channelDiv);
                }
            })
            .catch(error => {
                console.error('Error fetching live stream:', error);
            });
    }

    function setCookie(name, value, days) {
        const d = new Date();
        d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = "expires=" + d.toUTCString();
        document.cookie = name + "=" + value + ";" + expires + ";path=/";
    }

    function getCookie(name) {
        const cname = name + "=";
        const decodedCookie = decodeURIComponent(document.cookie);
        const ca = decodedCookie.split(';');
        for(let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(cname) == 0) {
                return c.substring(cname.length, c.length);
            }
        }
        return "";
    }
});
