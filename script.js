document.addEventListener("DOMContentLoaded", function() {
    const apiKey = 'AIzaSyD5w0aoW9GUPlLGc0t4tUCcmcM_-VvbPgg';
    const channelsUrl = 'channels.json';
    const channelList = document.getElementById('channel-list');

    fetch(channelsUrl)
        .then(response => response.json())
        .then(channelIds => {
            channelIds.forEach(channelId => {
                fetchLiveStream(channelId);
            });
        });

    function fetchLiveStream(channelId) {
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
});
