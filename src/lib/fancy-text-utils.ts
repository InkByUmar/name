/**
 * Character maps for premium fancy styles
 * Curated for 100% stability across all modern mobile devices.
 * Removed glitch and inverted maps to ensure zero question marks.
 */
const maps: Record<string, string[]> = {
  bold: "𝐀𝐁𝐂𝐃𝐄𝐅𝐆𝐇𝐈𝐉𝐊𝐋𝐌𝐍𝐎𝐏𝐐𝐑𝐒𝐓𝐔𝐕𝐖𝐗𝐘𝐙𝐚𝐛𝐜𝐝𝐞𝐟𝐠𝐡𝐢𝐣𝐤𝐥𝐦𝐧𝐨𝐩𝐪𝐫𝐬𝐭𝐮𝐯𝐰𝐱𝐲𝐳𝟎𝟏𝟐𝟑𝟒𝟓𝟔𝟕𝟖𝟗".split(""),
  italic: "𝘈𝘉𝘊𝘋𝘌𝘍𝘎𝘏𝘐𝘑𝘒𝘓𝘔𝘕𝘖𝘗𝘘𝘙𝘚𝘛𝘜𝘝𝘞𝘟𝘠𝘡𝘢𝘣𝘤𝘥𝘦𝘧𝘨𝘩𝘪𝘫𝘬𝘭𝘮𝘯𝘰𝘱𝘲𝘳𝘴𝘵𝘶𝘷𝘸𝘹𝘺𝘻0123456789".split(""),
  script: "𝓐𝓑𝓒𝓓𝓔𝓕𝓖𝓗𝓘𝓙𝓚𝓛𝓜𝓝𝓞𝓟𝓠𝓡𝓢𝓣𝓤𝓥𝓦𝓧𝓨𝓩𝓪𝓫𝓬𝓭𝓮𝓯𝓰𝓱𝓲𝓳𝓴𝓵𝓶𝓷𝓸𝓹𝓺𝓻𝓼𝓽𝓾𝓿𝔀𝔁𝔂𝔃0123456789".split(""),
  doubleStruck: "𝔸𝔹ℂ𝔻𝔼𝔽𝔾ℍ𝕀𝕁𝕂𝕃𝕄ℕ𝕆ℙℚℝ𝕊𝕋𝕌𝕎𝕏𝕐ℤ𝕒𝕓𝕔𝕕𝕖𝕗𝕘𝕙𝕚𝕛𝕜𝕝𝕞𝕟𝕠𝐩𝐪𝐫𝐬𝐭𝐮𝐯𝐰𝐱𝐲𝐳0123456789".split(""),
  monospace: "𝙰𝙱𝙲𝙳𝙴𝙵𝙶𝙷𝙸𝙹𝙺𝙻𝙼𝙽𝙾𝙿𝚀𝚁𝚂𝚃𝚄𝚅𝚆𝚇𝚈𝚉𝚊𝚋𝚌𝚍𝚎𝚏𝚐𝚑𝚒𝚓𝚔𝚕𝚖𝚗𝚘𝚙𝚚𝚛𝚜𝚝𝚞𝚟𝚠𝚡𝚢𝚣𝟶𝟷𝟸𝟹𝟺𝟻𝟼𝟽𝟾𝟿".split(""),
  bubble: "ⒶⒷⒸⒹⒺⒻⒼⒽⒾⒿⓀⓁⓂⓃⓄⓅⓆⓇⓈⓉⓊⓋⓌⓍⓎⓏⓐⓑⓒⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩ⓪①②③④⑤⑥⑦⑧⑨".split(""),
  square: "🄰🄱🄲🄳🄴🄵🄶🄷🄸🄹🄺🄻🄼🄽🄾🄿🅀🅁🅂🅃🅄🅅🅆🅇🅈🅉🄰🄱🄲🄳🄴🄵🄶🄷🄸🄹🄺🄻🄼🄽🄾🄿🅀🅁🅂🅃🅄🅅🅆🅇🅈🅉0123456789".split(""),
  tinyCaps: "ᴀʙᴄᴅᴇꜰɢʜɪᴊᴋʟᴍɴᴏᴘǫʀsᴛᴜᴠᴡxʏᴢᴀʙᴄᴅᴇꜰɢʜɪᴊᴋʟᴍɴᴏᴘǫʀsᴛᴜᴠᴡxʏᴢ0123456789".split(""),
};

const standardChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split("");

export type StyleCategory = 'all' | 'pubg' | 'freefire' | 'cod' | 'roblox' | 'minecraft' | 'symbols';

export interface StyleOption {
  id: string;
  name: string;
  category: StyleCategory[];
  transform: (text: string) => string;
}

const mapTransform = (mapName: string) => (text: string) => {
  return text.split('').map(char => {
    const index = standardChars.indexOf(char);
    return index !== -1 && maps[mapName][index] ? maps[mapName][index] : char;
  }).join('');
};

export const POPULAR_SYMBOLS = [
  "ツ", "亗", "乡", "々", "×", "〆", "★", "彡", "༺", "༻", "꧁", "꧂", "✿", "❂", "⚡", "☯", "♥", "✦", "✧", "⚔", "🛡", "🔥", "💎", "👾", "🐉", "👻", "☣", "☢", "✵", "✹"
];

export const LEFT_SYMBOLS = ["亗", "々", "〆", "꧁", "༺", "★", "ツ", "❤", "☆", "†", "⚔", "⚡", "☯", "☠", "☣", "♛", "✿", "❂", "✦", "✯"];
export const RIGHT_SYMBOLS = ["亗", "々", "〆", "꧂", "༻", "★", "ツ", "❤", "☆", "†", "⚔", "⚡", "☯", "☠", "☣", "♚", "✿", "❂", "✧", "✯"];

export const TRENDING_NAMES = [
  "亗 Legend 亗",
  "꧁༺ Killer ༻꧂",
  "々 Skull ×",
  "༺ Joker ༻",
  "★ Vamp ★",
  "〆 Zero 〆",
  "☯ Shadow ☯",
  "⚡ Volt ⚡"
];

export const STYLE_OPTIONS: StyleOption[] = [
  { id: 'bold', name: 'Premium Bold', category: ['all', 'pubg', 'cod'], transform: mapTransform('bold') },
  { id: 'italic', name: 'Swift Move', category: ['all', 'freefire'], transform: mapTransform('italic') },
  { id: 'script', name: 'Royal Order', category: ['all', 'roblox'], transform: mapTransform('script') },
  { id: 'doubleStruck', name: 'Double Strike', category: ['all', 'roblox'], transform: mapTransform('doubleStruck') },
  { id: 'monospace', name: 'Fixed Grid', category: ['all', 'cod', 'pubg'], transform: mapTransform('monospace') },
  { id: 'bubble', name: 'Bubble Shield', category: ['all', 'roblox'], transform: mapTransform('bubble') },
  { id: 'square', name: 'Block Force', category: ['all', 'roblox'], transform: mapTransform('square') },
  { id: 'tiny', name: 'Petite Type', category: ['all', 'freefire'], transform: mapTransform('tinyCaps') },
];

// Add 100+ high-compatibility dynamic styles
for (let i = 0; i < 112; i++) {
  const left = LEFT_SYMBOLS[i % LEFT_SYMBOLS.length];
  const right = RIGHT_SYMBOLS[i % RIGHT_SYMBOLS.length];
  STYLE_OPTIONS.push({
    id: `dyn-${i}`,
    name: `Tactical Variant ${i + 1}`,
    category: ['all'],
    transform: (t) => `${left} ${t} ${right}`
  });
}
