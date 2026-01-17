exports.up = pgm => {
  pgm.sql(`
    INSERT INTO roles (name) VALUES
      ('admin'),
      ('user')
    ON CONFLICT DO NOTHING;
  `);
};

exports.down = pgm => {
  pgm.sql(`
    DELETE FROM roles WHERE name IN ('admin', 'user');
  `);
};
