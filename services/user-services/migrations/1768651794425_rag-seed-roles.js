/**
 * @type {import('node-pg-migrate').MigrationBuilder}
 */
exports.up = async (pgm) => {
  // Clear existing roles
  pgm.sql(`
    TRUNCATE TABLE roles RESTART IDENTITY CASCADE;
  `);

  // Insert extended RAG backend roles
  pgm.sql(`
    INSERT INTO roles (name) VALUES
      ('super-admin'),
      ('admin'),
      ('developer'),
      ('viewer'),
      ('service'),
      ('content-manager'),
      ('analyst'),
      ('support'),
      ('embedding-manager'),
      ('auditor');
  `);
};

exports.down = async (pgm) => {
  pgm.sql(`
    TRUNCATE TABLE roles RESTART IDENTITY CASCADE;
  `);
};
