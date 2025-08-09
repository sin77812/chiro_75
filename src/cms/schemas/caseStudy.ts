import { defineType, defineField } from 'sanity'

export const caseStudySchema = defineType({
  name: 'caseStudy',
  title: 'Case Study',
  type: 'document',
  icon: () => '📊',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: rule => rule.required()
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
      name: 'client',
      title: 'Client Name',
      type: 'string',
      validation: rule => rule.required()
    }),
    defineField({
      name: 'sector',
      title: 'Industry Sector',
      type: 'string',
      validation: rule => rule.required()
    }),
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail Image',
      type: 'image',
      options: {
        hotspot: true
      }
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: {
        hotspot: true
      }
    }),
    defineField({
      name: 'overview',
      title: 'Project Overview',
      type: 'object',
      fields: [
        defineField({
          name: 'problem',
          title: 'Problem Statement',
          type: 'text',
          rows: 4
        }),
        defineField({
          name: 'goals',
          title: 'Project Goals',
          type: 'array',
          of: [{ type: 'string' }]
        }),
        defineField({
          name: 'role',
          title: 'Our Role',
          type: 'string'
        }),
        defineField({
          name: 'duration',
          title: 'Project Duration',
          type: 'string'
        }),
        defineField({
          name: 'team',
          title: 'Team Members',
          type: 'array',
          of: [{ type: 'string' }]
        })
      ]
    }),
    defineField({
      name: 'challenges',
      title: 'Key Challenges',
      type: 'array',
      of: [{ type: 'text' }]
    }),
    defineField({
      name: 'strategy',
      title: 'Strategy & Approach',
      type: 'array',
      of: [{ type: 'text' }]
    }),
    defineField({
      name: 'designHighlights',
      title: 'Design Highlights',
      type: 'array',
      of: [{ type: 'text' }]
    }),
    defineField({
      name: 'techStack',
      title: 'Technology Stack',
      type: 'array',
      of: [{ type: 'string' }]
    }),
    defineField({
      name: 'metrics',
      title: 'Performance Metrics',
      type: 'array',
      of: [
        defineType({
          name: 'metric',
          title: 'Metric',
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Metric Label',
              type: 'string'
            }),
            defineField({
              name: 'before',
              title: 'Before Value',
              type: 'string'
            }),
            defineField({
              name: 'after',
              title: 'After Value',
              type: 'string'
            }),
            defineField({
              name: 'delta',
              title: 'Change Percentage',
              type: 'string'
            }),
            defineField({
              name: 'unit',
              title: 'Unit',
              type: 'string'
            })
          ]
        })
      ]
    }),
    defineField({
      name: 'quotes',
      title: 'Client Testimonials',
      type: 'array',
      of: [
        defineType({
          name: 'testimonial',
          title: 'Testimonial',
          type: 'object',
          fields: [
            defineField({
              name: 'quote',
              title: 'Quote',
              type: 'text',
              rows: 3
            }),
            defineField({
              name: 'author',
              title: 'Author Name',
              type: 'string'
            }),
            defineField({
              name: 'position',
              title: 'Position',
              type: 'string'
            }),
            defineField({
              name: 'company',
              title: 'Company',
              type: 'string'
            }),
            defineField({
              name: 'avatar',
              title: 'Author Photo',
              type: 'image',
              options: {
                hotspot: true
              }
            })
          ]
        })
      ]
    }),
    defineField({
      name: 'gallery',
      title: 'Project Gallery',
      type: 'array',
      of: [
        defineType({
          name: 'galleryItem',
          title: 'Gallery Item',
          type: 'object',
          fields: [
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {
                hotspot: true
              }
            }),
            defineField({
              name: 'caption',
              title: 'Caption',
              type: 'string'
            }),
            defineField({
              name: 'alt',
              title: 'Alt Text',
              type: 'string'
            })
          ]
        })
      ]
    }),
    defineField({
      name: 'resources',
      title: 'Project Resources',
      type: 'array',
      of: [
        defineType({
          name: 'resource',
          title: 'Resource',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string'
            }),
            defineField({
              name: 'type',
              title: 'Resource Type',
              type: 'string',
              options: {
                list: [
                  { title: 'PDF Document', value: 'pdf' },
                  { title: 'External Link', value: 'link' },
                  { title: 'Video', value: 'video' }
                ]
              }
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'url'
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 2
            })
          ]
        })
      ]
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString()
    }),
    defineField({
      name: 'readTime',
      title: 'Reading Time (minutes)',
      type: 'number',
      validation: rule => rule.min(1).max(60)
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags'
      }
    }),
    defineField({
      name: 'nextProject',
      title: 'Next Project',
      type: 'reference',
      to: [{ type: 'caseStudy' }]
    }),
    defineField({
      name: 'featured',
      title: 'Featured Case Study',
      type: 'boolean',
      initialValue: false
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
      client: 'client',
      media: 'thumbnail'
    },
    prepare(selection) {
      const { title, client } = selection
      return {
        title: title,
        subtitle: `Client: ${client}`
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
      title: 'Title A-Z',
      name: 'titleAsc',
      by: [
        { field: 'title', direction: 'asc' }
      ]
    }
  ]
})