Create a Posts collection that will be used for flexible blog posts, articles, etc. These will be queried using the Rest API from a Sveltekit app. In Payload a user should be able to go in and create a post - mixing and matching the below fields. Use existing fields where it makes sense and create new ones where applicable. On the Sveltekit side the content will be queried and then rendered based on the different field types.


Metadata:

- Title
- Slug
- Author (single or multi?) - connect to users
- Studio Tag (Product Studio or Brand Studio)
- Category
- Preview Description
- Featured (true false)
- Published

Fields: (Payload fields docs https://payloadcms.com/docs/fields/overview)

- Rich Text
- Image (with caption option)
- Video (youtube or vimeo link)
- Blockquote
- Code Block
- Interview  (Q & A)
- Micro case study - something small that lets us cross-reference to a case study without a big feature. Could be just: Project Name / Client / One line description / Link / Thumbnail. Something to link out to the work without derailing the narrative.
- A nice list


Payload Collections Docs (https://payloadcms.com/docs/configuration/collections)