import type { CollectionConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { formatSlug } from '../utilities/formatSlug'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  access: {
    read: () => true,
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      admin: {
        description: 'Full name of the user',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        position: 'sidebar',
      },
      hooks: {
        beforeValidate: [formatSlug('name')],
      },
    },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Main photo of the user',
      },
    },
    {
      name: 'photoAvatar',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Avatar/small photo of the user',
      },
    },
    {
      name: 'bio',
      type: 'textarea',
      admin: {
        description: 'Biography or description of the user',
      },
    },
    {
      name: 'public',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Whether this user profile should be publicly visible',
      },
    },
    {
      name: 'qa',
      type: 'array',
      label: 'Q&A',
      admin: {
        description: 'Questions and answers for this user',
      },
      fields: [
        {
          name: 'question',
          type: 'textarea',
        },
        {
          name: 'answer',
          type: 'richText',
          editor: lexicalEditor(),
        },
      ],
    },
  ],
}
