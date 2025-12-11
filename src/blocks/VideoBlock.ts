import type { Block } from 'payload'

export const VideoBlock: Block = {
  slug: 'video',
  labels: {
    singular: 'Video',
    plural: 'Videos',
  },
  fields: [
    {
      name: 'videoUrl',
      type: 'text',
      required: true,
      admin: {
        description: 'YouTube or Vimeo URL',
        placeholder: 'https://www.youtube.com/watch?v=...',
      },
      validate: (value: string) => {
        const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/
        const vimeoRegex = /^(https?:\/\/)?(www\.)?vimeo\.com\/.+$/
        if (!youtubeRegex.test(value) && !vimeoRegex.test(value)) {
          return 'Please enter a valid YouTube or Vimeo URL'
        }
        return true
      },
    },
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'caption',
      type: 'textarea',
    },
  ],
}
