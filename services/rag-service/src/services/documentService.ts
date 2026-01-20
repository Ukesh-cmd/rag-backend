import { pool } from "../db/client";
import { chunkText } from "../utils/chunker";
import { extractText } from "../utils/testExtractor";
import { INSERT_DOCUMENT, INSERT_CHUNK } from "../db/queries";

export async function ingestDocument({
  filePath,
  mimeType,
  title,
  ownerId
}: {
  filePath: string;
  mimeType: string;
  title: string;
  ownerId: string;
}) {
  const text = await extractText(filePath, mimeType);
  const chunks = chunkText(text);

  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const { rows } = await client.query(INSERT_DOCUMENT, [
      title,
      "upload",
      mimeType,
      ownerId
    ]);

    const document = rows[0];

    for (let i = 0; i < chunks.length; i++) {
      await client.query(INSERT_CHUNK, [
        document.id,
        chunks[i],
        i
      ]);
    }

    await client.query("COMMIT");
    return document;
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
}
