exports.up = pgm => {
  pgm.sql(`
    CREATE TABLE users (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      is_active BOOLEAN DEFAULT TRUE,
      role_id INTEGER REFERENCES roles(id),
      is_verified BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    );

    CREATE INDEX idx_users_email ON users(email);
  `);
};

exports.down = pgm => {
  pgm.sql(`
    DROP TABLE IF EXISTS users;
  `);
};
