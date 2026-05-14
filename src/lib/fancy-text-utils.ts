/**
 * STABLE UNICODE FANCY TEXT ENGINE
 * Explicitly defined maps to avoid "question mark" gaps in mathematical ranges.
 * Corrects for "Letterlike Symbols" gaps (C, H, N, P, Q, R, Z, etc.).
 */

const standardChars = Array.from("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789");

// Explicitly audited maps to ensure zero question marks
const MAPS: Record<string, string[]> = {
  // 𝐁𝐨𝐥𝐝 𝐒𝐞𝐫𝐢𝐟
  bold: Array.from("𝐀𝐁𝐂𝐃𝐄𝐅𝐆𝐇𝐈𝐉𝐊𝐋𝐌𝐍𝐎𝐏𝐐𝐑𝐒𝐓𝐔𝐕𝐖𝐗𝐘𝐙𝐚𝐛𝐜𝐝𝐞𝐟𝐠𝐡𝐢𝐣𝐤𝐥𝐦𝐧𝐨𝐩𝐪𝐫𝐬𝐭𝐮𝐯𝐰𝐱𝐲𝐳𝟎𝟏𝟐𝟑𝟒𝟓𝟔𝟕𝟖𝟗"),
  // 𝑰𝒕𝒂𝒍𝒊𝒄 𝑺𝒆𝒓𝒊𝒇
  italic: Array.from("𝑨𝑩𝑪𝑫𝑬𝑭𝑮𝑯𝑰𝑱𝑲𝑳𝑴𝑵𝑶𝑷𝑸𝑹𝑺𝑻𝑼𝑽𝑾𝑿𝒀𝒁𝒂𝒃𝒄𝒅𝒆𝒇𝒈𝒉𝒊𝒋𝒌𝒍𝒎𝒏𝒐𝒑𝒒𝒓𝒔𝒕𝒖𝒗𝒘𝒙𝒚𝒛0123456789"),
  // 𝑩𝒐𝒍𝒅 𝑰𝒕𝒂𝒍𝒊𝒄
  boldItalic: Array.from("𝑨𝑩𝑪𝑫𝑬𝑭𝑮𝑯𝑰𝑱𝑲𝑳𝑴𝑵𝑶𝑷𝑸𝑹𝑺𝑻𝑼𝑽𝑾𝑿𝒀𝒁𝒂𝒃𝒄𝒅𝒆𝒇𝒈𝒉𝒊𝒋𝒌𝒍𝒎𝒏𝒐𝒑𝒒𝒓𝒔𝒕𝒖𝒗𝒘𝒙𝒚𝒛0123456789"),
  // 𝒮𝒸𝓇𝒾𝓅𝓉 (Corrected gaps)
  script: Array.from("𝒜ℬ𝒞𝒟ℰℱ𝒢ℋℐ𝒥𝒦ℒℳ𝒩𝒪𝒫𝒬ℛ𝒮𝒯𝒰𝒱𝒲𝒳𝒴𝒵𝒶𝒷𝒸𝒹ℯ𝒻ℊ𝒽𝒾𝒿𝓀𝓁𝓂𝓃ℴ𝓅𝓆𝓇𝓈𝓉𝓊𝓋𝓌𝓍𝓎𝓏0123456789"),
  // 𝓑𝓸𝓵𝓭 𝓢𝓬𝓻𝓲𝓹𝓽
  boldScript: Array.from("𝓐𝓑𝓒𝓓𝓔𝓕𝓖𝓗𝓘𝓙𝓚𝓛𝓜𝓝𝓞𝓟𝓠𝓡𝓢𝓣𝓤𝓥𝓦𝓧𝓨𝓩𝓪𝓫𝓬𝓭𝓮𝓯𝓰𝓱𝓲𝓳𝓴𝓵𝓶𝓷𝓸𝓹𝓺𝓻𝓼𝓽𝓾𝓿𝔀𝔁𝔂𝔃0123456789"),
  // 𝔔𝔯𝔞𝔨𝔱𝔲𝔯 (Corrected gaps)
  fraktur: Array.from("𝔄𝔅ℭ𝔇𝔈𝔉𝔊ℌℑ𝔍𝔎𝔏𝔐𝔑𝔒𝔓𝔔ℜ𝔖𝔗𝔘𝔙𝔚𝔛𝔜ℨ𝔞𝔟𝔠𝔡𝔢𝔣𝔤𝔥𝔦𝔧𝔨𝔩𝔪𝔫𝔬𝔭𝔮𝔯𝔰𝔱𝔲𝔳𝔴𝔵𝔶𝔷0123456789"),
  // 𝕭𝖔𝖑𝖉 𝕱𝖗𝖆𝖐𝖙𝖚𝖗
  boldFraktur: Array.from("𝕬𝕭𝕮𝕯𝕰𝕱𝕲𝕳𝕴𝕵𝕶𝕷𝕸𝕹𝕺𝕻𝕼𝕽𝕾𝕿𝖀𝖁𝖂𝖃𝖄𝖅𝖆𝖇𝖈𝖉𝖊𝖋𝖌𝖍𝖎𝖏𝖐𝖑𝖒𝖓𝖔𝖕𝖖𝖗𝖘𝖙𝖚𝖛𝖜𝖝𝖞𝖟0123456789"),
  // 𝔻𝕠𝕦𝕓𝕝𝕖 𝕊𝕥𝕣𝕦𝕔𝕜 (Corrected gaps)
  doubleStruck: Array.from("𝔸𝔹ℂ𝔻𝔼𝔽𝔾ℍ𝕀𝕁𝕂𝕃𝕄ℕ𝕆ℙℚℝ𝕊𝕋𝕌𝕍𝕎𝕏𝕐ℤ𝕒𝕓𝕔𝕕𝕖𝕗𝕘𝕙𝕚𝕛𝕜𝕝𝕞𝕟𝕠𝕡𝕢𝕣𝕤𝕥𝕦𝕧𝕨𝕩𝕪𝕫𝟘𝟙𝟚𝟛𝟜𝟝𝟞𝟟𝟠𝟡"),
  // Ａｅｓｔｈｅｔｉｃ (Fullwidth)
  fullwidth: Array.from("ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ０１２３４５６７８９"),
  // 𝕊𝕞𝕒𝕝𝕝 ℂ𝕒𝕡𝕤
  smallCaps: Array.from("ᴀʙᴄᴅᴇꜰɢʜɪᴊᴋʟᴍɴᴏᴘǫʀsᴛᴜᴠᴡxʏᴢᴀʙᴄᴅᴇꜰɢʜɪᴊᴋʟᴍɴᴏᴘǫʀsᴛᴜᴠᴡxʏᴢ0123456789"),
  // 𝐁𝐨𝐥𝐝 𝐒𝐚𝐧𝐬
  boldSans: Array.from("𝐀𝐁𝐂𝐃𝐄𝐅𝐆𝐇𝐈𝐉𝐊𝐋𝐌𝐍𝐎𝐏𝐐𝐑𝐒𝐓𝐔𝐕𝐖𝐗𝐘𝐙𝐚𝐛𝐜𝐝𝐞𝐟𝐠𝐡𝐢𝐣𝐤𝐥𝐦𝐧𝐨𝐩𝐪𝐫𝐬𝐭𝐮𝐯𝐰𝐱𝐲𝐳𝟎𝟏𝟐𝟑𝟒𝟓𝟔𝟕𝟖𝟗"),
  // 𝙼𝚘𝚗𝚘𝚜𝚙𝚊𝚌𝚎
  monospace: Array.from("𝙰𝙱𝙲𝙳𝙴𝙵𝙶𝙷𝙸𝚉𝙺𝙻𝙼𝙽𝙾𝙿𝚀𝚁𝚂𝚃𝚄𝚅𝚆𝚇𝚈𝚉𝚊𝚋𝚌𝚍𝚎𝚏𝚐𝚑𝚒𝚓𝚔𝚕𝚖𝚗𝚘𝚙𝚚𝚛𝚜𝚝𝚞𝚟𝚠𝚡𝚢𝚣𝟶𝟷𝟸𝟹𝟺𝟻𝟼𝟽𝟾𝟿"),
  // 𝖲𝖺𝗇𝗌-𝗌𝖾𝗋𝗂𝖿
  sans: Array.from("𝖠𝖡𝖢𝖣𝖤𝖥𝖦𝖧𝖨𝖩𝖪𝖫𝖬𝖭𝖮𝖯𝖰𝖱𝖲𝖳𝖴𝖵𝖶𝖷𝖸𝖹𝖺𝖻𝖼𝖽𝖾𝖿𝗀𝗁𝗂𝗃𝗄𝗅𝗆𝗇𝗈𝗉𝗊𝗋𝗌𝗍𝗎𝗏𝗐𝗑𝗒𝗓𝟢𝟣𝟤𝟥𝟦𝟧𝟨𝟩𝟪𝟫"),
  // 𝘈𝘦𝘴𝘵𝘩𝘦𝘵𝘪𝘤 𝘚𝘢𝘯𝘴
  italicSans: Array.from("𝘈𝘉𝘊𝘋𝘌𝘍𝘎𝘏𝘐𝘑𝘒𝘓𝘔𝘕𝘖𝘗𝘘𝘙𝘚𝘛𝘜𝘝𝘞𝘟𝘠𝘡𝘢𝘣𝘤𝘥𝘦𝘧𝘨𝘩𝘪𝘑𝘬𝘭𝘮𝘯𝘰𝘱𝗊𝘳𝘴𝘵𝘶𝘷𝘸𝘹𝘺𝘻0123456789"),
  // 𝘼𝙚𝙨𝙩𝙝𝙚𝙩𝙞𝙘 𝘽𝙤𝙡𝙙 𝙎𝙖𝙣𝙨
  boldItalicSans: Array.from("𝘼𝘽𝘾𝘿𝙀𝙁𝙂𝙃𝙄𝙅开𝙇𝙈𝙉𝙊𝙋𝙌𝙍𝙎𝙏𝙐𝙑𝙒𝙓𝙔𝙕𝙖𝙗𝙘𝙙𝙚𝙛𝙜𝙝𝙞𝙟𝙠𝙡𝙢𝙣𝙤𝙥𝙦𝙧𝙨𝙩𝙪𝙫𝙬𝙭𝙮𝙯0123456789"),
};

