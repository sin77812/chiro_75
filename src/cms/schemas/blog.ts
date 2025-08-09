import { defineType, defineField } from 'sanity'

export const authorSchema = defineType({
  name: 'author',
  title: 'Authors',
  type: 'document',
  icon: () => '👤',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: rule => rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: rule => rule.required()
    }),
    defineField({
      name: 'role',
      title: 'Role/Title',
      type: 'string',
      validation: rule => rule.required()
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'text',
      rows: 4,
      validation: rule => rule.required().max(500)
    }),
    defineField({
      name: 'avatar',
      title: 'Profile Image',
      type: 'image',
      options: {
        hotspot: true
      },
      validation: rule => rule.required()
    }),
    defineField({
      name: 'links',
      title: 'Social Links',
      type: 'object',
      fields: [
        defineField({
          name: 'website',
          title: 'Website',
          type: 'url'
        }),
        defineField({
          name: 'linkedin',
          title: 'LinkedIn',
          type: 'url'
        }),
        defineField({
          name: 'twitter',
          title: 'Twitter',
          type: 'url'
        }),
        defineField({
          name: 'github',
          title: 'GitHub',
          type: 'url'
        })
      ]
    })
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      media: 'avatar'
    }
  }
})

export const categorySchema = defineType({
  name: 'category',
  title: 'Categories',
  type: 'document',
  icon: () => '🏷️',
  fields: [
    defineField({
      name: 'name',
      title: 'Category Name',
      type: 'string',
      validation: rule => rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: rule => rule.required()
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3
    }),
    defineField({
      name: 'color',
      title: 'Brand Color',
      type: 'string',
      options: {
        list: [
          { title: 'Purple', value: 'purple' },
          { title: 'Blue', value: 'blue' },
          { title: 'Green', value: 'green' },
          { title: 'Orange', value: 'orange' },
          { title: 'Red', value: 'red' },
          { title: 'Yellow', value: 'yellow' }
        ]
      },
      validation: rule => rule.required()
    })
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'description'
    }
  }
})

export const blogPostSchema = defineType({
  name: 'post',
  title: 'Blog Posts',
  type: 'document',
  icon: () => '📝',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: rule => rule.required().max(100)
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: rule => rule.required()
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      validation: rule => rule.required().max(300)
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'H4', value: 'h4' },
            { title: 'Quote', value: 'blockquote' }
          ],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
              { title: 'Code', value: 'code' }
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL'
                  }
                ]
              }
            ]
          }
        },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text'
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Caption'
            }
          ]
        },
        {
          name: 'code',
          title: 'Code Block',
          type: 'object',
          fields: [
            {
              name: 'language',
              title: 'Language',
              type: 'string',
              options: {
                list: [
                  { title: 'JavaScript', value: 'javascript' },
                  { title: 'TypeScript', value: 'typescript' },
                  { title: 'HTML', value: 'html' },
                  { title: 'CSS', value: 'css' },
                  { title: 'Python', value: 'python' },
                  { title: 'Bash', value: 'bash' }
                ]
              }
            },
            {
              name: 'code',
              title: 'Code',
              type: 'text',
              rows: 10
            }
          ]
        },
        {
          name: 'callout',
          title: 'Highlight Callout',
          type: 'object',
          fields: [
            {
              name: 'type',
              title: 'Type',
              type: 'string',
              options: {
                list: [
                  { title: '💡 Insight', value: 'insight' },
                  { title: '💭 Tip', value: 'tip' },
                  { title: '⚠️ Warning', value: 'warning' },
                  { title: '✅ Success', value: 'success' }
                ]
              }
            },
            {
              name: 'title',
              title: 'Custom Title',
              type: 'string'
            },
            {
              name: 'content',
              title: 'Content',
              type: 'array',
              of: [{ type: 'block' }]
            }
          ]
        }
      ],
      validation: rule => rule.required()
    }),
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail Image',
      type: 'image',
      options: {
        hotspot: true
      },
      validation: rule => rule.required()
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
      validation: rule => rule.required()
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags'
      },
      validation: rule => rule.required().min(1).max(10)
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'author' }],
      validation: rule => rule.required()
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: rule => rule.required()
    }),
    defineField({
      name: 'readTime',
      title: 'Reading Time (minutes)',
      type: 'number',
      validation: rule => rule.required().min(1).max(60)
    }),
    defineField({
      name: 'featured',
      title: 'Featured Post',
      type: 'boolean',
      initialValue: false
    }),
    defineField({
      name: 'relatedServices',
      title: 'Related Services',
      type: 'array',
      of: [{
        type: 'string',
        options: {
          list: [
            { title: 'UX/UI Design', value: 'ux-design' },
            { title: 'Web Development', value: 'web-development' },
            { title: 'AI Development', value: 'ai-web-development' },
            { title: 'Performance Optimization', value: 'performance-optimization' },
            { title: 'Accessibility Audit', value: 'accessibility-audit' },
            { title: 'AI Consulting', value: 'ai-consulting' },
            { title: 'Digital Transformation', value: 'digital-transformation' }
          ]
        }
      }],
      validation: rule => rule.max(3)
    }),
    defineField({
      name: 'newsletterCTA',
      title: 'Show Newsletter CTA',
      type: 'boolean',
      initialValue: true
    }),
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'object',
      fields: [
        defineField({
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
          validation: rule => rule.max(60)
        }),
        defineField({
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          rows: 3,
          validation: rule => rule.max(160)
        }),
        defineField({
          name: 'ogImage',
          title: 'Social Share Image',
          type: 'image',
          options: {
            hotspot: true
          }
        }),
        defineField({
          name: 'canonicalUrl',
          title: 'Canonical URL',
          type: 'url'
        })
      ]
    }),
    defineField({
      name: 'status',
      title: 'Publication Status',
      type: 'string',
      options: {
        list: [
          { title: 'Draft', value: 'draft' },
          { title: 'Published', value: 'published' },
          { title: 'Archived', value: 'archived' }
        ]
      },
      initialValue: 'draft'
    })
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'excerpt',
      media: 'thumbnail',
      author: 'author.name',
      category: 'category.name'
    },
    prepare(selection) {
      const { title, subtitle, media, author, category } = selection
      return {
        title: title,
        subtitle: `${category} • ${author}`,
        media: media
      }
    }
  },
  orderings: [
    {
      title: 'Published Date, New',
      name: 'publishedAtDesc',
      by: [
        { field: 'publishedAt', direction: 'desc' }
      ]
    },
    {
      title: 'Featured First',
      name: 'featuredFirst',
      by: [
        { field: 'featured', direction: 'desc' },
        { field: 'publishedAt', direction: 'desc' }
      ]
    },
    {
      title: 'Title A-Z',
      name: 'titleAsc',
      by: [
        { field: 'title', direction: 'asc' }
      ]
    }
  ]
})