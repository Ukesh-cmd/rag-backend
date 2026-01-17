/**
 * @type {import('node-pg-migrate').MigrationBuilder}
 */
exports.up = async (pgm) => {
  // Clear existing mappings
  pgm.sql(`
    TRUNCATE TABLE role_permissions RESTART IDENTITY CASCADE;
  `);

  // Insert role-permission mappings
  pgm.sql(`
    -- SUPER ADMIN: system:admin => all
    INSERT INTO role_permissions (role_id, permission_id)
    SELECT r.id, p.id
    FROM roles r, permissions p
    WHERE r.name = 'super-admin';

    -- ADMIN: manage users, roles, documents, RAG, files, jobs
    INSERT INTO role_permissions (role_id, permission_id)
    SELECT r.id, p.id
    FROM roles r, permissions p
    WHERE r.name = 'admin'
      AND p.name IN (
        'user:manage', 'role:manage', 'permission:manage',
        'document:manage', 'rag:admin', 'file:manage', 'job:manage'
      );

    -- DEVELOPER: document upload/embedding, RAG query
    INSERT INTO role_permissions (role_id, permission_id)
    SELECT r.id, p.id
    FROM roles r, permissions p
    WHERE r.name = 'developer'
      AND p.name IN (
        'document:upload', 'document:read', 'document:embed', 'document:search',
        'rag:query'
      );

    -- VIEWER: read-only documents & RAG query
    INSERT INTO role_permissions (role_id, permission_id)
    SELECT r.id, p.id
    FROM roles r, permissions p
    WHERE r.name = 'viewer'
      AND p.name IN ('document:read', 'document:list', 'rag:query');

    -- SERVICE: minimal access for microservices
    INSERT INTO role_permissions (role_id, permission_id)
    SELECT r.id, p.id
    FROM roles r, permissions p
    WHERE r.name = 'service'
      AND p.name IN ('document:read', 'document:embed', 'rag:query');

    -- CONTENT MANAGER: document ingestion
    INSERT INTO role_permissions (role_id, permission_id)
    SELECT r.id, p.id
    FROM roles r, permissions p
    WHERE r.name = 'content-manager'
      AND p.name IN ('document:upload', 'document:read', 'document:chunk', 'document:embed');

    -- ANALYST: read-only + RAG query
    INSERT INTO role_permissions (role_id, permission_id)
    SELECT r.id, p.id
    FROM roles r, permissions p
    WHERE r.name = 'analyst'
      AND p.name IN ('document:read', 'document:list', 'rag:query');

    -- SUPPORT: read-only documents & RAG feedback
    INSERT INTO role_permissions (role_id, permission_id)
    SELECT r.id, p.id
    FROM roles r, permissions p
    WHERE r.name = 'support'
      AND p.name IN ('document:read', 'document:list', 'rag:query', 'rag:feedback');

    -- EMBEDDING MANAGER: embedding actions
    INSERT INTO role_permissions (role_id, permission_id)
    SELECT r.id, p.id
    FROM roles r, permissions p
    WHERE r.name = 'embedding-manager'
      AND p.name IN ('document:embed', 'document:chunk');

    -- AUDITOR: read-only logs, metrics, RAG feedback
    INSERT INTO role_permissions (role_id, permission_id)
    SELECT r.id, p.id
    FROM roles r, permissions p
    WHERE r.name = 'auditor'
      AND p.name IN ('metrics:read', 'logs:read', 'traces:read', 'monitoring:admin', 'rag:feedback');
  `);
};

exports.down = async (pgm) => {
  pgm.sql(`
    TRUNCATE TABLE role_permissions RESTART IDENTITY CASCADE;
  `);
};
