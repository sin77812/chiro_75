import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { blogPosts, categories } from '@/data/blogPosts'
import TableOfContents from '@/components/ui/TableOfContents'
import HighlightCallout from '@/components/ui/HighlightCallout'
import BlogStructuredData from '@/components/seo/BlogStructuredData'

interface InsightPageProps {
  params: Promise<{ slug: string }>
}

async function getBlogPost(slug: string) {
  return blogPosts.find(post => post.slug === slug)
}

function extractTableOfContents(content: string) {
  const headings = content.match(/^#{2,4}\s(.+)$/gm) || []
  return headings.map((heading, index) => {
    const level = (heading.match(/#/g) || []).length
    const title = heading.replace(/^#+\s/, '')
    const id = title.toLowerCase().replace(/[^a-z0-9가-힣\s]/g, '').replace(/\s+/g, '-')
    
    return {
      id,
      title,
      level
    }
  })
}

export async function generateMetadata({ params }: InsightPageProps): Promise<Metadata> {
  const resolvedParams = await params
  const post = await getBlogPost(resolvedParams.slug)
  
  if (!post) {
    return {
      title: 'Post Not Found | CHIRO',
    }
  }

  return {
    title: post.seo?.metaTitle || `${post.title} | CHIRO 인사이트`,
    description: post.seo?.metaDescription || post.excerpt,
    keywords: post.tags,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.seo?.ogImage || post.thumbnail],
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author.name],
    },
    alternates: {
      canonical: post.seo?.canonicalUrl
    }
  }
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function InsightPage({ params }: InsightPageProps) {
  const resolvedParams = await params
  const post = await getBlogPost(resolvedParams.slug)

  if (!post) {
    notFound()
  }

  const category = categories.find(c => c.id === post.category)
  const tableOfContents = extractTableOfContents(post.content)
  const relatedPosts = blogPosts.filter(p => 
    p.id !== post.id && 
    (p.category === post.category || p.tags.some(tag => post.tags.includes(tag)))
  ).slice(0, 3)

  // Convert markdown-like content to JSX (simplified)
  const renderContent = (content: string) => {
    const sections = content.split('\n\n').filter(section => section.trim())
    
    return sections.map((section, index) => {
      // Headers
      if (section.startsWith('# ')) {
        const id = section.slice(2).toLowerCase().replace(/[^a-z0-9가-힣\s]/g, '').replace(/\s+/g, '-')
        return <h1 key={index} id={id} className="text-4xl font-bold text-gray-900 mb-6">{section.slice(2)}</h1>
      }
      if (section.startsWith('## ')) {
        const id = section.slice(3).toLowerCase().replace(/[^a-z0-9가-힣\s]/g, '').replace(/\s+/g, '-')
        return <h2 key={index} id={id} className="text-3xl font-bold text-gray-900 mt-12 mb-6">{section.slice(3)}</h2>
      }
      if (section.startsWith('### ')) {
        const id = section.slice(4).toLowerCase().replace(/[^a-z0-9가-힣\s]/g, '').replace(/\s+/g, '-')
        return <h3 key={index} id={id} className="text-2xl font-bold text-gray-900 mt-8 mb-4">{section.slice(4)}</h3>
      }
      if (section.startsWith('#### ')) {
        const id = section.slice(5).toLowerCase().replace(/[^a-z0-9가-힣\s]/g, '').replace(/\s+/g, '-')
        return <h4 key={index} id={id} className="text-xl font-bold text-gray-900 mt-6 mb-3">{section.slice(5)}</h4>
      }

      // Code blocks
      if (section.startsWith('```')) {
        const language = section.split('\n')[0].slice(3)
        const code = section.split('\n').slice(1, -1).join('\n')
        return (
          <div key={index} className="my-6">
            <pre className="bg-gray-900 text-gray-100 p-6 rounded-xl overflow-x-auto">
              <code className={`language-${language}`}>{code}</code>
            </pre>
          </div>
        )
      }

      // Lists
      if (section.includes('- **') && section.includes('**:')) {
        const items = section.split('\n').filter(line => line.startsWith('- '))
        return (
          <ul key={index} className="space-y-3 my-6">
            {items.map((item, itemIndex) => (
              <li key={itemIndex} className="flex items-start gap-3">
                <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                <span className="text-gray-700" dangerouslySetInnerHTML={{ 
                  __html: item.slice(2).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') 
                }} />
              </li>
            ))}
          </ul>
        )
      }

      // Regular lists
      if (section.includes('\n- ')) {
        const items = section.split('\n').filter(line => line.startsWith('- '))
        return (
          <ul key={index} className="list-disc list-inside space-y-2 my-6 text-gray-700">
            {items.map((item, itemIndex) => (
              <li key={itemIndex}>{item.slice(2)}</li>
            ))}
          </ul>
        )
      }

      // Numbered lists
      if (/^\d+\./.test(section)) {
        const items = section.split('\n').filter(line => /^\d+\./.test(line))
        return (
          <ol key={index} className="list-decimal list-inside space-y-2 my-6 text-gray-700">
            {items.map((item, itemIndex) => (
              <li key={itemIndex}>{item.replace(/^\d+\.\s/, '')}</li>
            ))}
          </ol>
        )
      }

      // Paragraphs
      if (section.trim() && !section.startsWith('---')) {
        return (
          <p key={index} className="text-gray-700 leading-relaxed my-6" 
             dangerouslySetInnerHTML={{ 
               __html: section.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>') 
             }} 
          />
        )
      }

      return null
    }).filter(Boolean)
  }

  return (
    <>
      <BlogStructuredData post={post} />
      <main className="min-h-screen bg-white">
      <article>
        <section className="relative h-[60vh] min-h-[500px] flex items-center">
          <Image
            src={post.thumbnail}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />
          
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
            <div className="flex items-center gap-4 mb-6">
              <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                post.category === 'design' ? 'bg-purple-500/80' :
                post.category === 'development' ? 'bg-blue-500/80' :
                post.category === 'ai' ? 'bg-green-500/80' :
                'bg-orange-500/80'
              }`}>
                {category?.name}
              </span>
              <span className="text-sm opacity-90">{post.readTime}분 읽기</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              {post.title}
            </h1>
            
            <p className="text-xl opacity-90 mb-8 max-w-3xl">
              {post.excerpt}
            </p>

            <div className="flex items-center gap-4">
              <Image
                src={post.author.avatar}
                alt={post.author.name}
                width={48}
                height={48}
                className="rounded-full"
              />
              <div>
                <div className="font-semibold">{post.author.name}</div>
                <div className="text-sm opacity-75">{post.author.role}</div>
              </div>
              <span className="text-sm opacity-75 ml-4">
                {new Date(post.publishedAt).toLocaleDateString('ko-KR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex gap-12">
              <div className="flex-1 max-w-4xl">
                <div className="prose prose-lg prose-gray max-w-none">
                  {renderContent(post.content)}
                </div>

                {/* Newsletter CTA */}
                {post.newsletterCTA && (
                  <div className="mt-12 p-8 bg-blue-50 rounded-2xl border-l-4 border-l-blue-500">
                    <HighlightCallout type="insight" title="💌 더 많은 인사이트 받아보기">
                      <p>이런 유용한 콘텐츠를 놓치고 싶지 않으시다면, CHIRO 뉴스레터를 구독해보세요!</p>
                      <div className="mt-4 flex gap-3">
                        <input 
                          type="email" 
                          placeholder="이메일 주소" 
                          className="flex-1 px-4 py-2 rounded-lg border border-gray-200"
                        />
                        <button className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
                          구독하기
                        </button>
                      </div>
                    </HighlightCallout>
                  </div>
                )}

                {/* Related Services */}
                {post.relatedServices.length > 0 && (
                  <div className="mt-16 p-8 bg-gray-50 rounded-2xl">
                    <h3 className="text-xl font-bold text-gray-900 mb-6">관련 서비스</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {post.relatedServices.map((serviceId, index) => (
                        <Link
                          key={index}
                          href={`/services/${serviceId}`}
                          className="flex items-center gap-3 p-4 bg-white rounded-xl hover:bg-blue-50 transition-colors group"
                        >
                          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <div className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                              {serviceId.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                            </div>
                            <div className="text-sm text-gray-600">서비스 자세히 보기</div>
                          </div>
                          <svg className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="w-80 flex-shrink-0 hidden lg:block">
                {tableOfContents.length > 0 && (
                  <TableOfContents items={tableOfContents} />
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Author Profile */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl p-8">
              <div className="flex items-start gap-6">
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  width={80}
                  height={80}
                  className="rounded-full"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {post.author.name}
                  </h3>
                  <p className="text-blue-600 font-medium mb-4">
                    {post.author.role}
                  </p>
                  <p className="text-gray-600 mb-4">
                    {post.author.bio}
                  </p>
                  <div className="flex gap-3">
                    {post.author.links.website && (
                      <a href={post.author.links.website} className="text-gray-400 hover:text-gray-600">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5z" clipRule="evenodd" />
                        </svg>
                      </a>
                    )}
                    {post.author.links.linkedin && (
                      <a href={post.author.links.linkedin} className="text-gray-400 hover:text-gray-600">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-12 text-center">
                관련 인사이트
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedPosts.map((relatedPost) => (
                  <Link 
                    key={relatedPost.id}
                    href={`/insights/${relatedPost.slug}`}
                    className="group block"
                  >
                    <article className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:border-blue-300 hover:shadow-lg transition-all duration-300">
                      <div className="aspect-[16/10] relative overflow-hidden">
                        <Image
                          src={relatedPost.thumbnail}
                          alt={relatedPost.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                          {relatedPost.title}
                        </h3>
                        <p className="text-gray-600 text-sm line-clamp-3">
                          {relatedPost.excerpt}
                        </p>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </article>
    </main>
    </>
  )
}