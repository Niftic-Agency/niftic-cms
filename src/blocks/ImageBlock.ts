import type { Block } from 'payload'

export const ImageBlock: Block = {
  slug: 'image',
  labels: {
    singular: 'Image',
    plural: 'Images',
  },
  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'caption',
      type: 'text',
    },
    {
      name: 'alt',
      type: 'text',
      required: true,
      admin: {
        description: 'Alt text for accessibility',
      },
    },
    {
      name: 'width',
      type: 'select',
      required: true,
      defaultValue: 'full',
      options: [
        { label: 'Full Width', value: 'full' },
        { label: 'Medium', value: 'medium' },
        { label: 'Small', value: 'small' },
      ],
    },
  ],
}
