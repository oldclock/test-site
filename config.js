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
    "UCo7TRj3cS-f_1D9ZDmuTsjw", // NIJISANJI # 町田ちま【にじさんじ】
    "UCt30jJgChL8qeT9VPadidSw", // しぐれうい
    // T2 - EN/ID
    "UC_sFNM0z0MWm9A6WlKPuMMg", // Hololive # Nerissa Ravencroft Ch. hololive-EN
    "UCP0BspO_AMEe3aQqqpo89Dg", // Hololive # Moona Hoshinova hololive-ID
    "UCa2e3c0SDA5aeFTROIPz9eA", // Xiulan Long Ch.
    "UCgZRsBwbdUzxKeOOmmJIXfg", // The Coffee Elf
    "UCBZ9K3sr0ViQU3p4bI36cmQ", // Jaliz
    // T2 - ZH
    "UCUEXMpxIa7le_CK6yYRAboA", // 子午 # 祈Iruni Channel
    "UCk-n2qPASA48IPgtYAsLYJg", // 子午 # 玥Itsuki Channel
    "UC6CpUl2thiDslRorMhd00HA", // 哇啦咚咚 # Luxida ch. 露熙妲
    "UCkiM6bCVlAGRkRm9R_CKbng", // 哇啦咚咚 # Seri ch.星璃
    "UCLeyYlqnD5k1fbZIIE4eTsg", // 春魚 # Oumua ch. 埃穆亞
    "UCFiIsVOC1p_gfTYDYXXfl4g", // 春魚 # Nemesis ch. 涅默
    "UCwzpXmWAFEVKH3VzwvSlY_w", // 春魚 # Earendel ch. 厄倫蒂兒
    "UCIf6cffSRZqS7TUXbUAK_hw", // 春魚 # Cygnus ch. 熙歌
    "UCXyAitTabBsoRclTn_Gq-eA", // 春魚 # xxhacucoxx ch. 白白虹
    "UChJo7dFfZ6mJXQgpXr3OxGg", // 春魚 # Kumosuki ch. 雲隙光
    "UCvglsaXuC9oHuDJZaZbs0AQ", // 春魚 # Eisnebel ch. 冰霧
    "UCfZofhrZ4pxCESrcs5m5NJg", // 春魚 # Olda ch. 歐妲
    "UCxYkBSXKRgbxVwwqBQ_sy0w", // 雲際線 # 角蓮Caren
    "UCZHa6yKnBnU34yRyvV3EXSA", // 預見 # 瓦西瓦瓦 Vaswawa
    "UCuPHlMEd0cR-tvAYPjGWVwQ", // 預見 # 詩雨蔻達 Shiu Coda Ch.
    "UCChAHq4kdRZ0FJ1Jfjvr9cw", // 預見 # 帕蘿妮 Paroniie Ch.
    "UCuUdD_1DfNlMNF-o2bxvO7Q", // Remiria Ch. 蕾米利亞
    "UC3rmrlimhWzTsJ1BxY6-p1w", // 水縹そまる / somaru
    "UCu06qIis7ypubiMrH-3gRNg", // CY Future # 冬雲凜Samui Channel
    "UCK-H5yv8OpCce5xmUrbOP8A", // 花遊 # 天櫻咲樂さくら【Stu. Huayu】
    "UCmKy7mz6tRLv7OFdSqbAkrg", // SLSMusic
    "UCadrQyULVMygKkKGJkZhUYw", // 杉山参 SugiyamaMairu ch.
    "UCz74f1swTzZAraJjZNyF-8g", // 諾鴉・奈菲墨【VerseLink】
    "UCdqjKrxciua397Fo4h6xngA", // 狸咪 Tanuki Miihi Ch
    "UCOseNFJYQJVDB-9D3egG4ZA", // 白月心宿shuku【KOZMII / 比鄰星域所屬】
    "UCdesGlD7t5JV-z28p5GqVIw", // 名雪薇薇·ヴィヴィch.
    "UCqGLWrvVOqtrpxFdoTY5tYg", // 柴崎楓音 / Shibasaki Fuune
    "UCkcenwQpQwgNkG2sl28Az-A", // Devilith Violustre
    "UC88ZUTjfOK5RFcw-4ar1VPA", // Mischeif Ch. 蜜絲雪芙
    "UCuXVZoBEw8v4f4TIBpQRTBQ", // 蘭音Reine
    "UCyqHGoPxqHzRe9ZUtJux7TQ", // 魔女ルンナ I 魔女Runna 🔮🌕 I JP & HKVtuber
    "UCkTfvQqiCDniJt2XZFEXAbg", // 心咲 ⁄ ᴋᴏᴇ ∅.･
    "UCnyLvZQKHI71LchdRAkGa_w", // Riru Ch. 記菓莉蕗
    "UCsJBSOyM1ZCwnANvwTBWmww", // Coxib 可希
    "UCDb47NT3QzoCiorDtK9C_qg", // ACGlive # 蕾兒 Rayer
    "UCs-gepebQQqBMiNksqP9cYQ", // ACGlive # 綾音 Ring
    "UCCiW5TMQLWkSh1hY8RaF85A", // 毬呢Showey Ch.
    "UC6uZRWNuCa6XB4oRHApdtZw", // 女巫西亞Cya Channel
    // 'UCe_8qM8Wk4cU5oD3WO07gZg', // Shairu.chしゃいる
    // 'UCngjNluk0InGM3RShD_J_cw', // ネモ・テルミナス Nemo Terminus
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
