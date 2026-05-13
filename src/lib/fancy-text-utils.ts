/**
 * Character maps for different fancy styles
 * Optimized for high compatibility across mobile devices (PUBG/Free Fire/BGMI)
 */
const maps: Record<string, string[]> = {
  bold: "𝐀𝐁𝐂𝐃𝐄𝐅𝐆𝐇𝐈𝐉𝐊𝐋𝐌𝐍𝐎𝐏𝐐𝐑𝐒𝐓𝐔𝐕𝐖𝐗𝐘𝐙𝐚𝐛𝐜𝐝𝐞𝐟𝐠𝐡𝐢𝐣𝐤𝐥𝐦𝐧𝐨𝐩𝐪𝐫𝐬𝐭𝐮𝐯𝐰𝐱𝐲𝐳𝟎𝟏𝟐𝟑𝟒𝟓𝟔𝟕𝟖𝟗".split(""),
  italic: "𝘈𝘉𝘊𝘋𝘌𝘍𝘎𝘏𝘐𝘑𝘒𝘓𝘔𝘕𝘖𝘗𝘘𝘙𝘚𝘛𝘜𝘝𝘞𝘟𝘠𝘡𝘢𝘣𝘤𝘥𝘦𝘧𝘨𝘩𝘪𝘫𝘬𝘭𝘮𝘯𝘰𝘱𝘲𝘳𝘴𝘵𝘶𝘷𝘸𝘹𝘺𝘻0123456789".split(""),
  boldItalic: "𝘼𝘽𝘾𝘿𝙀𝙁𝙂𝙃𝙄𝙅𝙆𝙇𝙈𝙉𝙊𝙋𝙌𝙍𝙎𝙏𝙐𝙑𝙒𝙓𝙔𝙕𝙖𝙗𝙘𝙙𝙚𝙛𝙜𝙝𝙞𝙠𝙡𝙢𝙣𝙤𝙥𝙦𝙧𝙨𝙩𝙪𝙫𝙬𝙭𝙮𝙯0123456789".split(""),
  script: "𝓐𝓑𝓒𝓓𝓔𝓕𝓖𝓗𝓘𝓙𝓚𝓛𝓜𝓝𝓞𝓟𝓠𝓡𝓢𝓣𝓤𝓥𝓦𝓧𝓨𝓩𝓪𝓫𝓬𝓭𝓮𝓯𝓰𝓱𝓲𝓳𝓴𝓵𝓶𝓷𝓸𝓹𝓺𝓻𝓼𝓽𝓾𝓿𝔀𝔁𝔂𝔃0123456789".split(""),
  doubleStruck: "𝔸𝔹ℂ𝔻𝔼𝔽𝔾ℍ𝕀𝕁𝕂𝕃𝕄ℕ𝕆ℙℚℝ𝕊𝕋𝕌𝕎𝕏𝕐ℤ𝕒𝕓𝕔𝕕𝕖𝕗𝕘𝕙𝕚𝕛𝕜𝕝𝕞𝕟𝕠𝕡𝕢𝕣𝕤𝕥𝕦𝕧𝕨𝕩𝕪𝕫𝟘𝟙𝟚𝟛𝟜𝟝𝟞𝟟𝟠𝟡".split(""),
  gothic: "𝔄𝔅ℭ𝔇𝔈𝔉𝔊ℌℑ𝔍𝔎𝔏𝔐𝔑𝔒𝔓𝔔ℜ𝔖𝔗𝔙𝔚𝔛𝔜ℨ𝔞𝔟𝔠𝔡𝔢𝔣𝔤𝔥𝔦𝔧𝔨𝔩𝔪𝔫𝔬𝔭𝔮𝔯𝔰𝔱𝔲𝔳𝔴𝔵𝔶𝔷0123456789".split(""),
  monospace: "𝙰𝙱𝙲𝙳𝙴𝙵𝙶𝙷𝙸𝙹𝙺𝙻𝙼𝙽𝙾𝙿𝚀𝚁𝚂𝚃𝚄𝚅𝚆𝚇𝚈𝚉𝚊𝚋𝚌𝚍𝚎𝚏𝚐𝚑𝚒𝚓𝚔𝚕𝚖𝚗𝚘𝚙𝚚𝚛𝚜𝚝𝚞𝚟𝚠𝚡𝚢𝚣𝟶𝟷𝟸𝟹𝟺𝟻𝟼𝟽𝟾𝟿".split(""),
  bubble: "Ⓐ⒒ⒸⒹⒺⒻⒼⒽⒾⒿⓀⓁⓂⓃⓄⓅⓆⓇⓈⓉⓊⓋⓌⓍⓎⓏⓐⓑⓒⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩ⓪①②③④⑤⑥⑦⑧⑨".split(""),
  square: "🄰🄱🄲🄳🄴🄵🄶🄷🄸🄹🄺🄻🄼🄽🄾🄿🅀🅁🅂🅃🅄🅅🅆🅇🅈🅉🄰🄱🄲🄳🄴🄵🄶🄷🄸🄹🄺🄻🄼🄽🄾🄿🅀🅁🅂🅃🅄🅅🅆🅇🅈🅉0123456789".split(""),
  tinyCaps: "ᴀʙᴄᴅᴇꜰɢʜɪᴊᴋʟᴍɴᴏᴘǫʀsᴛᴜᴠᴡxʏᴢᴀʙᴄᴅᴇꜰɢʜɪᴊᴋʟᴍɴᴏᴘǫʀsᴛᴜᴠᴡxʏᴢ0123456789".split(""),
};

const standardChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split("");

export type StyleCategory = 'all' | 'pubg' | 'freefire' | 'cod' | 'roblox' | 'symbols';

