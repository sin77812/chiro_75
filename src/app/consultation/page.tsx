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

  const handleStepComplete = (stepData: Partial<FormData>) => {
    const updatedFormData = { ...formData, ...stepData }
    setFormData(updatedFormData)
    
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    } else {
      // Submit form and show success screen
      setIsComplete(true)
      // Here you would typically send the data to your backend
      console.log('Final form data:', updatedFormData)
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