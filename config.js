// config.js
//
// Instructions:
// 1. Add your YouTube Channel IDs to the 'channelIds' array.
//    To find a channel ID:
//    - Go to the YouTube channel page.
//    - View the page source (Ctrl+U or Cmd+Option+U).
//    - Search for "channel_id" or "externalId". The value associated with it is the channel ID (usually starts with "UC").
// 2. Add keywords to the 'keywords' array to categorize live streams.

const YOUTUBE_CONFIG = {
  // Add YouTube Channel IDs here
  channelIds: [
    'UCe_8qM8Wk4cU5oD3WO07gZg', // Shairu.chしゃいる
    'UCR6qhsLpn62WVxCBK1dkLow', // Enna Alouette【NIJISANJI EN】
    'UCngjNluk0InGM3RShD_J_cw', // ネモ・テルミナス Nemo Terminus
    'UC0HX1e5jJnhN5Xn0epV2wzA', // MEDA
    'UCIf6cffSRZqS7TUXbUAK_hw', // Cygnus ch. 熙歌
  ],

  // Add keywords to look for in live stream titles or descriptions
  keywords: [
    "歌回",
    "歌枠",
    "歌雜",
    "唱歌",
    "練歌",
    "練琴",
    "初配",
    "畢業",
    "卒業",
    "singing",
    "karaoke",
    "music",
    "graduation",
    // Add more relevant keywords
  ],

  // Optional: Set the maximum number of results to fetch per channel for live/upcoming
  // Be mindful of API quota. Default YouTube API max is 50.
  maxResultsPerChannel: 10,

  // Optional: Set how many hours ahead to look for upcoming streams (e.g., 48 for 2 days)
  upcomingHoursAhead: 48,
};

// Make the config globally accessible if script.js is not a module
// If script.js is a module, you would export this and import it there.
window.YOUTUBE_CONFIG = YOUTUBE_CONFIG;
