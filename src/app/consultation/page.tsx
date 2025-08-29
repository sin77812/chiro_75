'use client'

import { useState } from 'react'
import { Metadata } from 'next'
import ConsultationHero from '@/components/consultation/ConsultationHero'
import ProgressBar from '@/components/consultation/ProgressBar'
import ConsultationForm from '@/components/consultation/ConsultationForm'
import InfoPanel from '@/components/consultation/InfoPanel'
import SuccessScreen from '@/components/consultation/SuccessScreen'

interface FormData {
  // Step 1: Basic Info
  name: string
  company: string
  phone: string
  email: string
  contactMethod: 'phone' | 'kakao' | 'email'
  
  // Step 2: Project Details
  projectType: string[]
  hasWebsite: 'new' | 'renewal' | ''
  currentWebsite: string
  features: string[]
  reference: string
  
  // Step 3: Budget & Timeline
  budget: string
  timeline: string
  additional: string
  privacyConsent: boolean
}

export default function ConsultationPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isComplete, setIsComplete] = useState(false)
  const [formData, setFormData] = useState<Partial<FormData>>({})

  const handleStepComplete = async (stepData: Partial<FormData>) => {
    const updatedFormData = { ...formData, ...stepData }
    setFormData(updatedFormData)
    
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    } else {
      // Submit form to backend and show success screen
      try {
        console.log('Sending consultation data:', updatedFormData)
        
        const response = await fetch('/api/consultation', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedFormData),
        })

        if (response.ok) {
          const result = await response.json()
          console.log('Email sent successfully:', result)
          setIsComplete(true)
        } else {
          const error = await response.json()
          console.error('Failed to send consultation:', error)
          alert('견적 신청 전송에 실패했습니다. 다시 시도해주세요.')
        }
      } catch (error) {
        console.error('Error sending consultation:', error)
        alert('네트워크 오류가 발생했습니다. 인터넷 연결을 확인해주세요.')
      }
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  // Show success screen if form is complete
  if (isComplete) {
    return <SuccessScreen formData={formData} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background-primary via-background-secondary to-background-primary">
      {/* Hero Section */}
      <ConsultationHero />
      
      {/* Progress Bar */}
      <ProgressBar currentStep={currentStep} />
      
      {/* Main Content */}
      <div className="container-custom py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Form Section */}
            <div className="lg:col-span-2">
              <ConsultationForm
                currentStep={currentStep}
                onStepComplete={handleStepComplete}
                onBack={handleBack}
                initialData={formData}
              />
            </div>
            
            {/* Info Panel */}
            <div className="lg:col-span-1">
              <InfoPanel currentStep={currentStep} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Note: In Next.js 15, you cannot export metadata from client components
// You would need to create a separate layout.tsx in the consultation folder
// or move the metadata to a parent layout if needed