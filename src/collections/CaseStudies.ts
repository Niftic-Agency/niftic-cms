import type { CollectionConfig } from 'payload'
import { formatSlug } from '../utilities/formatSlug'
import { WorkMediaBlock } from '../blocks/WorkMedia'
import { WorkMockupBlock } from '../blocks/WorkMockup'
import { WorkSpacerBlock } from '../blocks/WorkSpacer'

export const CaseStudies: CollectionConfig = {
  slug: 'case-studies',
  labels: {
    singular: 'Case Study',
    plural: 'Case Studies',
  },
  admin: {
    useAsTitle: 'title',
  },
  versions: {
    drafts: true,
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  fields: [
    {
      name: 'client',
      type: 'text',
      required: true,
      maxLength: 100,
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      maxLength: 100,
    },
    {
      name: 'tileType',
      type: 'select',
      required: true,
      options: [
        { label: 'Image', value: 'image' },
        { label: 'Vimeo', value: 'vimeo' },
      ],
      defaultValue: 'image',
    },
    {
      name: 'vimeoId',
      type: 'text',
      required: true,
      admin: {
        condition: (data, siblingData) => siblingData?.tileType === 'vimeo',
      },
      validate: (value: string) => {
        const vimeoRegex = /^(https?:\/\/)?(www\.)?vimeo\.com\/.+$/
        if (!vimeoRegex.test(value)) {
          return 'Please enter a valid Vimeo URL'
        }
        return true
      },
    },
    {
      name: 'tileImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        condition: (data, siblingData) => siblingData?.tileType === 'image',
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
        beforeValidate: [formatSlug('title')],
      },
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      required: true,
      hasMany: true,
      minRows: 1,
      admin: {
        position: 'sidebar',
        description: 'Select one or more categories',
      },
    },
    {
      name: 'tags',
      type: 'relationship',
      relationTo: 'tags',
      hasMany: true,
      required: true,
      minRows: 1,
      admin: {
        position: 'sidebar',
        description: 'Select one or more tags',
      },
    },
    {
      name: 'textContent',
      type: 'richText',
      required: true,
    },
    {
      name: 'media',
      type: 'blocks',
      required: true,
      minRows: 1,
      blocks: [WorkMediaBlock, WorkMockupBlock, WorkSpacerBlock],
    },
  ],
}
