'use client'

import { Check } from 'lucide-react'

interface ProgressBarProps {
  currentStep: number
  totalSteps?: number
}

const steps = [
  { number: 1, label: '기본 정보' },
  { number: 2, label: '프로젝트 상세' },
  { number: 3, label: '예산과 일정' }
]

export default function ProgressBar({ currentStep, totalSteps = 3 }: ProgressBarProps) {
  return (
    <div className="sticky top-0 z-40 bg-background-primary/90 backdrop-blur-sm border-b border-white/10 py-6">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between relative">
            {/* Progress Line */}
            <div className="absolute top-6 left-0 h-0.5 bg-white/20 w-full">
              <div 
                className="h-full bg-gradient-to-r from-primary to-accent-green transition-all duration-500 ease-out"
                style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
              />
            </div>

            {/* Steps */}
            {steps.map((step, index) => {
              const isCompleted = currentStep > step.number
              const isActive = currentStep === step.number
              const isPending = currentStep < step.number

              return (
                <div key={step.number} className="flex flex-col items-center relative">
                  {/* Step Circle */}
                  <div 
                    className={`
                      w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 z-10 bg-background-primary
                      ${isCompleted 
                        ? 'border-accent-green bg-accent-green text-white' 
                        : isActive 
                        ? 'border-primary bg-primary text-white animate-pulse' 
                        : 'border-white/30 text-white/50'
                      }
                    `}
                  >
                    {isCompleted ? (
                      <Check className="w-6 h-6" />
                    ) : (
                      <span className="font-bold text-sm">{step.number}</span>
                    )}
                  </div>

                  {/* Step Label */}
                  <div className="mt-3 text-center">
                    <span 
                      className={`
                        text-sm font-medium transition-colors duration-300
                        ${isCompleted || isActive ? 'text-white' : 'text-white/50'}
                      `}
                    >
                      {step.label}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Progress Percentage */}
          <div className="mt-6 text-center">
            <span className="text-white/60 text-sm">
              진행률: <span className="text-primary font-semibold">{Math.round((currentStep / totalSteps) * 100)}%</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}