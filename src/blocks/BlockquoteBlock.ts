import type { Block } from 'payload'

export const BlockquoteBlock: Block = {
  slug: 'blockquote',
  labels: {
    singular: 'Blockquote',
    plural: 'Blockquotes',
  },
  fields: [
    {
      name: 'quote',
      type: 'textarea',
      required: true,
    },
    {
      name: 'attribution',
      type: 'text',
      admin: {
        placeholder: 'John Doe, CEO of Acme Inc.',
      },
    },
    {
      name: 'style',
      type: 'select',
      defaultValue: 'default',
      options: [
        { label: 'Default', value: 'default' },
        { label: 'Pull Quote', value: 'pullquote' },
        { label: 'Testimonial', value: 'testimonial' },
      ],
    },
  ],
}
