/**
 * Character maps for 100% stable fancy styles.
 * Uses high-compatibility Unicode blocks to ensure no question marks (?) appear.
 * Corrects "Letterlike Symbols" for Script and Double-Struck ranges.
 */
const maps: Record<string, string[]> = {
  // Mathematical Bold
  bold: "𝐀𝐁𝐂𝐃𝐄𝐅𝐆𝐇𝐈𝐉𝐊𝐋𝐌𝐍𝐎𝐏𝐐𝐑𝐒𝐓𝐔𝐕𝐖𝐗𝐘𝐙𝐚𝐛𝐜𝐝𝐞𝐟𝐠𝐡𝐢𝐣𝐤𝐥𝐦𝐧𝐨𝐩𝐪𝐫𝐬𝐭𝐮𝐯𝐰𝐱𝐲𝐳𝟎𝟏𝟐𝟑𝟒𝟓𝟔𝟕𝟖𝟗".split(""),
  // Mathematical Italic
  italic: "𝘈𝘉𝘊𝘋𝘌𝘍𝘎𝘏𝘐𝘑𝘒𝘓𝘔𝘕𝘖𝘗𝘘𝘙𝘚𝘛𝘜𝘝𝘞𝘟𝘠𝘡𝘢𝘣𝘤𝘥𝘦𝘧𝘨𝘩𝘪𝘫𝘬𝘭𝘮𝘯𝘰𝘱𝘲𝘳𝘴𝘵𝘶𝘷𝑤𝘹𝘺𝘻0123456789".split(""),
  // Mathematical Bold Italic
  boldItalic: "𝘼𝘽𝘾𝘿𝙀𝙁𝙂𝙃𝙄𝙅𝙆𝙇𝙈𝙉𝙊𝙋𝙌𝙍𝙎𝙏𝙐𝙑𝙒𝙓𝙔𝙕𝙖𝙗𝙘𝙙𝙚𝙛𝙜𝙝𝙞𝙟𝙠𝙡𝙢𝙣𝙤𝙥𝙦𝙧𝙨𝙩𝙪𝙫𝙬𝙭𝙮𝙯0123456789".split(""),
  // Mathematical Script (Corrected with Letterlike Symbols for high stability)
  script: "𝒜ℬ𝒞𝒟ℰℱ𝒢ℋℐ𝒥𝒦ℒℳ𝒩𝒪𝒫𝒬ℛ𝒮𝒯𝒰𝒱𝒲𝒳𝒴𝒵𝒶𝒷𝒸𝒹ℯ𝒻ℊ𝒽𝒾𝒿𝓀𝓁𝓂𝓃ℴ𝓅𝓆𝓇𝓈𝓉𝓊𝓋𝓌𝓍𝓎𝓏0123456789".split(""),
  // Tiny Caps (Small Capitals)
  tinyCaps: "ᴀʙᴄᴅᴇꜰɢʜɪᴊᴋʟᴍɴᴏᴘǫʀsᴛᴜᴠᴡxʏᴢᴀʙᴄᴅᴇꜰɢʜɪᴊᴋʟᴍɴᴏᴘǫʀsᴛᴜᴠᴡxʏᴢ0123456789".split(""),
  // Circled Alphanumerics
  circled: "ⒶⒷⒸⒹⒺⒻⒼⒽⒾⒿⓀⓁⓂⓃⓄⓅⓆⓇⓈⓉⓊⓋⓌⓍⓎⓏⓐⓑⓒⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩ⓪①②③④⑤⑥⑦⑧⑨".split(""),
  // Squared Alphanumerics
  squared: "🄰🄱🄲🄳🄴🄵🄶🄷🄸🄹🄺🄻🄼🄽🄾🄿🅀🅁🅂🅃🅄🅅🅆🅇🅈🅉🄰🄱🄲🄳🄴🄵🄶🄷🄸🄹🄺🄻🄼🄽🄾🄿🅀🅁🅂🅃🅄🅅🅆🅇🅈🅉0123456789".split(""),
  // Mathematical Monospace
  monospace: "𝙰𝙱𝙲𝙳𝙴𝙵𝙶𝙷𝙸𝙹𝙺𝙻𝙼𝙽𝙾𝙿𝚀𝚁𝚂𝚃𝚄𝚅𝚆𝚇𝚈𝚉𝚊𝚋𝚌𝚍𝚎𝚏𝚐𝚑𝚒𝚓𝚔𝚕𝚖𝚗𝚘𝚙𝚚𝚛𝚜𝚝𝚞𝚟𝚠𝚡𝚢𝚣𝟶𝟷𝟸𝟹𝟺𝟻𝟼𝟽𝟾𝟿".split(""),
  // Fullwidth
  fullwidth: "ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ０１２３４５６７８９".split("")
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
    return index !== -1 && maps[mapName] && maps[mapName][index] ? maps[mapName][index] : char;
  }).join('');
};

