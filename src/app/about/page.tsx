'use client'

import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { 
  ArrowRight, CheckCircle, Download, ExternalLink, 
  Zap, Award, FileText, Users, Brain, Shield, 
  Globe, Eye, Lock, Accessibility
} from 'lucide-react'
import { FadeUp, FadeLeft, FadeRight } from '@/components/ui/ScrollReveal'
import { AboutAnalytics } from '@/components/analytics/Analytics'
import aboutData from '@/data/about.json'

// Metadata handled by layout.tsx for client component

// Icon mapping
const iconMap = {
  'zap': Zap,
  'award': Award,
  'file-text': FileText,
  'accessibility': Accessibility,
  'brain': Brain,
  'shield': Shield,
  'globe': Globe,
  'eye': Eye,
  'lock': Lock,
  'users': Users
}

export default function AboutPage() {
  return (
    <main className="pt-18">
      {/* Mission & Positioning */}
      <section className="section-padding bg-dark relative overflow-hidden">
        {/* Background Video */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/videos/about-background.mp4" type="video/mp4" />
          </video>
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-black/70"></div>
        </div>
        
        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <FadeUp>
              <div className="inline-block px-4 py-2 bg-primary/10 rounded-full text-primary font-medium text-sm mb-6">
                ABOUT CHIRO
              </div>
              <h1 className="font-pretendard font-bold text-white mb-8 leading-tight">
                {aboutData.mission.positioning}
              </h1>
              <p className="text-xl text-neutral-light/70 leading-relaxed max-w-3xl mx-auto">
                {aboutData.mission.description}
              </p>
            </FadeUp>
          </div>

          {/* Key Stats */}
          <FadeUp delay={200}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-16 border-t border-shadow-gray/30">
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">27+</div>
                <div className="text-neutral-light/60">완료 프로젝트</div>
              </div>
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">98%</div>
                <div className="text-neutral-light/60">고객 만족도</div>
              </div>
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">96+</div>
                <div className="text-neutral-light/60">성능 점수</div>
              </div>
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">2017</div>
                <div className="text-neutral-light/60">since</div>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Why CHIRO - 5 Differentiators */}
      <section className="section-padding bg-shadow-gray/10">
        <div className="container-custom">
          <div className="text-center mb-16">
            <FadeUp>
              <h2 className="font-pretendard font-bold text-white mb-4">
                Why <span className="text-gradient">CHIRO</span>?
              </h2>
              <p className="text-xl text-neutral-light/70 max-w-2xl mx-auto leading-relaxed">
                5가지 핵심 차별화 요소로 업계 최고 수준의 결과를 보장합니다
              </p>
            </FadeUp>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {aboutData.differentiators.map((diff, index) => {
              const IconComponent = iconMap[diff.icon as keyof typeof iconMap] || Zap
              return (
                <FadeUp key={index} delay={index * 100}>
                  <div className="relative p-8 bg-dark rounded-2xl border border-shadow-gray/30 hover:border-primary/30 transition-all duration-300 h-full">
                    <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mb-6">
                      <IconComponent className="w-6 h-6 text-primary" />
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-3">{diff.title}</h3>
                    <p className="text-neutral-light/70 mb-4 leading-relaxed">{diff.description}</p>
                    
                    <div className="bg-primary/10 rounded-lg p-3 mb-4">
                      <div className="text-primary font-bold text-lg">{diff.metrics}</div>
                    </div>

                    <ul className="space-y-2">
                      {diff.details.map((detail, idx) => (
                        <li key={idx} className="flex items-center text-sm text-neutral-light/60">
                          <CheckCircle className="w-4 h-4 text-accent-green mr-2 flex-shrink-0" />
                          {detail}
                        </li>
                      ))}
                    </ul>

                    <div className="absolute top-6 right-6 text-6xl font-bold text-primary/10">
                      0{index + 1}
                    </div>
                  </div>
                </FadeUp>
              )
            })}
          </div>
        </div>
      </section>

      {/* 5-Step Process Timeline */}
      <section className="section-padding bg-dark">
        <div className="container-custom">
          <div className="text-center mb-16">
            <FadeUp>
              <h2 className="font-pretendard font-bold text-white mb-4">
                검증된 <span className="text-gradient">개발 프로세스</span>
              </h2>
              <p className="text-xl text-neutral-light/70 max-w-2xl mx-auto leading-relaxed">
                5단계 체계적 프로세스로 프로젝트 성공을 보장합니다
              </p>
            </FadeUp>
          </div>

          <div className="max-w-5xl mx-auto">
            {aboutData.processSteps.map((step, index) => (
              <FadeLeft key={index} delay={index * 150}>
                <div className="relative">
                  {/* Timeline Line */}
                  {index < aboutData.processSteps.length - 1 && (
                    <div className="absolute left-8 top-20 w-px h-24 bg-gradient-to-b from-primary to-shadow-gray/30"></div>
                  )}
                  
                  <div className="flex items-start space-x-8 mb-12">
                    {/* Step Number */}
                    <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-xl">{step.step}</span>
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 bg-shadow-gray/20 rounded-2xl p-6 border border-shadow-gray/30">
                      <div className="grid lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2">
                          <div className="flex items-center justify-between mb-3">
                            <h3 className="text-xl font-bold text-white">{step.title}</h3>
                            <span className="text-primary font-medium text-sm bg-primary/10 px-3 py-1 rounded-full">
                              {step.duration}
                            </span>
                          </div>
                          <p className="text-neutral-light/70 mb-4 leading-relaxed">{step.description}</p>
                          
                          <div className="mb-4">
                            <h4 className="text-white font-medium mb-2">주요 산출물</h4>
                            <div className="flex flex-wrap gap-2">
                              {step.deliverables.map((deliverable, idx) => (
                                <span key={idx} className="text-xs bg-accent-green/20 text-accent-green px-2 py-1 rounded-full">
                                  {deliverable}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-white font-medium mb-3">협업 도구</h4>
                          <div className="space-y-2">
                            {step.tools.map((tool, idx) => (
                              <div key={idx} className="flex items-center text-sm text-neutral-light/60">
                                <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                                {tool}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeLeft>
            ))}
          </div>
        </div>
      </section>

      {/* Team & Partners */}
      <section className="section-padding bg-shadow-gray/10">
        <div className="container-custom">
          <div className="text-center mb-16">
            <FadeUp>
              <h2 className="font-pretendard font-bold text-white mb-4">
                팀 & <span className="text-gradient">파트너 네트워크</span>
              </h2>
              <p className="text-xl text-neutral-light/70 max-w-2xl mx-auto leading-relaxed">
                1인 스튜디오 + 전문 파트너 네트워크로 최고의 결과를 보장합니다
              </p>
            </FadeUp>
          </div>

          {/* Founder */}
          <FadeUp>
            <div className="max-w-4xl mx-auto mb-16">
              <div className="bg-dark rounded-2xl p-8 border border-shadow-gray/30">
                <div className="grid lg:grid-cols-3 gap-8 items-center">
                  <div className="text-center lg:text-left">
                    <div className="w-32 h-32 mx-auto lg:mx-0 mb-6 bg-gradient-to-br from-primary/20 to-accent-green/20 rounded-full flex items-center justify-center">
                      <Users className="w-16 h-16 text-primary" />
                    </div>
                  </div>
                  
                  <div className="lg:col-span-2">
                    <h3 className="text-2xl font-bold text-white mb-2">{aboutData.team.founder.name}</h3>
                    <p className="text-primary font-medium mb-4">{aboutData.team.founder.role}</p>
                    <p className="text-neutral-light/70 mb-6 leading-relaxed">{aboutData.team.founder.bio}</p>
                    
                    <div className="flex flex-wrap gap-2">
                      {aboutData.team.founder.skills.map((skill, idx) => (
                        <span key={idx} className="text-xs bg-primary/20 text-primary px-3 py-1 rounded-full">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeUp>

          {/* Partners */}
          <div className="grid md:grid-cols-3 gap-8">
            {aboutData.team.partners.map((partner, index) => (
              <FadeUp key={index} delay={index * 100}>
                <div className="bg-dark rounded-xl p-6 border border-shadow-gray/30 text-center">
                  <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-primary/20 to-accent-green/20 rounded-full flex items-center justify-center">
                    <Users className="w-10 h-10 text-primary" />
                  </div>
                  <h4 className="text-lg font-bold text-white mb-1">{partner.name}</h4>
                  <p className="text-primary text-sm font-medium mb-2">{partner.role}</p>
                  <p className="text-neutral-light/60 text-sm">{partner.speciality}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Awards & Certifications */}
      <section className="section-padding bg-dark">
        <div className="container-custom">
          <div className="text-center mb-16">
            <FadeUp>
              <h2 className="font-pretendard font-bold text-white mb-4">
                수상 내역 & <span className="text-gradient">인증</span>
              </h2>
              <p className="text-xl text-neutral-light/70 max-w-2xl mx-auto leading-relaxed">
                업계에서 인정받은 전문성과 품질을 자랑합니다
              </p>
            </FadeUp>
          </div>

          {/* Awards */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {aboutData.awards.map((award, index) => (
              <FadeUp key={index} delay={index * 100}>
                <div className="bg-shadow-gray/20 rounded-xl p-6 border border-shadow-gray/30">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-accent-green/20 rounded-xl flex items-center justify-center">
                      <Award className="w-8 h-8 text-accent-green" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white mb-1">{award.title}</h4>
                      <p className="text-accent-green text-sm font-medium mb-1">{award.category}</p>
                      <p className="text-neutral-light/60 text-sm">{award.year}년</p>
                    </div>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>

          {/* Certifications & Partners */}
          <FadeUp>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-white mb-6">인증 & 자격</h3>
                <div className="grid grid-cols-2 gap-3">
                  {aboutData.certifications.map((cert, index) => (
                    <div key={index} className="bg-primary/10 rounded-lg p-3 text-center">
                      <span className="text-primary text-sm font-medium">{cert}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-white mb-6">파트너사</h3>
                <div className="grid grid-cols-2 gap-4">
                  {aboutData.partnerLogos.map((logo, index) => (
                    <div key={index} className="bg-shadow-gray/20 rounded-lg p-4 flex items-center justify-center h-16">
                      <span className="text-neutral-light/60 text-sm">Partner Logo</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>


      {/* CSR Declaration */}
      <section className="section-padding bg-dark">
        <div className="container-custom">
          <div className="text-center mb-16">
            <FadeUp>
              <h2 className="font-pretendard font-bold text-white mb-4">
                CSR & <span className="text-gradient">선언</span>
              </h2>
              <p className="text-xl text-neutral-light/70 max-w-2xl mx-auto leading-relaxed">
                책임감 있는 디지털 환경 구축을 위한 우리의 약속입니다
              </p>
            </FadeUp>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FadeUp delay={0}>
              <div className="bg-shadow-gray/20 rounded-xl p-6 border border-shadow-gray/30 h-full">
                <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-4">
                  <Accessibility className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-3">{aboutData.csr.accessibility.title}</h3>
                <p className="text-neutral-light/70 text-sm mb-4 leading-relaxed">{aboutData.csr.accessibility.description}</p>
                <ul className="space-y-2">
                  {aboutData.csr.accessibility.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-neutral-light/60">
                      <CheckCircle className="w-4 h-4 text-blue-400 mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeUp>

            <FadeUp delay={100}>
              <div className="bg-shadow-gray/20 rounded-xl p-6 border border-shadow-gray/30 h-full">
                <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-green-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-3">{aboutData.csr.privacy.title}</h3>
                <p className="text-neutral-light/70 text-sm mb-4 leading-relaxed">{aboutData.csr.privacy.description}</p>
                <ul className="space-y-2">
                  {aboutData.csr.privacy.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-neutral-light/60">
                      <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeUp>

            <FadeUp delay={200}>
              <div className="bg-shadow-gray/20 rounded-xl p-6 border border-shadow-gray/30 h-full">
                <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center mb-4">
                  <Lock className="w-6 h-6 text-red-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-3">{aboutData.csr.security.title}</h3>
                <p className="text-neutral-light/70 text-sm mb-4 leading-relaxed">{aboutData.csr.security.description}</p>
                <ul className="space-y-2">
                  {aboutData.csr.security.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-neutral-light/60">
                      <CheckCircle className="w-4 h-4 text-red-400 mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Media Kit */}
      <section className="section-padding bg-shadow-gray/10">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <FadeUp>
                <h2 className="font-pretendard font-bold text-white mb-4">
                  <span className="text-gradient">미디어 킷</span>
                </h2>
                <p className="text-xl text-neutral-light/70 leading-relaxed">
                  {aboutData.mediaKit.description}
                </p>
              </FadeUp>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {aboutData.mediaKit.downloads.map((item, index) => (
                <FadeUp key={index} delay={index * 100}>
                  <a
                    href={item.url}
                    className="block bg-dark rounded-xl p-6 border border-shadow-gray/30 hover:border-primary/30 transition-all duration-300 group"
                    download
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-primary transition-colors">
                          {item.type}
                        </h4>
                        <p className="text-neutral-light/60 text-sm">{item.format}</p>
                      </div>
                      <Download className="w-5 h-5 text-primary group-hover:translate-y-1 transition-transform" />
                    </div>
                  </a>
                </FadeUp>
              ))}
            </div>
          </div>
        </div>
      </section>

    </main>
  )
}