export interface StyleOption {
  id: string;
  name: string;
  category: StyleCategory[];
  transform: (text: string) => string;
}

const mapTransform = (mapName: string) => (text: string) => {
  return text.split('').map(char => {
    const index = standardChars.indexOf(char);
    return index !== -1 ? maps[mapName][index] : char;
  }).join('');
};

export const POPULAR_SYMBOLS = [
  "ツ", "亗", "乡", "私", "々", "×", "〆", "★", "彡", "༺", "༻", "꧁", "꧂", "✿", "❂", "☠", "✞", "⚡", "☯", "♚", "♛", "♕", "♨", "♥", "❤", "✦", "✧", "☾", "☼", "⚔", "🛡", "🏹", "🎯", "🔥", "💎", "👾", "🐉", "👹", "👽", "👻", "⚡", "⛈", "☣", "☢", "✵", "✹", "🌀", "💠", "🎗", "🎖"
];

export const STYLE_OPTIONS: StyleOption[] = [
  { id: 'bold', name: 'Tactical Bold', category: ['all', 'pubg', 'cod'], transform: mapTransform('bold') },
  { id: 'italic', name: 'Swift Move', category: ['all', 'freefire'], transform: mapTransform('italic') },
  { id: 'boldItalic', name: 'Heavy Assault', category: ['all', 'pubg', 'freefire'], transform: mapTransform('boldItalic') },
  { id: 'script', name: 'Royal Order', category: ['all', 'roblox'], transform: mapTransform('script') },
  { id: 'doubleStruck', name: 'Glitch Core', category: ['all', 'roblox'], transform: mapTransform('doubleStruck') },
  { id: 'gothic', name: 'Ancient Reaper', category: ['all', 'pubg'], transform: mapTransform('gothic') },
  { id: 'monospace', name: 'Mainframe', category: ['all', 'cod', 'pubg'], transform: mapTransform('monospace') },
  { id: 'bubble', name: 'Bubble Shield', category: ['all', 'roblox'], transform: mapTransform('bubble') },
  { id: 'square', name: 'Block Force', category: ['all', 'roblox'], transform: mapTransform('square') },
  { id: 'tiny', name: 'Mini Scout', category: ['all', 'freefire'], transform: mapTransform('tinyCaps') },
  { id: 'ninja', name: 'Shadow Shinobi', category: ['all', 'freefire'], transform: (t) => `々${t}×` },
  { id: 'legend', name: 'God Mode', category: ['all', 'pubg'], transform: (t) => `亗 ${t} 亗` },
  { id: 'skull', name: 'Executioner', category: ['all', 'cod'], transform: (t) => `☠︎ ${t} ☠︎` },
  { id: 'star', name: 'Nova Burst', category: ['all', 'freefire'], transform: (t) => `★彡 ${t} 彡★` },
  { id: 'cross', name: 'Sniper Scope', category: ['all', 'pubg', 'cod'], transform: (t) => `⊹⊱ ${t} ⊰⊹` },
  { id: 'ghost', name: 'Phantom', category: ['all', 'freefire'], transform: (t) => `༺${t}༻` },
  { id: 'fire', name: 'Inferno', category: ['all', 'freefire'], transform: (t) => `♨︎ ${t} ♨︎` },
  { id: 'wings', name: 'Valkyrie', category: ['all', 'roblox', 'freefire'], transform: (t) => `ʚ ${t} ɞ` },
  { id: 'brackets', name: 'Secure Zone', category: ['all', 'cod'], transform: (t) => `《 ${t} 》` },
  { id: 'cyber', name: 'Cyberpunk', category: ['all', 'cod'], transform: (t) => `【 ${t.toUpperCase()} 】` },
  { id: 'lightning', name: 'Voltage', category: ['all', 'freefire'], transform: (t) => `⚡ ${t} ⚡` },
  { id: 'samurai', name: 'Ronin', category: ['all', 'pubg'], transform: (t) => `〆 ${t} 〆` },
  { id: 'heart', name: 'Pulse', category: ['all', 'roblox'], transform: (t) => `♥ ${t} ♥` },
  { id: 'crown', name: 'Emperor', category: ['all', 'pubg'], transform: (t) => `♕ ${t} ♕` },
];

// Add 100+ dynamic styles with high-compatibility symbols
const prefixes = [
  "꧁", "༺", "★", "ツ", "❤", "☆", "†", "℘", "⚔", "⚡", "☯", "☸", "❃", "❄", "☾", "☼", 
  "☠", "☣", "♛", "♚", "✿", "❂", "✺", "✹", "✷", "✵", "♘", "♝", "♞", "♟", "⚚", "⚝",
  "⚜", "❈", "❉", "❊", "❋", "✧", "✦", "✫", "✪", "✬", "✭", "✮", "✯", "✰", "⁂", "⁎"
];

const suffixes = [
  "꧂", "༻", "★", "ツ", "❤", "☆", "†", "℘", "⚔", "⚡", "☯", "☸", "❃", "❄", "☽", "☼",
  "☠", "☣", "♛", "♚", "✿", "❂", "✺", "✹", "✷", "✵", "♘", "♝", "♞", "♟", "⚚", "⚝",
  "⚜", "❈", "❉", "❊", "❋", "✧", "✦", "✫", "✪", "✬", "✭", "✮", "✯", "✰", "⁂", "⁎"
];

for (let i = 0; i < 100; i++) {
  const p = prefixes[i % prefixes.length];
  const s = suffixes[i % suffixes.length];
  STYLE_OPTIONS.push({
    id: `dyn-${i}`,
    name: `Elite Style ${i + 25}`,
    category: ['all'],
    transform: (t) => `${p} ${t} ${s}`
  });
}
