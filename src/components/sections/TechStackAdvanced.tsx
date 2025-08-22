'use client'

import { useState } from 'react'
import ScrollReveal, { FadeUp } from '@/components/ui/ScrollReveal'

interface TechCategory {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  technologies: {
    name: string
    level: number
    description: string
  }[]
  color: string
}

const techCategories: TechCategory[] = [
  {
    id: 'frontend',
    title: 'Frontend',
    description: '최신 프론트엔드 기술로 빠르고 매끄러운 사용자 경험',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
        <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M3 9H21" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="6" cy="6" r="0.5" fill="currentColor"/>
        <circle cx="9" cy="6" r="0.5" fill="currentColor"/>
        <circle cx="12" cy="6" r="0.5" fill="currentColor"/>
        <path d="M8 13L10 15L8 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M13 17H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    technologies: [
      { name: 'Next.js 15', level: 95, description: 'App Router, RSC, Streaming' },
      { name: 'TypeScript', level: 90, description: 'Type-safe development' },
      { name: 'Tailwind CSS', level: 95, description: 'Utility-first CSS framework' },
      { name: 'Framer Motion', level: 85, description: 'Advanced animations' }
    ],
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'backend',
    title: 'Backend & Database',
    description: '안정적이고 확장 가능한 서버 아키텍처',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
        <ellipse cx="12" cy="7" rx="7" ry="3" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M5 7V17C5 18.6569 8.13401 20 12 20C15.866 20 19 18.6569 19 17V7" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M5 12C5 13.6569 8.13401 15 12 15C15.866 15 19 13.6569 19 12" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
    technologies: [
      { name: 'Node.js', level: 90, description: 'Server-side JavaScript' },
      { name: 'PostgreSQL', level: 85, description: 'Relational database' },
      { name: 'Prisma ORM', level: 88, description: 'Type-safe database access' },
      { name: 'Redis', level: 80, description: 'In-memory data store' }
    ],
    color: 'from-green-500 to-emerald-500'
  },
  {
    id: 'ai',
    title: 'AI & Machine Learning',
    description: 'AI 기술을 활용한 지능형 솔루션',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M12 3V9M12 15V21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M3 12H9M15 12H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M5.64 5.64L9.17 9.17M14.83 14.83L18.36 18.36" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M18.36 5.64L14.83 9.17M9.17 14.83L5.64 18.36" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    technologies: [
      { name: 'Claude API', level: 92, description: 'Anthropic AI integration' },
      { name: 'GPT-4', level: 88, description: 'OpenAI language model' },
      { name: 'Stable Diffusion', level: 75, description: 'Image generation' },
      { name: 'TensorFlow', level: 70, description: 'Machine learning framework' }
    ],
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'devops',
    title: 'DevOps & Cloud',
    description: '자동화된 배포와 클라우드 인프라 관리',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
        <path d="M12 2L8 7H4C2.89543 7 2 7.89543 2 9V18C2 19.1046 2.89543 20 4 20H20C21.1046 20 22 19.1046 22 18V9C22 7.89543 21.1046 7 20 7H16L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="12" cy="13" r="3" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
    technologies: [
      { name: 'Docker', level: 85, description: 'Container orchestration' },
      { name: 'AWS', level: 82, description: 'Cloud infrastructure' },
      { name: 'Vercel', level: 95, description: 'Edge deployment platform' },
      { name: 'GitHub Actions', level: 88, description: 'CI/CD automation' }
    ],
    color: 'from-orange-500 to-red-500'
  },
  {
    id: 'tools',
    title: 'Tools & Analytics',
    description: '프로젝트 관리와 데이터 분석 도구',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
        <rect x="3" y="3" width="8" height="8" rx="1" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="13" y="3" width="8" height="8" rx="1" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="3" y="13" width="8" height="8" rx="1" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="13" y="13" width="8" height="8" rx="1" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="7" cy="7" r="1.5" fill="currentColor"/>
        <path d="M15 7H19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M17 5V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M5 17H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="17" cy="17" r="1.5" fill="currentColor"/>
      </svg>
    ),
    technologies: [
      { name: 'Figma', level: 90, description: 'Design collaboration' },
      { name: 'Google Analytics', level: 85, description: 'Web analytics' },
      { name: 'Sentry', level: 80, description: 'Error tracking' },
      { name: 'Linear', level: 88, description: 'Project management' }
    ],
    color: 'from-indigo-500 to-purple-500'
  }
]

