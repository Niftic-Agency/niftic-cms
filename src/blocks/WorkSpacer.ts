import type { Block } from 'payload'

export const WorkSpacerBlock: Block = {
  slug: 'workSpacer',
  labels: {
    singular: 'Work Spacer',
    plural: 'Work Spacer Blocks',
  },
  fields: [
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
}
