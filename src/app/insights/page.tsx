import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { blogPosts, categories } from '@/data/blogPosts'

export const metadata: Metadata = {
  title: '인사이트 | CHIRO - 디지털 혁신과 AI 트렌드',
  description: 'UX/UI 디자인, 웹 개발, AI 및 비즈니스 전략에 대한 전문가 인사이트를 만나보세요. 실무진이 직접 공유하는 최신 트렌드와 실전 노하우.',
  keywords: ['디지털마케팅', 'UX디자인', '웹개발', 'AI', '비즈니스전략', '인사이트'],
  openGraph: {
    title: '인사이트 | CHIRO',
    description: 'CHIRO 전문가들이 공유하는 디지털 혁신 인사이트',
    type: 'website',
  },
}

export default function InsightsPage() {
  const featuredPosts = blogPosts.filter(post => post.featured)
  const regularPosts = blogPosts.filter(post => !post.featured)

  return (
    <main className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-gray-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              디지털 혁신 인사이트
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              UX/UI, 웹 개발, AI 그리고 비즈니스 전략까지
              <br />실무 전문가들이 직접 공유하는 최신 트렌드와 실전 노하우
            </p>
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <button className="px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors">
              전체
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                className="px-6 py-3 bg-white text-gray-700 font-medium rounded-xl border border-gray-200 hover:border-blue-300 hover:text-blue-600 transition-colors"
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {featuredPosts.length > 0 && (
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-12 text-center">
              추천 인사이트
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {featuredPosts.slice(0, 2).map((post, index) => (
                <Link 
                  key={post.id}
                  href={`/insights/${post.slug}`}
                  className="group block"
                >
                  <article className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:border-blue-300 hover:shadow-xl transition-all duration-300">
                    <div className="aspect-[16/10] relative overflow-hidden">
                      <Image
                        src={post.thumbnail}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded-full">
                          추천
                        </span>
                      </div>
                    </div>

                    <div className="p-8">
                      <div className="flex items-center gap-4 mb-4">
                        <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                          post.category === 'design' ? 'bg-purple-100 text-purple-700' :
                          post.category === 'development' ? 'bg-blue-100 text-blue-700' :
                          post.category === 'ai' ? 'bg-green-100 text-green-700' :
                          'bg-orange-100 text-orange-700'
                        }`}>
                          {categories.find(c => c.id === post.category)?.name}
                        </span>
                        <span className="text-sm text-gray-500">
                          {post.readTime}분 읽기
                        </span>
                      </div>
                      
                      <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      
                      <p className="text-gray-600 mb-6 line-clamp-3">
                        {post.excerpt}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Image
                            src={post.author.avatar}
                            alt={post.author.name}
                            width={32}
                            height={32}
                            className="rounded-full"
                          />
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {post.author.name}
                            </div>
                            <div className="text-xs text-gray-600">
                              {post.author.role}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center text-blue-600 font-medium group-hover:translate-x-1 transition-transform">
                          읽어보기
                          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-2xl font-bold text-gray-900">
              모든 인사이트
            </h2>
            
            <div className="flex items-center gap-4">
              <select className="px-4 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option>최신순</option>
                <option>인기순</option>
                <option>읽기 시간순</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...featuredPosts, ...regularPosts].map((post) => (
              <Link 
                key={post.id}
                href={`/insights/${post.slug}`}
                className="group block"
              >
                <article className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:border-blue-300 hover:shadow-lg transition-all duration-300">
                  <div className="aspect-[16/10] relative overflow-hidden">
                    <Image
                      src={post.thumbnail}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className={`px-2 py-1 text-xs font-medium rounded ${
                        post.category === 'design' ? 'bg-purple-100 text-purple-700' :
                        post.category === 'development' ? 'bg-blue-100 text-blue-700' :
                        post.category === 'ai' ? 'bg-green-100 text-green-700' :
                        'bg-orange-100 text-orange-700'
                      }`}>
                        {categories.find(c => c.id === post.category)?.name}
                      </span>
                      <span className="text-xs text-gray-500">
                        {post.readTime}분
                      </span>
                    </div>
                    
                    <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center gap-2">
                      <Image
                        src={post.author.avatar}
                        alt={post.author.name}
                        width={24}
                        height={24}
                        className="rounded-full"
                      />
                      <span className="text-xs text-gray-600">
                        {post.author.name}
                      </span>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs text-gray-600">
                        {new Date(post.publishedAt).toLocaleDateString('ko-KR')}
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              최신 인사이트를 놓치지 마세요
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              매주 새로운 디지털 혁신 트렌드와 실무 노하우를
              <br />이메일로 받아보세요
            </p>
            
            <form className="max-w-md mx-auto flex gap-4">
              <input
                type="email"
                placeholder="이메일 주소를 입력하세요"
                className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors"
              >
                구독
              </button>
            </form>
            
            <p className="text-xs text-gray-500 mt-4">
              언제든지 구독 해지할 수 있습니다. 스팸은 절대 보내지 않습니다.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}