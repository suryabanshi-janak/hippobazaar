import { CollectionConfig } from 'payload/types';

export const Users: CollectionConfig = {
  slug: 'users',
  auth: {},
  access: {
    read: () => true,
    create: () => true,
  },
  admin: {
    hidden: ({ user }) => user.role !== 'admin',
  },
  fields: [
    {
      name: 'role',
      defaultValue: 'user',
      required: true,
      type: 'select',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'User', value: 'user' },
      ],
    },
  ],
};
