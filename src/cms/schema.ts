// CMS Schema Configuration for Services
// Compatible with Sanity, Strapi, and other headless CMS platforms

export const servicesSchema = {
  name: 'service',
  title: 'Services',
  type: 'document',
  icon: '🛠️',
  fields: [
    // Basic Information
    {
      name: 'title',
      title: 'Service Title',
      type: 'string',
      validation: (Rule: any) => Rule.required().min(5).max(100)
    },
    {
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 50
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'shortBenefit',
      title: 'Short Benefit Statement',
      type: 'string',
      description: 'One-line value proposition (max 120 chars)',
      validation: (Rule: any) => Rule.required().max(120)
    },
    {
      name: 'description',
      title: 'Service Description',
      type: 'text',
      rows: 4,
      validation: (Rule: any) => Rule.required().min(100).max(500)
    },
    {
      name: 'category',
      title: 'Service Category',
      type: 'reference',
      to: [{ type: 'serviceCategory' }],
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'icon',
      title: 'Service Icon',
      type: 'string',
      options: {
        list: [
          { title: 'Code', value: 'code' },
          { title: 'Palette', value: 'palette' },
          { title: 'Zap', value: 'zap' },
          { title: 'Trending Up', value: 'trending' },
          { title: 'Shield', value: 'shield' },
          { title: 'Globe', value: 'globe' },
          { title: 'Search', value: 'search' },
          { title: 'Users', value: 'users' }
        ]
      }
    },
    {
      name: 'featured',
      title: 'Featured Service',
      type: 'boolean',
      description: 'Show this service prominently on the services page'
    },
    {
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
    },

    // Content Sections
    {
      name: 'heroSection',
      title: 'Hero Section',
      type: 'object',
      fields: [
        {
          name: 'headline',
          title: 'Hero Headline',
          type: 'string',
          validation: (Rule: any) => Rule.max(150)
        },
        {
          name: 'subheadline',
          title: 'Hero Subheadline',
          type: 'text',
          rows: 3
        },
        {
          name: 'video',
          title: 'Hero Video',
          type: 'object',
          fields: [
            { name: 'url', title: 'Video URL', type: 'url' },
            { name: 'poster', title: 'Poster Image', type: 'image' },
            { name: 'duration', title: 'Duration (seconds)', type: 'number' }
          ]
        },
        {
          name: 'ctaPrimary',
          title: 'Primary CTA',
          type: 'object',
          fields: [
            { name: 'text', title: 'Button Text', type: 'string' },
            { name: 'url', title: 'URL', type: 'string' },
            { name: 'style', title: 'Style', type: 'string', options: {
              list: ['primary', 'secondary', 'outline']
            }}
          ]
        }
      ]
    },

    // Mini Case Study
    {
      name: 'miniCase',
      title: 'Mini Case Study',
      type: 'object',
      fields: [
        {
          name: 'client',
          title: 'Client Name',
          type: 'string',
          validation: (Rule: any) => Rule.required()
        },
        {
          name: 'result',
          title: 'Key Result',
          type: 'string',
          description: 'e.g., "Revenue +340%" or "Conversion +150%"',
          validation: (Rule: any) => Rule.required()
        },
        {
          name: 'description',
          title: 'Brief Description',
          type: 'text',
          rows: 2,
          validation: (Rule: any) => Rule.required().max(200)
        }
      ]
    },

    // Benefits & Features
    {
      name: 'benefits',
      title: 'Key Benefits',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (Rule: any) => Rule.required().min(3).max(8)
    },
    {
      name: 'features',
      title: 'Key Features',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (Rule: any) => Rule.required().min(3).max(8)
    },

    // Problem-Solution Framework
    {
      name: 'problemSolution',
      title: 'Problem-Solution Framework',
      type: 'object',
      fields: [
        {
          name: 'problems',
          title: 'Common Problems',
          type: 'array',
          of: [{ type: 'text', rows: 2 }],
          validation: (Rule: any) => Rule.min(3).max(6)
        },
        {
          name: 'solutions',
          title: 'Our Solutions',
          type: 'array',
          of: [{ type: 'text', rows: 2 }],
          validation: (Rule: any) => Rule.min(3).max(6)
        }
      ]
    },

    // Deliverables
    {
      name: 'deliverables',
      title: 'Service Deliverables',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {
            name: 'item',
            title: 'Deliverable Item',
            type: 'string',
            validation: (Rule: any) => Rule.required()
          },
          {
            name: 'included',
            title: 'Included in Base Package',
            type: 'boolean',
            initialValue: true
          },
          {
            name: 'note',
            title: 'Additional Note',
            type: 'string'
          },
          {
            name: 'category',
            title: 'Category',
            type: 'string',
            options: {
              list: [
                { title: 'Core', value: 'core' },
                { title: 'Advanced', value: 'advanced' },
                { title: 'Enterprise', value: 'enterprise' }
              ]
            }
          }
        ]
      }]
    },

    // Technology Stack
    {
      name: 'techStack',
      title: 'Technology Stack',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {
            name: 'name',
            title: 'Technology Name',
            type: 'string',
            validation: (Rule: any) => Rule.required()
          },
          {
            name: 'category',
            title: 'Category',
            type: 'string',
            options: {
              list: [
                'Framework', 'Language', 'Styling', 'Database', 
                'Hosting', 'Analytics', 'CMS', 'AI/ML', 'DevOps'
              ]
            }
          },
          {
            name: 'logo',
            title: 'Logo/Icon',
            type: 'image'
          },
          {
            name: 'description',
            title: 'Description',
            type: 'text'
          }
        ]
      }]
    },

    // Service Packages
    {
      name: 'packages',
      title: 'Service Packages',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {
            name: 'name',
            title: 'Package Name',
            type: 'string',
            validation: (Rule: any) => Rule.required()
          },
          {
            name: 'price',
            title: 'Price Range',
            type: 'string',
            validation: (Rule: any) => Rule.required()
          },
          {
            name: 'duration',
            title: 'Project Duration',
            type: 'string',
            validation: (Rule: any) => Rule.required()
          },
          {
            name: 'description',
            title: 'Package Description',
            type: 'text',
            rows: 3
          },
          {
            name: 'features',
            title: 'Package Features',
            type: 'array',
            of: [{ type: 'string' }]
          },
          {
            name: 'popular',
            title: 'Popular Package',
            type: 'boolean'
          },
          {
            name: 'cta',
            title: 'Call-to-Action Text',
            type: 'string'
          }
        ]
      }],
      validation: (Rule: any) => Rule.min(1).max(4)
    },

    // Before/After Case Studies
    {
      name: 'beforeAfter',
      title: 'Before/After Results',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Section Title',
          type: 'string'
        },
        {
          name: 'cases',
          title: 'Case Studies',
          type: 'array',
          of: [{
            type: 'object',
            fields: [
              {
                name: 'client',
                title: 'Client Name',
                type: 'string',
                validation: (Rule: any) => Rule.required()
              },
              {
                name: 'before',
                title: 'Before Metrics',
                type: 'object',
                fields: [
                  { name: 'metric', title: 'Metric Name', type: 'string' },
                  { name: 'value', title: 'Before Value', type: 'string' },
                  { name: 'issue', title: 'Main Issue', type: 'string' }
                ]
              },
              {
                name: 'after',
                title: 'After Metrics',
                type: 'object',
                fields: [
                  { name: 'metric', title: 'Metric Name', type: 'string' },
                  { name: 'value', title: 'After Value', type: 'string' },
                  { name: 'improvement', title: 'Improvement', type: 'string' }
                ]
              },
              {
                name: 'details',
                title: 'Additional Details',
                type: 'text'
              },
              {
                name: 'image',
                title: 'Comparison Image',
                type: 'image'
              }
            ]
          }]
        }
      ]
    },

    // Testimonials
    {
      name: 'testimonials',
      title: 'Client Testimonials',
      type: 'array',
      of: [{
        type: 'reference',
        to: [{ type: 'testimonial' }]
      }]
    },

    // Related Services
    {
      name: 'relatedServices',
      title: 'Related Services',
      type: 'array',
      of: [{
        type: 'reference',
        to: [{ type: 'service' }]
      }],
      validation: (Rule: any) => Rule.max(4)
    },

    // SEO & Metadata
    {
      name: 'seo',
      title: 'SEO Settings',
      type: 'object',
      fields: [
        {
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
          validation: (Rule: any) => Rule.max(60)
        },
        {
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          rows: 3,
          validation: (Rule: any) => Rule.max(160)
        },
        {
          name: 'ogImage',
          title: 'Social Share Image',
          type: 'image'
        },
        {
          name: 'focusKeyword',
          title: 'Focus Keyword',
          type: 'string'
        },
        {
          name: 'additionalKeywords',
          title: 'Additional Keywords',
          type: 'array',
          of: [{ type: 'string' }]
        }
      ]
    },

    // Analytics & Tracking
    {
      name: 'analytics',
      title: 'Analytics Settings',
      type: 'object',
      fields: [
        {
          name: 'trackingEvents',
          title: 'Tracking Events',
          type: 'array',
          of: [{
            type: 'object',
            fields: [
              { name: 'name', title: 'Event Name', type: 'string' },
              { name: 'category', title: 'Category', type: 'string' },
              { name: 'label', title: 'Label', type: 'string' }
            ]
          }]
        },
        {
          name: 'conversionGoals',
          title: 'Conversion Goals',
          type: 'array',
          of: [{ type: 'string' }]
        }
      ]
    }
  ],

  preview: {
    select: {
      title: 'title',
      subtitle: 'shortBenefit',
      media: 'heroSection.poster'
    }
  },

  orderings: [
    {
      title: 'Title A-Z',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }]
    },
    {
      title: 'Featured First',
      name: 'featuredFirst',
      by: [
        { field: 'featured', direction: 'desc' },
        { field: 'title', direction: 'asc' }
      ]
    }
  ]
}