export default function TechStackAdvanced() {
  const [selectedCategory, setSelectedCategory] = useState<string>('frontend')
  const activeCategory = techCategories.find(cat => cat.id === selectedCategory) || techCategories[0]

  return (
    <section className="section-padding bg-shadow-gray/10">
      <div className="container-custom">
        <div className="text-center mb-16">
          <FadeUp>
            <h2 className="font-pretendard font-bold text-white mb-4">
              기술 <span className="text-gradient">스택</span>
            </h2>
            <p className="text-xl text-neutral-light/70 max-w-2xl mx-auto leading-relaxed">
              최신 기술과 검증된 도구로 최고의 성능을 구현합니다
            </p>
          </FadeUp>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Category Icons */}
          <FadeUp delay={100}>
            <div className="flex justify-center gap-4 mb-12 flex-wrap">
              {techCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`group relative p-4 rounded-2xl transition-all duration-300 ${
                    selectedCategory === category.id
                      ? 'bg-primary/20 scale-110'
                      : 'bg-dark hover:bg-dark/80'
                  } border ${
                    selectedCategory === category.id
                      ? 'border-primary'
                      : 'border-shadow-gray/30 hover:border-primary/30'
                  }`}
                >
                  <div className={`w-12 h-12 transition-all duration-300 ${
                    selectedCategory === category.id ? 'text-primary' : 'text-neutral-light/60 group-hover:text-primary'
                  }`}>
                    {category.icon}
                  </div>
                  <span className={`absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs font-medium whitespace-nowrap transition-opacity duration-300 ${
                    selectedCategory === category.id ? 'opacity-100 text-primary' : 'opacity-0 group-hover:opacity-100 text-neutral-light/60'
                  }`}>
                    {category.title}
                  </span>
                </button>
              ))}
            </div>
          </FadeUp>

          {/* Active Category Details */}
          <FadeUp delay={200}>
            <div className="bg-dark rounded-3xl p-8 border border-shadow-gray/30 mt-16">
              {/* Header */}
              <div className="flex items-start gap-6 mb-8">
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${activeCategory.color} p-0.5`}>
                  <div className="w-full h-full bg-dark rounded-2xl flex items-center justify-center">
                    <div className="w-12 h-12 text-white">
                      {activeCategory.icon}
                    </div>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-2">{activeCategory.title}</h3>
                  <p className="text-neutral-light/70 leading-relaxed">{activeCategory.description}</p>
                </div>
              </div>

              {/* Technologies */}
              <div className="space-y-6">
                {activeCategory.technologies.map((tech, index) => (
                  <div key={index} className="group">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <span className="text-white font-medium">{tech.name}</span>
                        <span className="text-xs text-neutral-light/50 opacity-0 group-hover:opacity-100 transition-opacity">
                          {tech.description}
                        </span>
                      </div>
                      <span className="text-primary font-medium">{tech.level}%</span>
                    </div>
                    <div className="h-2 bg-shadow-gray/50 rounded-full overflow-hidden">
                      <div 
                        className={`h-full bg-gradient-to-r ${activeCategory.color} rounded-full transition-all duration-1000 ease-out`}
                        style={{ 
                          width: `${tech.level}%`,
                          animation: `slideIn 1s ease-out ${index * 0.1}s both`
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-shadow-gray/30">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-1">
                    {activeCategory.technologies.length}
                  </div>
                  <div className="text-xs text-neutral-light/60">Technologies</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent-green mb-1">
                    {Math.round(activeCategory.technologies.reduce((acc, tech) => acc + tech.level, 0) / activeCategory.technologies.length)}%
                  </div>
                  <div className="text-xs text-neutral-light/60">Average Proficiency</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent-yellow mb-1">
                    4+
                  </div>
                  <div className="text-xs text-neutral-light/60">Years Experience</div>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>

        <style jsx>{`
          @keyframes slideIn {
            from {
              width: 0;
            }
          }
        `}</style>
      </div>
    </section>
  )
}