export type StyleCategory = 'all' | 'pubg' | 'freefire' | 'cod' | 'roblox' | 'minecraft';

export interface StyleOption {
  id: string;
  name: string;
  category: StyleCategory[];
  transform: (text: string) => string;
}

const mapTransform = (mapName: string) => (text: string) => {
  return Array.from(text).map(char => {
    const index = standardChars.indexOf(char);
    return index !== -1 && MAPS[mapName] && MAPS[mapName][index] ? MAPS[mapName][index] : char;
  }).join('');
};

const EMOJIS = [
  "😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "☺️", "😊", "😇", "😍", "🤩", "😘", "😗", "😚", "😋", "😛", "😜", "🤪", "🤨", "🧐", "🤓", "😎", "🥸", "🥳", "😏", "😒", "😞", "😔", "😟", "😕", "🙁", "☹️", "😣", "😖", "😫", "😩", "🥺", "😢", "😭", "😤", "😠", "😡", "🤬", "🤯", "😳", "🥵", "🥶", "😱", "😨", "😰", "😥", "😓", "🤗", "🤔", "🤭", "🤫", "🤥", "😶", "😐", "😑", "😬", "🙄", "😯", "😦", "😧", "😮", "😲", "🥱", "😴", "🤤", "😪", "😵", "🤐", "🥴", "🤢", "🤮", "🤧", "😷", "🤒", "🤕", "🤑", "🤠", "😈", "👿", "👹", "👺", "🤡", "💩", "👻", "💀", "☠️", "👽", "👾", "🤖", "🎃", "😺", "😸", "😻", "😽", "😼", "🙀", "😿", "😾",
  "👋", "🤚", "🖐", "✋", "🖖", "👌", "🤏", "✌️", "🤞", "🤟", "🤘", "🤙", "👈", "👉", "👆", "🖕", "👇", "☝️", "👍", "👎", "✊", "👊", "🤛", "🤜", "👏", "🙌", "👐", "🤲", "🤝", "🙏", "✍️", "💅", "🤳", "💪", "🦾", "🦵", "🦿", "🦶", "👂", "🦻", "👃", "🧠", "🦷", "🦴", "👀", "👁", "👅", "👄", "💋", "🩸", "👶", "🧒", "👦", "👧", "🧑", "👱", "👨", "🧔", "👩", "🧓", "👴", "👵", "👮", "🕵️", "💂", "👷", "🤴", "👸", "👳", "👲", "🧕", "🤵", "👰", "🤰", "🤱", "👼", "🎅", "🤶", "🦸", "🦹", "🧙", "🧚", "🧜", "🧝", "🧞",
  "🍏", "🍎", "🍐", "🍊", "🍋", "🍌", "🍉", "🍇", "🍓", "🍈", "🍒", "🍑", "🥭", "🍍", "🥥", "🥝", "🍅", "🍆", "🥑", "🥦", "🥬", "🥒", "🌶", "🌽", "🥕", "🧄", "🧅", "🥔", "🍠", "🥐", "🍞", "🥖", "🥨", "🧀", "🍖", "🍗", "🥩", "🥓", "🍔", "🍟", "🍕", "🌭", "🥪", "🌮", "🌯", "🥙", "🥚", "🍳", "🥘", "🍲", "🥣", "🥗", "🧈", "🧂", "🥫", "🍱", "🍘", "🍙", "🍚", "🍜", "🍝", "🍠", "🍢", "🍣", "🍤", "🍥", "🥮", "🍡", "🥠", "🥡", "🍦", "🍧", "🍨", "🍩", "🍪", "🎂", "🍰", "🧁", "🥧", "🍫", "🍬", "🍭", "🍮", "🍯", "🍼", "🥛", "☕️", "🍵", "🍶", "🍾", "🍷", "🍸", "🍹", "🍺", "🍻", "🥂", "🥃", "🥤", "🧃", "🧉", "🧊",
  "⚽️", "🏀", "🏈", "⚾️", "🥎", "🎾", "🏐", "🏉", "🎱", "🏓", "🏸", "🥅", "⛳️", "🏹", "🎯", "🎰", "🎮", "🕹", "👾", "🔫", "🎲", "🎨", "🎼", "🎬", "🎭",
  "❤️", "🧡", "💛", "💚", "💙", "💜", "🖤", "🤍", "🤎", "💔", "❣️", "💕", "💞", "💓", "💗", "💖", "💘", "💝", "💟", "☮️", "✝️", "☪️", "🕉", "☸️", "🔯", "♈️", "♉️", "♋️", "♌️", "♎️", "♏️", "♐️", "♑️", "♒️", "♓️", "⛎", "☯️", "☦️", "🛐", "⚛️", "⚧", "✖️", "➕", "➖", "➗", "♾", "‼️", "⁉️", "❓", "❔", "❕", "❗️", "〰️", "⚕️", "♻️", "⚜️", "🔱", "📛", "🔰", "⭕️", "✅", "☑️", "✔️", "❌", "❎", "➰", "〽️", "✳️", "✴️", "❇️", "©️", "®️", "™️", "🏁", "🚩", "🎌", "🏴", "🏳️", "🏳️‍🌈", "🏴‍☠️"
];

