export const INSERT_DOCUMENT = `
INSERT INTO documents (title, source, mime_type, owner_id)
VALUES ($1, $2, $3, $4)
RETURNING *;
`;

export const INSERT_CHUNK = `
INSERT INTO document_chunks (document_id, content, chunk_index)
VALUES ($1, $2, $3);
`;
