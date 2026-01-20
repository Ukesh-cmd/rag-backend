import fs from "fs";

export async function extractText(
  filePath: string,
  mimeType: string
): Promise<string> {
  if (mimeType === "text/plain" || mimeType === "text/markdown") {
    return fs.readFileSync(filePath, "utf-8");
  }

  throw new Error("Unsupported file type");
}
