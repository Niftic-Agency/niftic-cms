import type { Block } from 'payload'

export const WorkMediaBlock: Block = {
  slug: 'workMedia',
  labels: {
    singular: 'Work Media',
    plural: 'Work Media Blocks',
  },
  fields: [
    {
      name: 'type',
      type: 'select',
      required: true,
      defaultValue: 'image',
      options: [
        { label: 'Image', value: 'image' },
        { label: 'Text', value: 'text' },
        { label: 'Vector', value: 'vector' },
        { label: 'Quote', value: 'quote' },
        { label: 'Video', value: 'video' },
        { label: 'Local Video', value: 'local video' },
        { label: 'Slideshow', value: 'slideshow' },
      ],
    },
    {
      type: 'collapsible',
      label: 'Column Layout',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'Column Span XS',
              type: 'number',
              required: true,
              defaultValue: 1,
              min: 1,
              max: 12,
              admin: {
                description: 'Column span on extra small screens',
              },
            },
            {
              name: 'Column Span LG',
              type: 'number',
              required: true,
              defaultValue: 12,
              min: 1,
              max: 12,
              admin: {
                description: 'Column span on large screens',
              },
            },
          ],
        },
      ],
    },
    // Image fields
    {
      name: 'src',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        condition: (data, siblingData) => siblingData?.type === 'image',
      },
    },
    // Vector/SVG fields
    {
      name: 'SVGFile',
      type: 'upload',
      relationTo: 'media',
      admin: {
        condition: (data, siblingData) => siblingData?.type === 'vector',
        description: 'SVG file upload',
      },
    },
    {
      name: 'backgroundColor',
      type: 'text',
      defaultValue: '#023257',
      admin: {
        condition: (data, siblingData) =>
          siblingData?.type === 'vector' || siblingData?.type === 'local video',
        description: 'Background color (hex code)',
      },
    },
    // Text fields
    {
      name: 'content',
      type: 'textarea',
      admin: {
        condition: (data, siblingData) =>
          siblingData?.type === 'text' || siblingData?.type === 'quote',
      },
    },
    {
      name: 'layout',
      type: 'select',
      defaultValue: 'default',
      options: [{ label: 'Default', value: 'default' }],
      admin: {
        condition: (data, siblingData) => siblingData?.type === 'text',
      },
    },
    // Quote fields
    {
      name: 'author',
      type: 'text',
      admin: {
        condition: (data, siblingData) => siblingData?.type === 'quote',
      },
    },
    {
      name: 'alignment',
      type: 'select',
      defaultValue: 'left',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Center', value: 'center' },
        { label: 'Right', value: 'right' },
      ],
      admin: {
        condition: (data, siblingData) => siblingData?.type === 'quote',
      },
    },
    // Video fields
    {
      name: 'videoID',
      type: 'text',
      admin: {
        condition: (data, siblingData) => siblingData?.type === 'video',
        description: 'YouTube or Vimeo video ID',
      },
    },
    // Local Video fields
    {
      name: 'centerCrop',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        condition: (data, siblingData) => siblingData?.type === 'local video',
      },
    },
    // Slideshow fields
    {
      name: 'srcs',
      type: 'array',
      admin: {
        condition: (data, siblingData) => siblingData?.type === 'slideshow',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    // Aspect ratio (shared by image, vector, local video, slideshow)
    {
      name: 'aspectRatio',
      type: 'text',
      defaultValue: '16/9',
      admin: {
        condition: (data, siblingData) =>
          siblingData?.type === 'image' ||
          siblingData?.type === 'vector' ||
          siblingData?.type === 'local video' ||
          siblingData?.type === 'slideshow',
        description: 'Aspect ratio (e.g., 16/9, 4/3, 1/1)',
      },
    },
    // Caption fields (shared across all types)
    {
      name: 'caption',
      type: 'textarea',
    },
    {
      name: 'captionTitle',
      type: 'text',
      admin: {
        description: 'Optional title for the caption',
      },
    },
  ],
}
