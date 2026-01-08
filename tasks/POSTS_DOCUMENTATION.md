# Posts Collection Documentation

## Overview

The Posts collection is a flexible content management system built for PayloadCMS 3.x running on Cloudflare Workers. It enables creation of blog posts, articles, and other content pieces with a modular block-based content system that can be queried via REST API for use in a SvelteKit frontend application.

### Key Features

- **Flexible Content Blocks**: 8 different block types for rich content composition
- **Multiple Authors**: Support for multiple co-authors per post
- **Category Taxonomy**: Organized content categorization system
- **Draft/Published Workflow**: Manage content publication status
- **Featured Posts**: Flag important posts for homepage display
- **Studio Tags**: Differentiate between Product Studio and Brand Studio content
- **Auto-Generated Slugs**: URL-friendly identifiers created automatically
- **Full REST API**: Complete CRUD operations via Payload's REST API

---

## Architecture

### Collections

#### 1. Categories Collection

**Purpose**: Taxonomy system for organizing posts by topic/theme

**Slug**: `categories`

**Fields**:
- `name` (text, required, unique): Display name of the category
- `slug` (text, required, unique, indexed): Auto-generated URL-friendly identifier
- `description` (textarea, optional): Description for SEO and display purposes
- `color` (text, optional): Hex color code for UI theming (e.g., #FF6B6B)

**Auto-Generated Fields**:
- `id`: Integer primary key
- `createdAt`: ISO timestamp
- `updatedAt`: ISO timestamp

**Access Control**:
- Public read access (for frontend queries)
- Authenticated users can create/update/delete

**Example REST API**:
```
GET /api/categories
GET /api/categories/{id}
POST /api/categories (requires auth)
PATCH /api/categories/{id} (requires auth)
DELETE /api/categories/{id} (requires auth)
```

#### 2. Posts Collection

**Purpose**: Main content collection for blog posts and articles

**Slug**: `posts`

**Metadata Fields**:
- `title` (text, required, max 100 chars): Post title
- `slug` (text, required, unique, indexed): Auto-generated from title
- `authors` (relationship, hasMany, required): One or more users as authors
- `studioTag` (select, required): "product-studio" or "brand-studio"
- `category` (relationship, hasMany, required): One or more category assignments
- `previewDescription` (textarea, required, max 300 chars): Preview text for listings
- `featured` (checkbox, indexed): Feature this post on homepage
- `publishedStatus` (select, required, indexed): "draft" or "published"
- `publishedAt` (date, auto-set): Timestamp when status changed to published
- `content` (blocks, required): Flexible content blocks

**Auto-Generated Fields**:
- `id`: Integer primary key
- `createdAt`: ISO timestamp
- `updatedAt`: ISO timestamp

**Access Control**:
- Public read access (all posts visible, filter by publishedStatus in queries)
- Authenticated users can create/update/delete

**Versioning**:
- Drafts enabled for content workflow
- Version history tracking

---

## Content Blocks

The Posts collection uses Payload's blocks field to enable flexible content composition. Content creators can mix and match the following 8 block types:

### 1. Rich Text Block

**Purpose**: Standard formatted text content with Lexical editor

**Block Type**: `richText`

**Fields**:
- `content` (richText, required): Lexical JSON format

**Use Case**: Primary text content, paragraphs, headings, lists, links

**Example Block**:
```json
{
  "blockType": "richText",
  "content": {
    "root": {
      "type": "root",
      "children": [
        {
          "type": "paragraph",
          "children": [
            {
              "type": "text",
              "text": "This is a paragraph of text"
            }
          ]
        }
      ]
    }
  }
}
```

### 2. Image Block

**Purpose**: Embedded images with captions and sizing options

**Block Type**: `image`

**Fields**:
- `image` (upload, required): Relationship to media collection
- `caption` (text, optional): Caption displayed below image
- `alt` (text, required): Alt text for accessibility (SEO important)
- `width` (select, required): Display width - "full", "medium", or "small"

**Use Case**: Article imagery, screenshots, diagrams

**Note**: Crop and focal point features disabled (Cloudflare Workers limitation)

### 3. Video Block

**Purpose**: Embedded videos from YouTube or Vimeo

**Block Type**: `video`

**Fields**:
- `videoUrl` (text, required): Full YouTube or Vimeo URL (validated)
- `title` (text, optional): Video title
- `caption` (textarea, optional): Description or context

**Validation**: URL must match YouTube or Vimeo patterns

**Use Case**: Tutorial videos, product demos, interviews

**Frontend Implementation**: Parse URL to extract video ID for embedding

### 4. Blockquote Block

**Purpose**: Highlighted quotes or pull quotes

**Block Type**: `blockquote`

**Fields**:
- `quote` (textarea, required): The quoted text
- `attribution` (text, optional): Source/author of quote
- `style` (select): "default", "pullquote", or "testimonial"

**Use Case**: Customer testimonials, expert quotes, key takeaways

### 5. Code Block

**Purpose**: Syntax-highlighted code snippets

**Block Type**: `code`

**Fields**:
- `code` (code, required): The code content
- `language` (select, required): JavaScript, TypeScript, Python, HTML, CSS, JSON, Bash, SQL
- `caption` (text, optional): Filename or description
- `showLineNumbers` (checkbox, default true): Display line numbers

**Use Case**: Technical tutorials, API examples, configuration samples

### 6. Interview Block

**Purpose**: Q&A formatted content

**Block Type**: `interview`

**Fields**:
- `introduction` (richText, optional): Intro text before Q&A
- `qaItems` (array, required, minRows: 1): Array of Q&A pairs
  - `question` (textarea, required): The question asked
  - `questioner` (text, optional): Who asked (e.g., "Interviewer")
  - `answer` (richText, required): The answer provided
  - `answerer` (text, optional): Who answered (e.g., interviewee name)

**Use Case**: Expert interviews, customer stories, team Q&As

### 7. Micro Case Study Block

**Purpose**: Compact project/work references without derailing narrative

**Block Type**: `microCaseStudy`

**Fields**:
- `projectName` (text, required): Name of the project
- `client` (text, required): Client name
- `description` (textarea, required, max 200 chars): Brief description
- `link` (text, optional): URL to full case study or project page
- `thumbnail` (upload, required): Project thumbnail image
- `tags` (array, optional, maxRows: 5): Array of tag strings

**Use Case**: Cross-reference portfolio work, related projects

### 8. Nice List Block

**Purpose**: Rich list items with titles, descriptions, and optional icons

**Block Type**: `niceList`

**Fields**:
- `listTitle` (text, optional): Optional title for the entire list
- `listStyle` (select, required): "numbered", "bulleted", or "checklist"
- `items` (array, required, minRows: 1): Array of list items
  - `title` (text, required): Item heading
  - `description` (richText, optional): Rich text description
  - `icon` (upload, optional): Icon or image for the item

**Use Case**: Feature lists, step-by-step guides, comparison lists

**Row Label**: Displays item title in admin UI for easy identification

---

## REST API Usage

### Base URL
```
Production: https://your-domain.com/api
Development: http://localhost:3000/api
```

### Authentication

All write operations (POST, PATCH, DELETE) require authentication. Use Payload's built-in auth:

```javascript
// Login
POST /api/users/login
Body: { "email": "user@example.com", "password": "password" }
Response: { "token": "jwt-token", "user": {...} }

// Use token in subsequent requests
Headers: { "Authorization": "Bearer jwt-token" }
```

### Query Parameters

Payload provides powerful query capabilities:

**Pagination**:
- `limit`: Number of results per page (default: 10)
- `page`: Page number (starts at 1)

**Sorting**:
- `sort`: Field name (prefix with `-` for descending, e.g., `-createdAt`)

**Filtering** (where clause):
- `where[field][operator]=value`
- Operators: `equals`, `not_equals`, `greater_than`, `less_than`, `like`, `contains`, `in`, `not_in`, `exists`

**Depth** (populate relationships):
- `depth`: 0-10 (how many levels deep to populate relationships)

### Example Queries

#### List Published Posts (Most Common)

```javascript
// SvelteKit fetch example
const response = await fetch(
  'https://your-domain.com/api/posts?' + new URLSearchParams({
    'where[publishedStatus][equals]': 'published',
    'sort': '-publishedAt',
    'limit': '10',
    'page': '1',
    'depth': '2'
  })
)
const data = await response.json()
```

**Response Structure**:
```json
{
  "docs": [
    {
      "id": 1,
      "title": "My First Post",
      "slug": "my-first-post",
      "authors": [
        {
          "id": 1,
          "email": "author@example.com"
        }
      ],
      "studioTag": "product-studio",
      "category": {
        "id": 1,
        "name": "Technology",
        "slug": "technology",
        "color": "#4A90E2"
      },
      "previewDescription": "This is a preview of my post...",
      "featured": false,
      "publishedStatus": "published",
      "publishedAt": "2025-12-10T12:00:00.000Z",
      "content": [
        {
          "blockType": "richText",
          "id": "abc123",
          "content": { /* Lexical JSON */ }
        },
        {
          "blockType": "image",
          "id": "def456",
          "image": {
            "id": 5,
            "url": "https://your-r2-bucket.com/image.jpg",
            "alt": "Alt text",
            "filename": "image.jpg",
            "mimeType": "image/jpeg",
            "filesize": 125000,
            "width": 1200,
            "height": 800
          },
          "caption": "An inspiring image",
          "alt": "Descriptive alt text",
          "width": "full"
        }
      ],
      "createdAt": "2025-12-10T10:00:00.000Z",
      "updatedAt": "2025-12-10T12:00:00.000Z"
    }
  ],
  "totalDocs": 42,
  "limit": 10,
  "totalPages": 5,
  "page": 1,
  "pagingCounter": 1,
  "hasPrevPage": false,
  "hasNextPage": true,
  "prevPage": null,
  "nextPage": 2
}
```

#### Get Single Post by Slug

```javascript
const response = await fetch(
  'https://your-domain.com/api/posts?' + new URLSearchParams({
    'where[slug][equals]': 'my-first-post',
    'depth': '2'
  })
)
const data = await response.json()
const post = data.docs[0] // First result
```

#### Get Featured Posts

```javascript
const response = await fetch(
  'https://your-domain.com/api/posts?' + new URLSearchParams({
    'where[featured][equals]': 'true',
    'where[publishedStatus][equals]': 'published',
    'limit': '3',
    'depth': '2'
  })
)
```

#### Filter by Category

```javascript
const response = await fetch(
  'https://your-domain.com/api/posts?' + new URLSearchParams({
    'where[category][equals]': '1', // Category ID
    'where[publishedStatus][equals]': 'published',
    'depth': '2'
  })
)
```

#### Filter by Studio Tag

```javascript
const response = await fetch(
  'https://your-domain.com/api/posts?' + new URLSearchParams({
    'where[studioTag][equals]': 'product-studio',
    'where[publishedStatus][equals]': 'published'
  })
)
```

#### Get All Categories

```javascript
const response = await fetch('https://your-domain.com/api/categories')
const data = await response.json()
```

### Creating Posts (Authenticated)

```javascript
const response = await fetch('https://your-domain.com/api/posts', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer your-jwt-token'
  },
  body: JSON.stringify({
    title: 'New Post Title',
    authors: [1, 2], // Array of user IDs
    studioTag: 'product-studio',
    category: 1, // Category ID
    previewDescription: 'A great new post about...',
    publishedStatus: 'draft',
    featured: false,
    content: [
      {
        blockType: 'richText',
        content: {
          root: {
            type: 'root',
            children: [
              {
                type: 'paragraph',
                children: [
                  { type: 'text', text: 'Post content here' }
                ]
              }
            ]
          }
        }
      }
    ]
  })
})
```

---

## Frontend Integration (SvelteKit)

### Rendering Content Blocks

Each block type needs a corresponding Svelte component:

```svelte
<!-- src/lib/components/blocks/BlockRenderer.svelte -->
<script lang="ts">
  import RichTextBlock from './RichTextBlock.svelte'
  import ImageBlock from './ImageBlock.svelte'
  import VideoBlock from './VideoBlock.svelte'
  import BlockquoteBlock from './BlockquoteBlock.svelte'
  import CodeBlock from './CodeBlock.svelte'
  import InterviewBlock from './InterviewBlock.svelte'
  import MicroCaseStudyBlock from './MicroCaseStudyBlock.svelte'
  import NiceListBlock from './NiceListBlock.svelte'

  export let blocks: any[]
</script>

{#each blocks as block (block.id)}
  {#if block.blockType === 'richText'}
    <RichTextBlock {block} />
  {:else if block.blockType === 'image'}
    <ImageBlock {block} />
  {:else if block.blockType === 'video'}
    <VideoBlock {block} />
  {:else if block.blockType === 'blockquote'}
    <BlockquoteBlock {block} />
  {:else if block.blockType === 'code'}
    <CodeBlock {block} />
  {:else if block.blockType === 'interview'}
    <InterviewBlock {block} />
  {:else if block.blockType === 'microCaseStudy'}
    <MicroCaseStudyBlock {block} />
  {:else if block.blockType === 'niceList'}
    <NiceListBlock {block} />
  {/if}
{/each}
```

### Example Block Components

**RichTextBlock.svelte**: Use `@payloadcms/richtext-lexical` package or build custom renderer

**VideoBlock.svelte**:
```svelte
<script lang="ts">
  export let block: any

  function getYouTubeId(url: string): string | null {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/)
    return match ? match[1] : null
  }

  function getVimeoId(url: string): string | null {
    const match = url.match(/vimeo\.com\/(\d+)/)
    return match ? match[1] : null
  }

  $: videoId = getYouTubeId(block.videoUrl) || getVimeoId(block.videoUrl)
  $: isYouTube = block.videoUrl.includes('youtube') || block.videoUrl.includes('youtu.be')
</script>

<div class="video-block">
  {#if block.title}
    <h3>{block.title}</h3>
  {/if}

  <div class="video-wrapper">
    {#if isYouTube}
      <iframe
        src="https://www.youtube.com/embed/{videoId}"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    {:else}
      <iframe
        src="https://player.vimeo.com/video/{videoId}"
        frameborder="0"
        allow="autoplay; fullscreen; picture-in-picture"
        allowfullscreen
      ></iframe>
    {/if}
  </div>

  {#if block.caption}
    <p class="caption">{block.caption}</p>
  {/if}
</div>
```

### SEO Implementation

```svelte
<!-- +page.svelte for single post -->
<script lang="ts">
  import { page } from '$app/stores'

  export let data // Post data from load function

  $: post = data.post
</script>

<svelte:head>
  <title>{post.title} | Your Site Name</title>
  <meta name="description" content={post.previewDescription} />

  <!-- Open Graph -->
  <meta property="og:title" content={post.title} />
  <meta property="og:description" content={post.previewDescription} />
  <meta property="og:type" content="article" />
  <meta property="og:url" content={$page.url.href} />
  <meta property="article:published_time" content={post.publishedAt} />
  <meta property="article:author" content={post.authors[0].email} />

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={post.title} />
  <meta name="twitter:description" content={post.previewDescription} />
</svelte:head>

<!-- Structured Data (JSON-LD) -->
<script type="application/ld+json">
{JSON.stringify({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": post.title,
  "description": post.previewDescription,
  "author": post.authors.map(a => ({ "@type": "Person", "name": a.email })),
  "datePublished": post.publishedAt,
  "dateModified": post.updatedAt
})}
</script>
```

---

## Workflow & Best Practices

### Content Creation Workflow

1. **Draft Creation**:
   - Author creates post in admin at `/admin/collections/posts`
   - Status defaults to "draft"
   - `publishedAt` remains null

2. **Content Composition**:
   - Add blocks in desired order
   - Mix content types for rich, engaging posts
   - Use blockquotes for key takeaways
   - Add micro case studies to reference work without derailing

3. **Review**:
   - Multiple authors can be assigned for collaboration
   - Use draft status for internal review

4. **Publication**:
   - Change status to "published"
   - `publishedAt` automatically set to current timestamp
   - Post now visible in public API queries

5. **Featured Content**:
   - Check "featured" for homepage display
   - Limit to 3-5 featured posts at a time

### SEO Best Practices

1. **Titles**: Keep under 60 characters for search results
2. **Preview Descriptions**: 150-300 characters, front-load keywords
3. **Slugs**: Auto-generated, but can be customized for SEO
4. **Alt Text**: Always provide descriptive alt text for images
5. **Categories**: Use consistent, SEO-friendly category names
6. **Internal Linking**: Use micro case studies to link related content

### Performance Recommendations

1. **Pagination**: Always paginate post lists (10-20 posts per page)
2. **Depth Parameter**:
   - Use `depth=1` for listing pages (faster)
   - Use `depth=2` for single post pages (includes all relationships)
3. **Caching**: Cache category lists (rarely change)
4. **Image Optimization**: Use responsive images in frontend
5. **Indexes**: Slug, publishedStatus, and featured are indexed for fast queries

---

## Database Schema

### Categories Table

```sql
CREATE TABLE categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  color TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE INDEX idx_categories_slug ON categories(slug);
```

### Posts Table (Simplified)

```sql
CREATE TABLE posts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  studio_tag TEXT NOT NULL,
  category_id INTEGER NOT NULL,
  preview_description TEXT NOT NULL,
  featured INTEGER DEFAULT 0,
  published_status TEXT NOT NULL,
  published_at TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY (category_id) REFERENCES categories(id)
);

CREATE INDEX idx_posts_slug ON posts(slug);
CREATE INDEX idx_posts_published_status ON posts(published_status);
CREATE INDEX idx_posts_featured ON posts(featured);
```

**Note**: Actual schema includes additional tables for blocks, relationships, and versioning

---

## Troubleshooting

### Common Issues

**Issue**: Draft posts appearing in public queries

**Solution**: Always filter by `publishedStatus=published`:
```javascript
where[publishedStatus][equals]=published
```

---

**Issue**: Relationships not populated

**Solution**: Increase depth parameter:
```javascript
depth=2
```

---

**Issue**: Slug conflicts on creation

**Solution**: Slugs must be unique. Check existing slugs or customize manually

---

**Issue**: Lexical content not rendering

**Solution**: Use proper Lexical renderer or build custom based on spec. Each text node needs `type`, `text`, `format`, `mode`, `style`, `detail` properties.

---

**Issue**: Images not loading

**Solution**: Ensure R2 bucket has public read access and CORS configured

---

## Maintenance

### Type Regeneration

After schema changes:
```bash
pnpm generate:types
```

### Database Migrations

Creating new migration:
```bash
pnpm payload migrate:create
```

Applying migrations:
```bash
pnpm dev # Local
pnpm deploy:database # Production
```

### Backup Strategy

1. **Database**: Regular D1 backups via Cloudflare dashboard
2. **Media**: R2 bucket versioning enabled
3. **Content Export**: Use Payload's export functionality

---

## File Locations

```
src/
├── blocks/
│   ├── RichTextBlock.ts
│   ├── ImageBlock.ts
│   ├── VideoBlock.ts
│   ├── BlockquoteBlock.ts
│   ├── CodeBlock.ts
│   ├── InterviewBlock.ts
│   ├── MicroCaseStudyBlock.ts
│   └── NiceListBlock.ts
├── collections/
│   ├── Categories.ts
│   └── Posts.ts
├── utilities/
│   └── formatSlug.ts
├── migrations/
│   └── 20251210_164823.ts
└── payload-types.ts (auto-generated)

tests/int/
└── posts.int.spec.ts
```

---

## Future Enhancements

### Short-term
- SEO meta fields (meta title, meta description, OG image)
- Tags collection for additional taxonomy
- Related posts field
- Reading time calculation

### Medium-term
- Scheduled publishing (using Worker cron triggers)
- Content revisions UI
- Search functionality (Cloudflare Workers AI)
- Analytics integration (view counts, engagement)

### Long-term
- Multi-language support (i18n)
- Advanced media management
- Content templates
- Editorial workflow (approval stages)

---

## Support & Resources

- **Payload CMS Docs**: https://payloadcms.com/docs
- **Lexical Editor**: https://lexical.dev/
- **Cloudflare D1**: https://developers.cloudflare.com/d1/
- **Cloudflare R2**: https://developers.cloudflare.com/r2/
- **Project CLAUDE.md**: See root directory for architecture details

---

## Implementation Checklist

✅ Categories collection created with auto-slug generation
✅ Posts collection with 8 flexible block types
✅ Multiple authors support (hasMany relationship)
✅ Draft/Published workflow with auto-timestamp
✅ Featured posts flagging
✅ Studio tag differentiation
✅ Auto-generated slugs from titles
✅ Public REST API access
✅ Integration tests covering core functionality
✅ Type safety with generated TypeScript types
✅ Database migrations created and ready
✅ Cloudflare Workers compatibility verified

---

**Last Updated**: December 10, 2025
**Payload Version**: 3.63.0
**Database**: Cloudflare D1 (SQLite)
**Storage**: Cloudflare R2
