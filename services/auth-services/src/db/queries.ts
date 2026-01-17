// ==============================
// USERS
// ==============================

export const CREATE_USER = `
INSERT INTO users (email, password_hash, role_id)
VALUES ($1, $2, $3)
RETURNING id, email, role_id, created_at
`;

export const GET_USER_BY_EMAIL = `
SELECT id, email, password_hash, role_id
FROM users
WHERE email = $1
`;

export const GET_USER_BY_ID = `
SELECT id, email, role_id, created_at
FROM users
WHERE id = $1
`;

export const UPDATE_USER_ROLE = `
UPDATE users
SET role_id = $2
WHERE id = $1
RETURNING id, email, role_id
`;


// ==============================
// REFRESH TOKENS (AUTH SERVICE)
// ==============================

export const INSERT_REFRESH_TOKEN = `
INSERT INTO refresh_tokens (user_id, token, expires_at)
VALUES ($1, $2, $3)
`;

export const GET_REFRESH_TOKEN = `
SELECT id, user_id, token, expires_at
FROM refresh_tokens
WHERE token = $1
`;

export const DELETE_REFRESH_TOKEN = `
DELETE FROM refresh_tokens
WHERE token = $1
`;

export const DELETE_REFRESH_TOKENS_BY_USER = `
DELETE FROM refresh_tokens
WHERE user_id = $1
`;
