exports.up = pgm => {
  pgm.sql(`
    INSERT INTO permissions (name) VALUES
      ('user.read'),
      ('user.write'),
      ('role.assign'),
      ('admin.access')
    ON CONFLICT DO NOTHING;
  `);
};

exports.down = pgm => {
  pgm.sql(`
    DELETE FROM permissions
    WHERE name IN (
      'user.read',
      'user.write',
      'role.assign',
      'admin.access'
    );
  `);
};