// Service Category Schema
export const serviceCategorySchema = {
  name: 'serviceCategory',
  title: 'Service Categories',
  type: 'document',
  icon: '📁',
  fields: [
    {
      name: 'name',
      title: 'Category Name',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: { source: 'name' }
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text'
    },
    {
      name: 'icon',
      title: 'Category Icon',
      type: 'string'
    },
    {
      name: 'featured',
      title: 'Featured Category',
      type: 'boolean'
    },
    {
      name: 'color',
      title: 'Brand Color',
      type: 'string'
    }
  ]
}

// Testimonial Schema
export const testimonialSchema = {
  name: 'testimonial',
  title: 'Testimonials',
  type: 'document',
  icon: '💬',
  fields: [
    {
      name: 'quote',
      title: 'Testimonial Quote',
      type: 'text',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'author',
      title: 'Author Name',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'position',
      title: 'Job Title',
      type: 'string'
    },
    {
      name: 'company',
      title: 'Company',
      type: 'string'
    },
    {
      name: 'avatar',
      title: 'Author Photo',
      type: 'image'
    },
    {
      name: 'rating',
      title: 'Rating (1-5)',
      type: 'number',
      validation: (Rule: any) => Rule.min(1).max(5)
    },
    {
      name: 'featured',
      title: 'Featured Testimonial',
      type: 'boolean'
    },
    {
      name: 'serviceCategory',
      title: 'Related Service',
      type: 'reference',
      to: [{ type: 'service' }]
    }
  ]
}

