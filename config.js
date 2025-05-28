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
    // T0
    "UC7XCjKxBEct0uAukpQXNFPw", // RK Music # HACHI
    "UC5zO6IFsWSUHMYgJMv81XKg", // shin
    "UCW5uhrG1eCBYditmhL0Ykjw", // Hololive # Elizabeth Rose Bloodflame Ch. hololive-EN
    "UCB1s_IdO-r0nUkY2mXeti-A", // Re:AcT # 獅子神レオナ/レオナちゃんねる
    // Membership
    "UCbTv4OeHE9p1akLhKfgW8WQ", // 子午 # 澪Rei Channel
    "UCjv4bfP_67WLuPheS-Z8Ekg", // 子午 # 浠Mizuki Channel
    "UCoNKCsX9tSxiuh9jznYxXfw", // 靛堂 # 銀河Galaxy
    "UCAtYhckbtAft3JploaYQU8g", // VOiX # Koana 考娜 【VOiX所屬】
    "UCLdzfLx68AXIvDdvY_yHTFA", // Rui Ch. 三森ルイ
    "UCFi-QCHcx2G6wyDNPKXCBeg", // 余偉文 Fisher
    "UCuOatpi_R9JNneIBiaw5LBQ", // 星洛薊野
    "UCH5DBAOT0QyebrMzC7iLobA", // 88nia - Nia Hachiya -
    "UC0HX1e5jJnhN5Xn0epV2wzA", // RK Music # MEDA
    "UCoGfxf3uP_fdujzVg0LqfFQ", // 蒼-Aoi-
    "UC3eXEL0ZurrfG774l4qIqtg", // Nimu ch. 野村にむ
    // T1 - EN
    "UCR6qhsLpn62WVxCBK1dkLow", // NIJISANJI # Enna Alouette【NIJISANJI EN】
    "UCL_qhgtOy0dy1Agp8vkySQg", // Hololive # Mori Calliope Ch. hololive-EN
    "UC8rcEBzJSleTkf_-agPM20g", // Hololive # IRyS Ch. hololive-EN
    // T1 - ZH
    "UC3ZTQ8VZVCpwLHjFKSFe5Uw", // 箱箱 # 森森鈴蘭 / Lily Linglan
    "UCgNC_LzvmZdZqTn77JntMMg", // NAZOBAKO # ARU ch. - 亞璐
    "UCZTw6BZCzfjCarjJMRpU0Wg", // 子午 # 煌Kirali Channel
    "UC9pXpmr_eYeVMGS0lVt5vuw", // 雲際線 # 小金碧碧JinBee
    "UCnSa7dnmEf6bmyS_34yqE_A", // 土芒果社 # 蘆棠布奈
    "UC5QZFeVsxNcNlKKqPqUaw6g", // 芥川 # Meifei ch. 舒穆祿梅緋
    // T1 - JP
    "UC0TXe_LYZ4scaW2XMyi5_kw", // Hololive # AZKi Channel
    "UCmhtmUBjkXOAetnaDq-XJ1g", // nayuta
    "UC5CwaMl1eIgY8h02uZw7u8A", // Hololive # Suisei Channel
    "UC3xQCiEPSkco54WhuiDcngw", // 春魚 # YOSHIKA Ch
    "UCgPGVORhti-KKcV4CqUyumQ", // RK Music # XIDEN
    "UCjoGLVLapRciX38bwgDtttw", // RK Music # 羽緒 - Hao -
    "UCBC7vYFNQoGPupe5NxPG4Bw", // GuildCQ # QuonTama Ch. 久遠たま
    "UCDqno_7LWobowaVc_vzUuCA", // 稍 麦 - yayamugi -
    "UCsq-OUWv1erpLBN6qLIc7jA", // 鈍色聴 / Yurushi Nibiiro
    "UCq7n-GF0SZ7Pt1NCVfTvIaQ", // 巫てんり / Kannagi Tenri
    "UCZlj_hp57CuyacF5d7K0VMg", // NEPHLA
    "UCrpvID8i0xjcroAf5ybQNkw", // 魂〃たましぃ / Konkon Tamashii
    "UCsiKFVHkQSMlSe0vaCG0anw", // MaiR Ch.
    "UCEjysNG2a2UgCBIpJxBqn3w", // Tacitly Channel
    "UCH-SLA_jpPhM2lzdZjZDxjQ", // MillionProduction # 音ノ瀬らこ / Otonose Raco
    "UCjKPgy9YPt16z8AFMi-TLeA", // MillionProduction # ゆらぎゆら / YuragiYura
    "UCWQGiZK_rAMpnl4awiUrqqg", // Ratio Yuires【Project:YuiRes】
    "UCX6x7k9z83gw7DQYfLNTOmw", // スイミー / Swimmy
    "UCt30jJgChL8qeT9VPadidSw", // しぐれうい
    // 'UCe_8qM8Wk4cU5oD3WO07gZg', // Shairu.chしゃいる
    // 'UCR6qhsLpn62WVxCBK1dkLow', // Enna Alouette【NIJISANJI EN】
    // 'UCngjNluk0InGM3RShD_J_cw', // ネモ・テルミナス Nemo Terminus
    // 'UC0HX1e5jJnhN5Xn0epV2wzA', // MEDA
    // 'UCIf6cffSRZqS7TUXbUAK_hw', // Cygnus ch. 熙歌
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
