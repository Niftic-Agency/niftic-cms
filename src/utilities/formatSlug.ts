import type { FieldHook } from 'payload'

export const formatSlug =
  (fallback: string): FieldHook =>
  ({ data, value, operation }) => {
    if (operation === 'create' || !value) {
      const fallbackData = data?.[fallback]
      if (fallbackData && typeof fallbackData === 'string') {
        return fallbackData
          .toLowerCase()
          .replace(/ /g, '-')
          .replace(/[^\w-]+/g, '')
      }
    }
    return value
  }