// Export all schemas
export const schemas = [
  servicesSchema,
  serviceCategorySchema, 
  testimonialSchema
]

// Sample data seeding structure
export const sampleServiceData = {
  title: "AI Web Development & Design",
  slug: { current: "ai-web-development" },
  shortBenefit: "Build smart, high-converting websites with AI-powered optimization",
  description: "Next-generation web development using AI tools for faster delivery, better UX, and measurable business results.",
  category: "development",
  icon: "search",
  featured: true,
  status: "published",
  benefits: [
    "40% faster development with Claude Code integration",
    "AI-optimized user experience and conversion paths", 
    "Intelligent content personalization and A/B testing"
  ],
  // ... additional sample data
}

// Analytics event configuration
export const serviceAnalyticsEvents = {
  pageView: {
    name: 'service_page_view',
    category: 'Services',
    parameters: ['service_id', 'service_title']
  },
  ctaClick: {
    name: 'service_cta_click', 
    category: 'Conversion',
    parameters: ['service_id', 'cta_type', 'cta_text']
  },
  packageView: {
    name: 'package_view',
    category: 'Services',
    parameters: ['service_id', 'package_name']
  },
  inquirySubmit: {
    name: 'service_inquiry_submit',
    category: 'Lead Generation',
    parameters: ['service_id', 'form_type']
  }
}