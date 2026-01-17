export const CREATE_USER = `
INSERT INTO users (email, password_hash, role_id) 
VALUES ($1, $2, $3) 
RETURNING id, email, role_id, created_at
`;

export const GET_USER_BY_EMAIL = `
SELECT * FROM users WHERE email = $1
`;
