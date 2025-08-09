'use client'

import { useState } from 'react'
import { ChevronRight, Code, Palette, Zap, TrendingUp, Shield, Globe } from 'lucide-react'
import servicesData from '@/data/services.json'

const iconMap = {
  code: Code,
  palette: Palette,
  zap: Zap,
  trending: TrendingUp,
  shield: Shield,
  globe: Globe,
}

export default function ServiceCards() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  return (
    <section className="section-padding bg-dark">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-primary/10 rounded-full text-primary font-medium text-sm mb-4">
            OUR SERVICES
          </div>
          <h2 className="font-pretendard font-bold mb-6">
            완성도 높은 <span className="text-gradient">웹 솔루션</span>으로<br />
            비즈니스 성과를 극대화합니다
          </h2>
          <p className="text-xl text-neutral-light/70 max-w-3xl mx-auto leading-relaxed">
            전략 수립부터 개발, 런칭, 운영까지. 모든 과정에서 최고의 결과를 보장하는 원스톱 서비스를 제공합니다.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service, index) => {
            const IconComponent = iconMap[service.icon as keyof typeof iconMap]
            
            return (
              <div
                key={service.id}
                className={`group relative p-8 rounded-2xl border transition-all duration-500 cursor-pointer card-hover ${
                  hoveredCard === service.id 
                    ? 'bg-primary/5 border-primary/30' 
                    : 'bg-shadow-gray/20 border-shadow-gray/30 hover:border-primary/20'
                }`}
                onMouseEnter={() => setHoveredCard(service.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Icon */}
                <div className="relative mb-6">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300 ${
                    hoveredCard === service.id 
                      ? 'bg-primary text-white scale-110' 
                      : 'bg-primary/10 text-primary'
                  }`}>
                    <IconComponent className="h-6 w-6" />
                  </div>
                  
                  {/* Decorative gradient blob */}
                  <div className={`absolute -top-1 -left-1 w-16 h-16 bg-gradient-to-r from-primary/20 to-accent-green/20 rounded-xl -z-10 transition-all duration-300 ${
                    hoveredCard === service.id ? 'scale-110 opacity-100' : 'scale-100 opacity-0'
                  }`} />
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <h3 className="text-xl font-pretendard font-semibold text-white group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  
                  {/* Short Benefit */}
                  <p className="text-primary font-medium text-lg">
                    {service.shortBenefit}
                  </p>

                  <p className="text-neutral-light/70 leading-relaxed text-sm">
                    {service.description}
                  </p>

                  {/* Mini Case Study */}
                  {service.miniCase && (
                    <div className="bg-shadow-gray/30 rounded-lg p-4 border border-shadow-gray/20">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-xs text-neutral-light/60">{service.miniCase.client}</div>
                        <div className="text-accent-green font-bold text-sm">{service.miniCase.result}</div>
                      </div>
                      <p className="text-xs text-neutral-light/70 leading-relaxed">
                        {service.miniCase.description}
                      </p>
                    </div>
                  )}

                  {/* Learn More Link */}
                  <div className="pt-4 border-t border-shadow-gray/30">
                    <button className="inline-flex items-center text-primary font-medium hover:text-accent-green transition-colors group">
                      자세히 보기
                      <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>

                {/* Background Pattern */}
                <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
                  <div className="w-full h-full bg-gradient-to-bl from-primary via-transparent to-transparent" />
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-neutral-light/70 mb-6">
            어떤 서비스가 필요하신지 확실하지 않으세요?
          </p>
          <button className="btn-primary group">
            맞춤 컨설팅 받기
            <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  )
}