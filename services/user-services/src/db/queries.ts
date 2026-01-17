// Roles
export const GET_ALL_ROLES = `SELECT * FROM roles`;
export const GET_ROLE_BY_ID = `SELECT * FROM roles WHERE id = $1`;
export const CREATE_ROLE = `
INSERT INTO roles (name)
VALUES ($1)
`;
export const DELETE_ROLE = `
DELETE FROM roles WHERE id = $1
`;

export const UPDATE_ROLE = `
UPDATE roles SET name = $1
WHERE id = $2 RETURNING id, name
`;

// Permissions
export const GET_PERMISSIONS_BY_ROLE = `
SELECT permission, allowed 
FROM permissions 
WHERE role_id = $1
`;

export const CREATE_PERMISSION = `
INSERT INTO permissions (name)
VALUES ($1)
`;

export const DELETE_PERMISSION = `
DELETE FROM permissions WHERE name = $1
`;

export const UPDATE_PERMISSION = `
UPDATE permissions SET name = $1
WHERE id = $2 RETURNING id, name
`;

// Users
export const GET_USER_BY_ID = `
SELECT u.id, u.email, u.role_id, r.name as role_name
FROM users u
JOIN roles r ON u.role_id = r.id
WHERE u.id = $1
`;

export const UPDATE_USER_ROLE = `
UPDATE users SET role_id = $1, updated_at = NOW()
WHERE id = $2 RETURNING id, email, role_id
`;


