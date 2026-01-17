exports.up = pgm => {
  pgm.sql(`
    CREATE TABLE refresh_tokens (
      id SERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
      token TEXT NOT NULL,
      expires_at TIMESTAMP NOT NULL,
      revoked BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP DEFAULT NOW()
    );

    CREATE INDEX idx_refresh_tokens_user_id ON refresh_tokens(user_id);
  `);
};

exports.down = pgm => {
  pgm.sql(`
    DROP TABLE IF EXISTS refresh_tokens;
  `);
};
