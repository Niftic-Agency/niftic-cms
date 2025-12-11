import type { Block } from 'payload'

export const InterviewBlock: Block = {
  slug: 'interview',
  labels: {
    singular: 'Interview',
    plural: 'Interviews',
  },
  fields: [
    {
      name: 'introduction',
      type: 'richText',
    },
    {
      name: 'qaItems',
      type: 'array',
      required: true,
      minRows: 1,
      labels: {
        singular: 'Q&A',
        plural: 'Q&A Items',
      },
      fields: [
        {
          name: 'question',
          type: 'textarea',
          required: true,
        },
        {
          name: 'questioner',
          type: 'text',
          admin: {
            placeholder: 'Interviewer',
          },
        },
        {
          name: 'answer',
          type: 'richText',
          required: true,
        },
        {
          name: 'answerer',
          type: 'text',
          admin: {
            placeholder: 'Interviewee Name',
          },
        },
      ],
    },
  ],
}
