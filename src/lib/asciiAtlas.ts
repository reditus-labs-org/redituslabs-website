const GLYPHS = [
  // Matrix katakana
  "ア", "イ", "ウ", "エ", "オ", "カ", "キ", "ク", "ケ", "コ",
  "サ", "シ", "ス", "セ", "ソ", "タ", "チ", "ツ", "テ", "ト",
  "ナ", "ニ", "ヌ", "ネ", "ノ", "ハ", "ヒ", "フ", "ヘ", "ホ",
  "マ", "ミ", "ム", "メ", "モ", "ヤ", "ユ", "ヨ", "ラ", "リ",
  // Tech symbols
  "▲", "◆", "◎", "▣", "▦", "▧", "▨", "▩", "○", "●",
  // Geometric blocks
  "█", "▓", "▒", "░", "▄", "▀", "▌", "▐", "■", "□",
  // Binary + brackets
  "0", "1", "{", "}", "[", "]", "<", ">", "|", "_",
];

const ATLAS_SIZE = 1024;
const GLYPH_SIZE = 128;
const COLUMNS = 8;
const ROWS = 8;

export function generateAsciiAtlas(): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = ATLAS_SIZE;
  canvas.height = ATLAS_SIZE;
  const ctx = canvas.getContext("2d")!;

  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, ATLAS_SIZE, ATLAS_SIZE);

  ctx.font = `bold ${GLYPH_SIZE * 0.7}px "JetBrains Mono", monospace`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "#ffffff";

  GLYPHS.forEach((glyph, index) => {
    const col = index % COLUMNS;
    const row = Math.floor(index / COLUMNS);
    const x = col * GLYPH_SIZE + GLYPH_SIZE / 2;
    const y = row * GLYPH_SIZE + GLYPH_SIZE / 2;
    ctx.fillText(glyph, x, y);
  });

  return canvas;
}

export function getGlyphUV(index: number): { u: number; v: number; size: number } {
  const col = index % COLUMNS;
  const row = Math.floor(index / COLUMNS);
  const u = (col + 0.5) / COLUMNS;
  const v = (row + 0.5) / ROWS;
  const size = 1 / COLUMNS;
  return { u, v, size };
}

export const GLYPH_COUNT = GLYPHS.length;
export { GLYPHS };