import { getPayload, Payload } from 'payload'
import config from '@/payload.config'
import { describe, it, beforeAll, expect } from 'vitest'

let payload: Payload

describe('Posts Collection', () => {
  beforeAll(async () => {
    const payloadConfig = await config
    payload = await getPayload({ config: payloadConfig })
  })

  it('creates a category', async () => {
    const uniqueName = `Technology ${Date.now()}`
    const category = await payload.create({
      collection: 'categories',
      data: {
        name: uniqueName,
        description: 'Tech posts',
      },
    })
    expect(category.slug).toBe(uniqueName.toLowerCase().replace(/ /g, '-'))
    expect(category.name).toBe(uniqueName)
  })

  it('creates multiple categories with auto-generated slugs', async () => {
    const timestamp = Date.now()
    const design = await payload.create({
      collection: 'categories',
      data: {
        name: `Design ${timestamp}`,
      },
    })

    const business = await payload.create({
      collection: 'categories',
      data: {
        name: `Business Strategy ${timestamp}`,
      },
    })

    expect(design.slug).toBe(`design-${timestamp}`)
    expect(business.slug).toBe(`business-strategy-${timestamp}`)
  })

  it('creates a post with rich text block', async () => {
    const timestamp = Date.now()
    const user = await payload.create({
      collection: 'users',
      data: {
        email: `author-${timestamp}@test.com`,
        password: 'test123456',
      },
    })

    const category = await payload.create({
      collection: 'categories',
      data: { name: `Testing ${timestamp}` },
    })

    const post = await payload.create({
      collection: 'posts',
      data: {
        title: 'My First Post',
        authors: [user.id],
        studioTag: 'product-studio',
        category: category.id,
        previewDescription: 'A great post about testing',
        publishedStatus: 'published',
        content: [
          {
            blockType: 'richText',
            content: {
              root: {
                type: 'root',
                children: [
                  {
                    type: 'paragraph',
                    version: 1,
                    children: [
                      {
                        type: 'text',
                        version: 1,
                        text: 'This is test content',
                        format: 0,
                        mode: 'normal',
                        style: '',
                        detail: 0,
                      },
                    ],
                    direction: 'ltr',
                    format: '',
                    indent: 0,
                  },
                ],
                direction: 'ltr',
                format: '',
                indent: 0,
                version: 1,
              },
            },
          },
        ],
      },
    })

    expect(post.slug).toBe('my-first-post')
    expect(post.publishedAt).toBeDefined()
    expect(post.content).toHaveLength(1)
    expect(post.content[0].blockType).toBe('richText')
  })

  it('creates a post with multiple authors', async () => {
    const timestamp = Date.now()
    const author1 = await payload.create({
      collection: 'users',
      data: {
        email: `author1-${timestamp}@test.com`,
        password: 'test123456',
      },
    })

    const author2 = await payload.create({
      collection: 'users',
      data: {
        email: `author2-${timestamp}@test.com`,
        password: 'test123456',
      },
    })

    const category = await payload.create({
      collection: 'categories',
      data: { name: `Collaboration ${timestamp}` },
    })

    const post = await payload.create({
      collection: 'posts',
      data: {
        title: 'Multi-Author Post',
        authors: [author1.id, author2.id],
        studioTag: 'brand-studio',
        category: category.id,
        previewDescription: 'A post with multiple authors',
        publishedStatus: 'draft',
        content: [
          {
            blockType: 'richText',
            content: {
              root: {
                type: 'root',
                children: [
                  {
                    type: 'paragraph',
                    version: 1,
                    children: [
                      {
                        type: 'text',
                        version: 1,
                        text: '',
                        format: 0,
                        mode: 'normal',
                        style: '',
                        detail: 0,
                      },
                    ],
                    direction: 'ltr',
                    format: '',
                    indent: 0,
                  },
                ],
                direction: 'ltr',
                format: '',
                indent: 0,
                version: 1,
              },
            },
          },
        ],
      },
    })

    expect(post.authors).toHaveLength(2)
    expect(post.studioTag).toBe('brand-studio')
  })

  it('creates a post with multiple block types', async () => {
    const timestamp = Date.now()
    const user = await payload.create({
      collection: 'users',
      data: {
        email: `blockauthor-${timestamp}@test.com`,
        password: 'test123456',
      },
    })

    const category = await payload.create({
      collection: 'categories',
      data: { name: `Mixed Content ${timestamp}` },
    })

    const post = await payload.create({
      collection: 'posts',
      data: {
        title: 'Post With Multiple Blocks',
        authors: [user.id],
        studioTag: 'product-studio',
        category: category.id,
        previewDescription: 'Testing all block types',
        publishedStatus: 'published',
        featured: true,
        content: [
          {
            blockType: 'richText',
            content: {
              root: {
                type: 'root',
                children: [
                  {
                    type: 'paragraph',
                    version: 1,
                    children: [
                      {
                        type: 'text',
                        version: 1,
                        text: '',
                        format: 0,
                        mode: 'normal',
                        style: '',
                        detail: 0,
                      },
                    ],
                    direction: 'ltr',
                    format: '',
                    indent: 0,
                  },
                ],
                direction: 'ltr',
                format: '',
                indent: 0,
                version: 1,
              },
            },
          },
          {
            blockType: 'blockquote',
            quote: 'This is a great quote',
            attribution: 'Famous Person',
            style: 'default',
          },
          {
            blockType: 'code',
            code: 'console.log("Hello World")',
            language: 'javascript',
            showLineNumbers: true,
          },
          {
            blockType: 'video',
            videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            title: 'Test Video',
          },
          {
            blockType: 'niceList',
            listTitle: 'Features',
            listStyle: 'numbered',
            items: [
              {
                title: 'Feature 1',
                description: {
                  root: {
                    type: 'root',
                    children: [
                      {
                        type: 'paragraph',
                        version: 1,
                        children: [],
                        direction: 'ltr',
                        format: '',
                        indent: 0,
                      },
                    ],
                    direction: 'ltr',
                    format: '',
                    indent: 0,
                    version: 1,
                  },
                },
              },
            ],
          },
        ],
      },
    })

    expect(post.content).toHaveLength(5)
    expect(post.featured).toBe(true)
    expect(post.content.map((block) => block.blockType)).toEqual([
      'richText',
      'blockquote',
      'code',
      'video',
      'niceList',
    ])
  })

  it('queries published posts', async () => {
    const posts = await payload.find({
      collection: 'posts',
      where: {
        publishedStatus: { equals: 'published' },
      },
    })
    expect(posts.docs.length).toBeGreaterThan(0)
  })

  it('queries posts by category', async () => {
    const uniqueName = `Query Test ${Date.now()}`
    const category = await payload.create({
      collection: 'categories',
      data: { name: uniqueName },
    })

    const user = await payload.create({
      collection: 'users',
      data: {
        email: `queryuser-${Date.now()}@test.com`,
        password: 'test123456',
      },
    })

    await payload.create({
      collection: 'posts',
      data: {
        title: 'Category Query Post',
        authors: [user.id],
        studioTag: 'product-studio',
        category: category.id,
        previewDescription: 'Testing category queries',
        publishedStatus: 'published',
        content: [
          {
            blockType: 'richText',
            content: {
              root: {
                type: 'root',
                children: [
                  {
                    type: 'paragraph',
                    version: 1,
                    children: [
                      {
                        type: 'text',
                        version: 1,
                        text: '',
                        format: 0,
                        mode: 'normal',
                        style: '',
                        detail: 0,
                      },
                    ],
                    direction: 'ltr',
                    format: '',
                    indent: 0,
                  },
                ],
                direction: 'ltr',
                format: '',
                indent: 0,
                version: 1,
              },
            },
          },
        ],
      },
    })

    const posts = await payload.find({
      collection: 'posts',
      where: {
        category: { equals: category.id },
      },
    })

    expect(posts.docs.length).toBeGreaterThan(0)
    expect(posts.docs[0].category).toBe(category.id)
  })

  it('queries featured posts', async () => {
    // Create a featured post first
    const user = await payload.create({
      collection: 'users',
      data: {
        email: `featureduser-${Date.now()}@test.com`,
        password: 'test123456',
      },
    })

    const category = await payload.create({
      collection: 'categories',
      data: { name: `Featured Category ${Date.now()}` },
    })

    await payload.create({
      collection: 'posts',
      data: {
        title: `Featured Post ${Date.now()}`,
        authors: [user.id],
        studioTag: 'product-studio',
        category: category.id,
        previewDescription: 'A featured post',
        publishedStatus: 'published',
        featured: true,
        content: [
          {
            blockType: 'richText',
            content: {
              root: {
                type: 'root',
                children: [
                  {
                    type: 'paragraph',
                    version: 1,
                    children: [
                      {
                        type: 'text',
                        version: 1,
                        text: '',
                        format: 0,
                        mode: 'normal',
                        style: '',
                        detail: 0,
                      },
                    ],
                    direction: 'ltr',
                    format: '',
                    indent: 0,
                  },
                ],
                direction: 'ltr',
                format: '',
                indent: 0,
                version: 1,
              },
            },
          },
        ],
      },
    })

    const posts = await payload.find({
      collection: 'posts',
      where: {
        featured: { equals: true },
      },
    })
    expect(posts.docs.length).toBeGreaterThan(0)
  })

  it('auto-sets publishedAt when status changes to published', async () => {
    const user = await payload.create({
      collection: 'users',
      data: {
        email: `publisheduser-${Date.now()}@test.com`,
        password: 'test123456',
      },
    })

    const category = await payload.create({
      collection: 'categories',
      data: { name: `Published Test ${Date.now()}` },
    })

    const post = await payload.create({
      collection: 'posts',
      data: {
        title: 'Draft to Published',
        authors: [user.id],
        studioTag: 'product-studio',
        category: category.id,
        previewDescription: 'Testing publish workflow',
        publishedStatus: 'draft',
        content: [
          {
            blockType: 'richText',
            content: {
              root: {
                type: 'root',
                children: [
                  {
                    type: 'paragraph',
                    version: 1,
                    children: [
                      {
                        type: 'text',
                        version: 1,
                        text: '',
                        format: 0,
                        mode: 'normal',
                        style: '',
                        detail: 0,
                      },
                    ],
                    direction: 'ltr',
                    format: '',
                    indent: 0,
                  },
                ],
                direction: 'ltr',
                format: '',
                indent: 0,
                version: 1,
              },
            },
          },
        ],
      },
    })

    expect(post.publishedAt).toBeUndefined()

    const updatedPost = await payload.update({
      collection: 'posts',
      id: post.id,
      data: {
        publishedStatus: 'published',
      },
    })

    expect(updatedPost.publishedAt).toBeDefined()
  })
})
