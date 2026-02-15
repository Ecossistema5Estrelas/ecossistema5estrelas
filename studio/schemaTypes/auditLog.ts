// /studio/schemaTypes/auditLog.ts

export default {
  name: 'auditLog',
  title: 'Audit Log',
  type: 'document',
  fields: [
    {
      name: 'actorId',
      title: 'Actor ID',
      type: 'string',
    },
    {
      name: 'action',
      title: 'Action',
      type: 'string',
    },
    {
      name: 'targetId',
      title: 'Target ID',
      type: 'string',
    },
    {
      name: 'origin',
      title: 'Origin',
      type: 'string',
    },
    {
      name: 'result',
      title: 'Result',
      type: 'string',
    },
    {
      name: 'timestamp',
      title: 'Timestamp',
      type: 'datetime',
    },
  ],
}
