/**
 * @type {import('node-pg-migrate').MigrationBuilder}
 */
exports.up = async (pgm) => {
  // 1️⃣ Clear existing permissions
  pgm.sql(`
    TRUNCATE TABLE permissions RESTART IDENTITY CASCADE;
  `);

  // 2️⃣ Insert RAG-ready permissions
  pgm.sql(`
    INSERT INTO permissions (name) VALUES
    -- User management
    ('user:create'),
    ('user:read'),
    ('user:update'),
    ('user:delete'),
    ('user:list'),
    ('user:manage'),

    -- Role management
    ('role:create'),
    ('role:read'),
    ('role:update'),
    ('role:delete'),
    ('role:list'),
    ('role:manage'),

    -- Permission management
    ('permission:read'),
    ('permission:manage'),

    -- Document / RAG ingestion
    ('document:upload'),
    ('document:read'),
    ('document:update'),
    ('document:delete'),
    ('document:list'),
    ('document:chunk'),
    ('document:embed'),
    ('document:search'),
    ('document:manage'),

    -- RAG / AI operations
    ('rag:query'),
    ('rag:stream'),
    ('rag:feedback'),
    ('rag:admin'),

    -- File / object storage
    ('file:upload'),
    ('file:download'),
    ('file:delete'),
    ('file:list'),
    ('file:manage'),

    -- Background jobs
    ('job:create'),
    ('job:read'),
    ('job:cancel'),
    ('job:list'),
    ('job:manage'),

    -- Observability
    ('metrics:read'),
    ('logs:read'),
    ('traces:read'),
    ('monitoring:admin'),

    -- System-level (super admin)
    ('system:health'),
    ('system:config:read'),
    ('system:config:update'),
    ('system:admin');
  `);
};

exports.down = async (pgm) => {
  pgm.sql(`
    TRUNCATE TABLE permissions RESTART IDENTITY CASCADE;
  `);
};
