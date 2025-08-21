'use client'

import ScrollReveal, { FadeUp } from '@/components/ui/ScrollReveal'

const techStack = [
  {
    category: 'Frontend',
    technologies: ['Next.js 15', 'TypeScript', 'Tailwind CSS', 'Framer Motion']
  },
  {
    category: 'Backend',
    technologies: ['Node.js', 'PostgreSQL', 'Prisma', 'Redis']
  },
  {
    category: 'AI/ML',
    technologies: ['Claude API', 'GPT-4', 'Stable Diffusion', 'TensorFlow']
  },
  {
    category: 'Tools',
    technologies: ['Figma', 'Linear', 'Notion', 'GitHub']
  },
  {
    category: 'Analytics',
    technologies: ['Google Analytics', 'Hotjar', 'Mixpanel', 'Sentry']
  }
]

export default function TechStack() {
  return (
    <section className="section-padding bg-background-secondary">
      <div className="container-custom">
        <div className="text-center mb-16">
          <FadeUp>
            <h2 className="font-pretendard font-black text-4xl md:text-5xl text-white mb-6 leading-tight">
              기술 <span className="text-gradient">스택</span>
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
              최신 기술과 검증된 도구로 최고의 성능을 구현합니다
            </p>
          </FadeUp>
        </div>

        <div className="space-y-8 max-w-4xl mx-auto">
          {techStack.map((category, index) => (
            <FadeUp key={index} delay={index * 100}>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-primary/30 transition-all duration-300">
                <h3 className="text-lg font-bold text-white mb-4">{category.category}</h3>
                <div className="flex flex-wrap gap-3">
                  {category.technologies.map((tech, idx) => (
                    <span 
                      key={idx} 
                      className="bg-primary/20 text-primary px-4 py-2 rounded-full text-sm font-medium hover:bg-primary/30 transition-colors duration-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}