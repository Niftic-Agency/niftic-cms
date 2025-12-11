import type { Block } from 'payload'

export const MicroCaseStudyBlock: Block = {
  slug: 'microCaseStudy',
  labels: {
    singular: 'Micro Case Study',
    plural: 'Micro Case Studies',
  },
  fields: [
    {
      name: 'projectName',
      type: 'text',
      required: true,
    },
    {
      name: 'client',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      maxLength: 200,
    },
    {
      name: 'link',
      type: 'text',
      admin: {
        placeholder: 'https://example.com/case-study',
      },
    },
    {
      name: 'thumbnail',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'tags',
      type: 'array',
      maxRows: 5,
      fields: [
        {
          name: 'tag',
          type: 'text',
        },
      ],
    },
  ],
}
