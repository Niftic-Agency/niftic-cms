import type { Block } from 'payload'

export const WorkMockupBlock: Block = {
  slug: 'workMockup',
  labels: {
    singular: 'Work Mockup',
    plural: 'Work Mockups',
  },
  fields: [
    {
      name: 'type',
      type: 'select',
      required: true,
      defaultValue: 'image',
      options: [
        { label: 'Image', value: 'image' },
        { label: 'Images (paired/multiple)', value: 'images' },
      ],
      admin: {
        description:
          'Single image or multiple images. Use "images" for desktop-mobile pair or multiple.',
      },
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
    {
      name: 'screenType',
      type: 'select',
      required: true,
      options: [
        { label: 'Desktop', value: 'desktop' },
        { label: 'Desktop + Mobile (paired)', value: 'desktop-mobile' },
        { label: 'Mobile', value: 'mobile' },
        { label: 'Mobile Stacked (3 images)', value: 'mobile-stacked' },
      ],
      defaultValue: 'desktop',
      admin: {
        description: "'desktop', 'desktop-mobile', 'mobile', or 'mobile-stacked'",
      },
    },
    {
      name: 'captionTitle',
      type: 'text',
      admin: {
        description: 'Bolded caption title (optional)',
      },
    },
    {
      name: 'caption',
      type: 'textarea',
      admin: {
        description: 'Caption text below the mockup image (optional)',
      },
    },
    {
      name: 'backgroundColor',
      type: 'text',
      defaultValue: '#023257',
      admin: {
        description: 'Background color (CSS, e.g. #023257 or rgb(0,0,0))',
      },
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Background image shown inside the mockup (optional)',
      },
    },
    {
      name: 'aspectRatio',
      type: 'text',
      defaultValue: '16/9',
      admin: {
        description: 'CSS aspect-ratio (e.g. 16/9, 1/1, 4/3, etc)',
      },
    },
    {
      name: 'scrolling',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Enable animation (scrolling content inside mockup)',
      },
    },
    // Image fields
    {
      name: 'src',
      type: 'upload',
      relationTo: 'media',
      required: false,
      admin: {
        description:
          'Main image (required if type is "image" and screenType is not multiple). Use for single image.',
        condition: (data, siblingData) => siblingData?.type === 'image',
      },
    },
    {
      name: 'srcs',
      type: 'array',
      required: false,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
      admin: {
        description:
          'Multiple images (required if type is "images" or screenType is "desktop-mobile", "mobile-stacked"). For desktop-mobile, provide 2 images (desktop, mobile). For mobile-stacked, provide 3 images (stacked).',
        condition: (data, siblingData) =>
          siblingData?.type === 'images' ||
          siblingData?.screenType === 'desktop-mobile' ||
          siblingData?.screenType === 'mobile-stacked',
      },
    },
  ],
}
