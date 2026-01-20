/* eslint-disable camelcase */
exports.up = pgm => {
  pgm.createTable('document_chunks', {
    id: { type: 'uuid', primaryKey: true, default: pgm.func('gen_random_uuid()') },
    document_id: { type: 'uuid', notNull: true, references: 'documents', onDelete: 'cascade' },
    content: { type: 'text', notNull: true },
    chunk_index: { type: 'integer', notNull: true },
    created_at: { type: 'timestamp', notNull: true, default: pgm.func('current_timestamp') }
  });

  pgm.createIndex('document_chunks', 'document_id');
};

exports.down = pgm => {
  pgm.dropTable('document_chunks');
};
