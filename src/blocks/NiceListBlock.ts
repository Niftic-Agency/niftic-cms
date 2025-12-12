import type { Block } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

export const NiceListBlock: Block = {
  slug: 'niceList',
  labels: {
    singular: 'Nice List',
    plural: 'Nice Lists',
  },
  fields: [
    {
      name: 'listTitle',
      type: 'text',
    },
    {
      name: 'listStyle',
      type: 'select',
      required: true,
      defaultValue: 'numbered',
      options: [
        { label: 'Numbered', value: 'numbered' },
        { label: 'Bulleted', value: 'bulleted' },
        { label: 'Checklist', value: 'checklist' },
      ],
    },
    {
      name: 'items',
      type: 'array',
      required: true,
      minRows: 1,
      labels: {
        singular: 'Item',
        plural: 'Items',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'richText',
          editor: lexicalEditor(),
        },
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
  ],
}
