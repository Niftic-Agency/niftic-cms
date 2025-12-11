import type { Block } from 'payload'

export const CodeBlock: Block = {
  slug: 'code',
  labels: {
    singular: 'Code Block',
    plural: 'Code Blocks',
  },
  fields: [
    {
      name: 'code',
      type: 'code',
      required: true,
      admin: {
        language: 'javascript',
      },
    },
    {
      name: 'language',
      type: 'select',
      required: true,
      defaultValue: 'javascript',
      options: [
        { label: 'JavaScript', value: 'javascript' },
        { label: 'TypeScript', value: 'typescript' },
        { label: 'Python', value: 'python' },
        { label: 'HTML', value: 'html' },
        { label: 'CSS', value: 'css' },
        { label: 'JSON', value: 'json' },
        { label: 'Bash', value: 'bash' },
        { label: 'SQL', value: 'sql' },
      ],
    },
    {
      name: 'caption',
      type: 'text',
      admin: {
        placeholder: 'example.js',
      },
    },
    {
      name: 'showLineNumbers',
      type: 'checkbox',
      defaultValue: true,
    },
  ],
}
