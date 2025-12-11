import type { CollectionConfig } from 'payload'
import { formatSlug } from '../utilities/formatSlug'
import { RichTextBlock } from '../blocks/RichTextBlock'
import { ImageBlock } from '../blocks/ImageBlock'
import { VideoBlock } from '../blocks/VideoBlock'
import { BlockquoteBlock } from '../blocks/BlockquoteBlock'
import { CodeBlock } from '../blocks/CodeBlock'
import { InterviewBlock } from '../blocks/InterviewBlock'
import { MicroCaseStudyBlock } from '../blocks/MicroCaseStudyBlock'
import { NiceListBlock } from '../blocks/NiceListBlock'

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
    defaultSort: '-createdAt',
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
      name: 'title',
      type: 'text',
      required: true,
      maxLength: 100,
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
      name: 'authors',
      type: 'relationship',
      relationTo: 'users',
      hasMany: true,
      required: true,
      minRows: 1,
      admin: {
        description: 'Select one or more authors',
      },
    },
    {
      name: 'studioTag',
      type: 'select',
      required: true,
      options: [
        { label: 'Product Studio', value: 'product-studio' },
        { label: 'Brand Studio', value: 'brand-studio' },
      ],
      defaultValue: 'product-studio',
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      required: true,
    },
    {
      name: 'previewDescription',
      type: 'textarea',
      required: true,
      maxLength: 300,
      admin: {
        description: 'Short description for listings (max 300 chars)',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      index: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'publishedStatus',
      type: 'select',
      required: true,
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
      defaultValue: 'draft',
      index: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
      hooks: {
        beforeChange: [
          ({ siblingData, value }) => {
            if (siblingData.publishedStatus === 'published' && !value) {
              return new Date().toISOString()
            }
            return value
          },
        ],
      },
    },
    {
      name: 'content',
      type: 'blocks',
      required: true,
      minRows: 1,
      blocks: [
        RichTextBlock,
        ImageBlock,
        VideoBlock,
        BlockquoteBlock,
        CodeBlock,
        InterviewBlock,
        MicroCaseStudyBlock,
        NiceListBlock,
      ],
    },
  ],
}
