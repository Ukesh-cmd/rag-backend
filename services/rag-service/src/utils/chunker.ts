export function chunkText(
  text: string,
  size = 500,
  overlap = 50
): string[] {
  const words = text.split(" ");
  const chunks: string[] = [];

  let start = 0;
  while (start < words.length) {
    const end = start + size;
    chunks.push(words.slice(start, end).join(" "));
    start += size - overlap;
  }

  return chunks;
}
