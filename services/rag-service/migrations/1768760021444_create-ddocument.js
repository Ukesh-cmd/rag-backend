/* eslint-disable camelcase */
exports.up = pgm => {
  pgm.createTable('documents', {
    id: { type: 'uuid', primaryKey: true, default: pgm.func('gen_random_uuid()') },
    title: { type: 'text', notNull: true },
    source: { type: 'text' },
    mime_type: { type: 'text', notNull: true },
    owner_id: { type: 'uuid', notNull: true },
    created_at: { type: 'timestamp', notNull: true, default: pgm.func('current_timestamp') }
  });
};

exports.down = pgm => {
  pgm.dropTable('documents');
};