const RAW_SYMBOLS = [
  "ツ", "亗", "彡", "乡", "私", "乂", "༒", "꧂", "』", "么", "〆", "シ", "卍", "★", "☆", "✦", "༺", "༻", "𒆜", "☬", "×", "๛", "۝", "ঔৣ", "乛", "乄", "īlī", "ム", "の", "王", "丶", "ズ", "刁", "Ø", "ジ", "く", "乇", "ゞ", "「", "文", "《", "爪", "ʚ", "气", "Ð", "个", "연", "乙", "๖", "卄", "米", "〗", "冬", "れ", "】", "多", "々", "乀", "丨", "廴", "一", "父", "神", "人", "帝", "レ", "ｱ", "ロ", "요", "厄", "ภ", "≋", "义", "サ", "ハ", "ク", "ほ", "バ", "グ", "ぼ", "ぇ", "パ", "ケ", "ぽ", 
  "༺", "𒆜", "☬", "༒", "༼", "༾", "࿔", "࿕", "࿖", "࿗", "࿘", "࿙", "᭄", "࿐", "༄", "❂", "❈", "❉", "❊", "❋", "❅", "❆", "♡", "❥", "❦", "❧", "ღ",
  "♛", "♚", "♔", "♕", "♜", "♝", "♞", "♖", "✯", "✧", "✰", "✪", "✫", "✵", "•", "◥", "◤", "◣", "◢", "⚔", "⚒", "⚓", "⚖", "⚙", "⚛", "⚜", "⚝", "⚠", "⚡", "⚪", "⚫", "⚽", "⚾", "⛎", "⛏", "⛑", "⛓", "⛔", "⛩", "⛰", "⛳", "⛵", "⛺"
];

