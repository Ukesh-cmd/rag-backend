exports.up = pgm => {
  pgm.sql(`
    CREATE TABLE embeddings (
      id SERIAL PRIMARY KEY,
      document_id UUID NOT NULL,
      content TEXT NOT NULL,
      embedding VECTOR(1536) NOT NULL,
      metadata JSONB,
      created_at TIMESTAMP DEFAULT NOW()
    );

    -- Vector similarity index (cosine similarity)
    CREATE INDEX idx_embeddings_vector
    ON embeddings
    USING ivfflat (embedding vector_cosine_ops)
    WITH (lists = 100);
  `);
};

exports.down = pgm => {
  pgm.sql(`
    DROP TABLE IF EXISTS embeddings;
  `);
};