/**
 * STRICTLY APPROVED STABLE GAMING SYMBOLS
 */
export const APPROVED_SYMBOLS = [
  "ツ", "亗", "彡", "乡", "私", "乂", "༒", "꧁", "꧂", "『", "』", "么", "〆", "シ", "卍", "★", "☆", "✦", "༺", "༻", "𒆜", "𒆝", "𒆞", "𒆟", "𒆠", "𒆡", "𒆢", " heartbreaking", "𒆤", "𒆥"
];

export const LEFT_SYMBOLS = ["ツ", "亗", "彡", "乡", "私", "乂", "༒", "꧁", "『", "么", "〆", "シ", "卍", "★", "✦", "༺", "𒆜", "𒆠", "𒆤"];
export const RIGHT_SYMBOLS = ["ツ", "亗", "彡", "乡", "私", "乂", "༒", "꧂", "』", "么", "〆", "シ", "卍", "★", "✦", "༻", "𒆜", "𒆠", "𒆤"];

export const STYLE_OPTIONS: StyleOption[] = [
  { id: 'normal', name: 'Standard Elite', category: ['all'], transform: (t) => t },
  { id: 'bold', name: 'Titan Bold', category: ['all', 'pubg', 'cod'], transform: mapTransform('bold') },
  { id: 'italic', name: 'Swift Italic', category: ['all', 'freefire'], transform: mapTransform('italic') },
  { id: 'boldItalic', name: 'Grand Master', category: ['all', 'pubg'], transform: mapTransform('boldItalic') },
  { id: 'script', name: 'Royal Script', category: ['all', 'roblox'], transform: mapTransform('script') },
  { id: 'tiny', name: 'Small Caps', category: ['all', 'freefire'], transform: mapTransform('tinyCaps') },
  { id: 'circled', name: 'Orbital Ring', category: ['all', 'roblox'], transform: mapTransform('circled') },
  { id: 'squared', name: 'Box Block', category: ['all', 'roblox'], transform: mapTransform('squared') },
  { id: 'monospace', name: 'System Code', category: ['all', 'cod'], transform: mapTransform('monospace') },
  { id: 'fullwidth', name: 'Wide Frame', category: ['all', 'minecraft'], transform: mapTransform('fullwidth') },
];

// Generate 50+ variations using safe mappings combined with stable patterns
const baseMapKeys = Object.keys(maps);
for (let i = 0; i < 50; i++) {
  const mapKey = baseMapKeys[i % baseMapKeys.length];
  const decorations = [
    { name: "Neural", sep: "" },
    { name: "Vector", sep: " " },
    { name: "Pulse", sep: "." },
    { name: "Link", sep: "·" },
    { name: "Void", sep: "_" }
  ];
  const deco = decorations[i % decorations.length];
  
  STYLE_OPTIONS.push({
    id: `forge-${i}`,
    name: `${deco.name} ${i + 1}`,
    category: ['all'],
    transform: (t) => {
      const base = mapTransform(mapKey)(t);
      return deco.sep ? base.split('').join(deco.sep) : base;
    }
  });
}
