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
    "UCtjJkNIBuWRzriF3Y7G2U4g", // DreamCity # Akari Ch. 灯理【DreamCity所屬】
    // T2 - JP
    "UCbJYvStAmq5Jm3nSDNSLT4A", // RK Music # CONA
    "UCn1Zf28m6WbhMDjMjdIjOIA", // RK Music # CULUA
    "UCFWD2vvDJqjimIzhjEvogNQ", // RK Music # NEUN
    "UCwuS0uY-Z2Gr_5OV2oFybFA", // RK Music # KMNZ
    "UCqYXJ5M55HWE6zyvl6rjIaA", // RK Music # ヨノ-Yono
    "UC2daHxnuJJBM5NWci1RRkeA", // RK Music # 深影 - Mikage -
    "UCtS9Q3R-61XbExd4oCVLoYA", // RK Music # MEMESIA
    "UC4OeUf_KfYRrwksschtRYow", // Re:AcT # 花鋏キョウ*Kyo Hanabasami
    "UCHnbtVLZYGuKkGh6iFxxTpw", // Re:AcT # 杏夜 くもり - Anya Kumori -
    "UCIueYPQm6sk8oaKxq0hSjyQ", // Re:AcT # ククルア・クレイユ - Coucourua Creil -
    "UCSw8TAyNIuPZc6gZqRKnO6A", // Re:AcT # レイラ・サマ-Layla Sama-
    "UCDQkIK-Md2XDbDWN4nKyzIQ", // Re:AcT # 夢川かなう - Kanau Yumekawa
    "UCekc8SI533NI675r9aCBRcQ", // MillionProduction # 眠雲ツクリ / NemukumoTsukuri
    "UCWQtYtq9EOB4-I5P-3fh8lA", // Hololive # Kanade Ch. 音乃瀬奏 ‐ ReGLOSS
    "UCcQsDietWkYakBKbGpCaeLA", // 陽月るるふ / Hizuki Rurufu
    "UCNskpCCH661BeRJkN8n8d-A", // UTANO ch. 白玖ウタノ
    "UC--zuEfONeFXPvLqX0Kvbuw", // Riot Music # 松永依織 / IORI MATSUNAGA
    "UCoAL7HKxjpPGuA1G4bdfHTQ", // Riot Music # 皇 美緒奈 / MIONA SUMERAGI
    "UC1ucgoC_sGww_Euu5iMqpQw", // 凛々咲 / Ririsya
    "UC_eiXiNIBK-GzmM1jiY7OHA", // CYBILL
    "UCFP9UkgIM_U8NfzRbYEOQdA", // なれたん Naraetan Ch.
    "UCpmSwekVKXnObCY7hpdHXdQ", // 七海うらら*歌channel
    "UC3KldSym-HTLMkvitStsNTw", // 天満ニア / Amama Nia
    "UCw-jx5JPq5JIc1i6DLWwKzg", // pecotiita.ch(ぺこちーた)
    "UCWCc8tO-uUl_7SJXIKJACMw", // 神楽めあ / KaguraMea
    "UC3zSmwgOOIjWUbus4cZIUPg", // MUS1CA
    "UC5ZEWtlwM3d4x4iLDOnzuww", // 紗倉おと-Sakura Oto-
    "UC7A7bGRVdIwo93nqnA3x-OQ", // 苺咲べりぃ / Maisaki Berry
    "UC-ADLXZ3RVOPCGe1ZbuFQeg", // Ellise Ch.
    "UCIbaYUBG8e7j_uq6_T2XM8g", // 汐音ベリーちゃん Berry Ch
    "UCHnY2fxHXfZmKLPYn_Ps7Sw", // 神月都 / miya ch.
    "UC64Qf9294_6lHJR_HG6TOzw", // 宮守ゆり
    "UCWNV-ixuEAxaso9rLk5PRFQ", // aoi sizuku ch. 葵井詩雫
    "UC9zLKU6WiRdcKtAh-6o_zmA", // Muan ch.茨むあん
    "UCJ4pezclPqwIWtluOAEzQgQ", // 恋白 るな / kohakuruna 【Vsinger】
    "UC6qkE98WkN8no-Zp7KBnvzw", // Mea Ch. 夜白魔メア
    "UC2MBVu8VWwJQsdJzKCxhV5A", // 七天八十院アエギス【堕落学院】
    "UCXN-ZRdGnFtLiJ8EY1i_alg", // Itsuki Natsume / 棗いつき
    "UCBwH091x3pYLbGYwRtPbLlA", // Lucia
    "UCFv2z4iM5vHrS8bZPq4fHQQ", // HIMEHINA Channel
    "UCLqCmbd6bgcLaBVz3aA-68A", // P丸様。
    "UCs2bW9uh55nwBE1v9cxgmow", // Meroro Kaneiro / 鐘彩めろろ
    "UCz4jhqrCfthF8NnldZeK_rw", // Rica Ch. / 花宮莉歌
    "UClS3cnIUM9yzsBPQzeyX_8Q", // Ruka Ch. 雨海ルカ
    "UCGKNbtDv8OTa8559buDu-Gw", // 音魂ヒビクHibiku Otodama
    "UCqsS32C_llpT2ia5S1Oh44A", // 御神楽すずめ / Mikagura Suzume
    "UC8VlcljjGFb4-Ny2Heb0-ew", // うら飯　紺汰 - Conta Urameshi -
    "UCZtjTxFDan4ORyt1x6oQ6qA", // 茶々プラムム / Pulamumu
    "UCNtwkcCmjmPIqVYWkhnzjdw", // Cecil Ch.月城セシル
    "UCFqVAFANOHm17UVy8sWkhqw", // 魔ノむえる -Mano Mueru-
    "UC6a14JXNCBk7cNa1vDIzgmg", // 唄街しの
    "UCzyhBffWik7EShr6PEMsVSQ", // 早乙女あずきAzuki Saotome
    "UC1nqXaKzG4hd1SRFVra16gw", // 焔魔るり CH. / Ruri Enma
    "UCV5fHI5euR7ZC4ZqhYqlwYw", // RUKI Ch. 凰牙るき
    "UCa9Y57gfeY0Zro_noHRVrnw", // Luna Ch. 姫森ルーナ
    "UC9XmtaWbavinTxsZPEvgzlg", // Neonoah Ch. 碧生ねの
    "UCYADafT8oPKTdD7E9SrsuwA", // TanZ_channel
    "UCeB2goVR4zG7Jqafh_NYyfw", // 吉良リリー / Kira Lily
    "UC7CtvN04ublW4LGTPksG6mg", // Figaro
    "UCRQa9FvT-ZlxQrN6B2HjIgQ", // NoiR / NoWorld
    "UCpOO_KwyHJHFHX1Awm2PPMA", // アール・テテ
    "UCe_8qM8Wk4cU5oD3WO07gZg", // Shairu.chしゃいる
    "UCocnY-kJ7VYVA7SQLP8AHIA", // 時羽あいの
    "UCcZPZ680duJJXnm9J0AAuBg", // 蒼星すい
    "UC1JuhRTsFgZvi2ie2dTUxbg", // みかんとボーカルノート
    "UCNwmt2Cq1SvkUDRvG3F_QaQ", // 四条ユリ-Yuri Channel-
    "UCngjNluk0InGM3RShD_J_cw", // ネモ・テルミナス (NemoTerminus)
    "UCBLGjbYv6-xxju1i44RjnnA", // 神椿 # 明透 -ᴀsᴜ-
    "UCO6mA1hC3Gv9jEoCTITjAQw", // 神椿 # 琶舞 -ʙᴇᴍᴀ-
    "UCIu1rRiQLeUU8e1saN6I0eg", // ノア・ポラリス -Noa Polaris-
    "UCfo183azIfEKotjwL41gx9A", // 神崎メイサ / Kanzaki Meisa
    "UCll1L35_pBwCnjdNL06tuZA", // 紅葉丸チャンネル Momijimaru
    "UCEIRze7ZsbBkbkIZOeiRtqA", // 狐花てん -Ten Kitsunebana-
    "UCIumx9FItlv6B_JsHVMjVYA", // Mirea Sheltzs／ミレア・シェルツ
    "UC0hmp_094r0BjRMUJYMz90A", // 詩香よい -うたか よい-
    "UC9b76pk9Re-focJF7X5GtKQ", // Shiyu Ch. しゆ。
    "UCrAsByHNIFObjr2sEaZHkCg", // Otsuka Ray ch.乙夏鈴
    "UC6bgvg7TfGxryVoaXEj8t9w", // 透華レミ Remi Touka
    "UC7YXqPO3eUnxbJ6rN0z2z1Q", // DELUTAYA Δ.
    "UCO4blswUnk1SHD1VmFXzB0A", // Aromaの音楽
    "UCONtwJdE7A68l1eCjf8k4jQ", // 儚牙紺 - Kurage Kon -
    // T3 - ZH
    "UCYRUl2H0hBmazctTbGrVDvQ", // 杜邊優妮 DBUni ch.【ドビアン・ヨウニ】
    "UCv_W2ZpvfrLAzsHqtjWGKYw", // 秋芽·ChillYa ch.
    "UC3tDY-SuZTCWKOCmoKUsB8w", // 野々上萌希
    "UCD1QOCJIAPsMKMvRSXjLahw", // GuildCQ # Aruma Ch. 薬袋アルマ
    // "UCQLfrGPnx1Es7WCiRd7Iyeg", // yuzzmi Ch. 有・柚実
    "UCUMwanMztK0Y-T-ns3bMR0g", // 庫麻Kumma Channel
    // "UCB2Zralw1SV2AozcMDEk6CA", // Moriame Yuna Ch. 森雨悠娜
    "UCSSqkGEa3TlzHkvvGabwT_g", // Inori Ch.秋月イノリ
    // "UCH_7LvJvDHIPBJCi07eUUbg", // Sullyin Ch. 雪迎
    // T3 - JP
    "UCdIa_1lEL5c5RrGgIKptQrw", // VEE # Linon ch. 天籠りのん
    "UCF1hSVn2iHjkVVW3OHXOG8A", // 夕星ゆう🎼声楽家Vsinger
    "UCay6Y3oEoiC6ZEE2G0UZu_A", // Hanon Ch. 香鳴ハノン【パレプロ】
    "UCoHsW282iYqPmZZ5617cg2w", // 姫乃あいむ
    "UCeqIMtLuGc3YgwkhEaG8oDg", // Re:AcT # 稀羽すう - Suu Usuwa -
    "UCrDRepCC81GaakxeWwJhMFA", // 明智光月 / akechi mitsuki
    "UCksKvMyNH6L-lfNSUch3hYA", // 織田詩信 / oda shinobu
    "UCewRhO43UmIohSBzW2HMheA", // 凪乃ましろ / Nagino Mashiro
    "UCOW-2NSrcfU6K9BEhbzR9Vw", // 九九 | ichijiku Q (歌Ch.)
    "UCUuGWyIp8GqDrdmJxJwz3dA", // Miagolare ch. -みゃごらーれ-
    "UCMCooZqVMD2ZmUxjRxGuUjg", // 花鹿 める / Kajica Mel
    "UCLOnKw76ypBM5PeYr4OdkJQ", // Sakura CH.餅々さくら
    "UCy6Fu_0fDzQ7H-UWZFENklQ", // えるるん / Erurun Channel
    "UC5CH4FvzJO5pYmhty_vmePA", // 四葉メロンch
  ],

  // Add keywords to look for in live stream titles
  keywords: [
    "歌回",
    "歌枠",
    "弾き語り",
    "歌雜",
    "歌雑",
    "唱歌",
    "練歌",
    "練琴",
    "初配",
    "畢業",
    "卒業",
    "singing",
    "karaoke",
    "music",
    "acoustic",
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