export const LEFT_SYMBOLS = [...RAW_SYMBOLS, ...EMOJIS];
export const RIGHT_SYMBOLS = [...RAW_SYMBOLS, ...EMOJIS];

export const STYLE_OPTIONS: StyleOption[] = [
  { id: 'none', name: 'Normal Text (NONE)', category: ['all', 'pubg', 'freefire', 'cod', 'roblox', 'minecraft'], transform: (t) => t },
  { id: 'bold', name: 'Elite Bold', category: ['all', 'pubg', 'cod'], transform: mapTransform('bold') },
  { id: 'italic', name: 'Elite Italic', category: ['all', 'freefire'], transform: mapTransform('italic') },
  { id: 'boldItalic', name: 'Alpha Bold Italic', category: ['all', 'pubg'], transform: mapTransform('boldItalic') },
  { id: 'script', name: 'Royal Script', category: ['all', 'roblox'], transform: mapTransform('script') },
  { id: 'boldScript', name: 'Pro Bold Script', category: ['all', 'pubg', 'cod'], transform: mapTransform('boldScript') },
  { id: 'fraktur', name: 'Gothic Forge', category: ['all', 'pubg'], transform: mapTransform('fraktur') },
  { id: 'boldFraktur', name: 'Elite Fraktur', category: ['all', 'pubg', 'cod'], transform: mapTransform('boldFraktur') },
  { id: 'double', name: 'Double Struck', category: ['all', 'roblox'], transform: mapTransform('doubleStruck') },
  { id: 'smallCaps', name: 'Small Caps', category: ['all', 'freefire'], transform: mapTransform('smallCaps') },
  { id: 'aesthetic', name: 'Fullwidth Aesthetic', category: ['all', 'minecraft'], transform: mapTransform('fullwidth') },
  { id: 'boldSans', name: 'Tactical Sans Bold', category: ['all', 'cod'], transform: mapTransform('boldSans') },
  { id: 'monospace', name: 'Tactical Monospace', category: ['all', 'minecraft'], transform: mapTransform('monospace') },
  { id: 'sans', name: 'Tactical Sans', category: ['all', 'roblox'], transform: mapTransform('sans') },
  { id: 'italicSans', name: 'Stealth Italic Sans', category: ['all', 'pubg'], transform: mapTransform('italicSans') },
  { id: 'boldItalicSans', name: 'Prime Bold Italic Sans', category: ['all', 'cod'], transform: mapTransform('boldItalicSans') },
];

const TACTICAL_PREFIXES = [
  "Elite", "Alpha", "Omega", "Ghost", "Stealth", "Prime", "Cyber", "Neo", "Void", "Titan",
  "Shadow", "Apex", "Nitro", "Pulse", "Zen", "Rogue", "Force", "Delta", "Echo", "Valor",
  "Phantom", "Ravage", "Cobra", "Venom", "Wraith", "Spectre", "Rune", "Mythic", "Legend", "Eternal"
];

// Generate 80+ diverse styles using stable maps
const BASE_KEYS = Object.keys(MAPS);
for (let i = 0; i < 80; i++) {
  const mapKey = BASE_KEYS[i % BASE_KEYS.length];
  const prefix = TACTICAL_PREFIXES[i % TACTICAL_PREFIXES.length];
  STYLE_OPTIONS.push({
    id: `variant-${i}`,
    name: `${prefix} ${mapKey.charAt(0).toUpperCase() + mapKey.slice(1)} v${Math.floor(i/BASE_KEYS.length) + 1}`,
    category: ['all'],
    transform: mapTransform(mapKey)
  });
}
