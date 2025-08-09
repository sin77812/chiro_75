'use client'

import React, { useState, useRef, useEffect, ReactNode, ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react'
import Link from 'next/link'
import { ChevronDown, ExternalLink, AlertCircle, CheckCircle, Info, X } from 'lucide-react'

// Skip Navigation Link
export function SkipNav() {
  return (
    <a 
      href="#main-content" 
      className="skip-link"
      aria-label="Skip to main content"
    >
      Skip to main content
    </a>
  )
}

// Accessible Button with loading states
interface AccessibleButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  loadingText?: string
  children: ReactNode
}

export function AccessibleButton({
  variant = 'primary',
  size = 'md',
  loading = false,
  loadingText = 'Loading...',
  children,
  disabled,
  'aria-label': ariaLabel,
  ...props
}: AccessibleButtonProps) {
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3',
    lg: 'px-8 py-4 text-lg'
  }

  const variantClasses = {
    primary: 'btn-primary',
    secondary: 'btn-secondary', 
    ghost: 'btn-ghost',
    danger: 'bg-red-600 hover:bg-red-700 focus:bg-red-700 text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-dark'
  }

  return (
    <button
      className={`${variantClasses[variant]} ${sizeClasses[size]} inline-flex items-center justify-center transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed`}
      disabled={disabled || loading}
      aria-label={ariaLabel || (loading ? loadingText : undefined)}
      aria-busy={loading}
      {...props}
    >
      {loading ? (
        <>
          <svg
            className="animate-spin -ml-1 mr-3 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <span className="sr-only">{loadingText}</span>
          {loadingText}
        </>
      ) : (
        children
      )}
    </button>
  )
}

// Accessible Link component
interface AccessibleLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
  external?: boolean
  children: ReactNode
  showExternalIcon?: boolean
}

export function AccessibleLink({
  href,
  external = false,
  showExternalIcon = true,
  children,
  className = '',
  ...props
}: AccessibleLinkProps) {
  const isExternal = external || href.startsWith('http')
  
  const linkProps = {
    className: `focus-visible ${className}`,
    ...(isExternal && {
      target: '_blank',
      rel: 'noopener noreferrer',
      'aria-describedby': 'external-link-description'
    }),
    ...props
  }

  const content = (
    <>
      {children}
      {isExternal && showExternalIcon && (
        <ExternalLink className="inline w-4 h-4 ml-1" aria-hidden="true" />
      )}
    </>
  )

  if (isExternal) {
    return (
      <>
        <a href={href} {...linkProps}>
          {content}
        </a>
        <span id="external-link-description" className="sr-only">
          Opens in a new tab
        </span>
      </>
    )
  }

  return (
    <Link href={href} {...linkProps}>
      {content}
    </Link>
  )
}

// Accessible Accordion/FAQ Component
interface AccordionItemProps {
  id: string
  title: string
  children: ReactNode
  defaultOpen?: boolean
}

export function AccordionItem({ id, title, children, defaultOpen = false }: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  const contentRef = useRef<HTMLDivElement>(null)

  return (
    <div className="border border-shadow-gray/30 rounded-xl overflow-hidden">
      <button
        className="w-full p-6 text-left flex items-center justify-between bg-shadow-gray/20 hover:bg-shadow-gray/30 focus:bg-shadow-gray/30 transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
        aria-expanded={isOpen}
        aria-controls={`accordion-content-${id}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg font-pretendard font-semibold text-white pr-4">
          {title}
        </span>
        <ChevronDown 
          className={`h-5 w-5 text-primary transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
          aria-hidden="true"
        />
      </button>
      
      <div
        id={`accordion-content-${id}`}
        ref={contentRef}
        className={`transition-all duration-300 overflow-hidden ${
          isOpen ? 'max-h-96' : 'max-h-0'
        }`}
        aria-hidden={!isOpen}
      >
        <div className="p-6 pt-0 border-t border-shadow-gray/30">
          <div className="text-neutral-light/80 leading-relaxed">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

// Accessible Form Components
interface AccessibleInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
  hint?: string
  required?: boolean
}

export function AccessibleInput({
  label,
  error,
  hint,
  required = false,
  id,
  className = '',
  ...props
}: AccessibleInputProps) {
  const inputId = id || `input-${Math.random().toString(36).substring(7)}`
  const hintId = hint ? `${inputId}-hint` : undefined
  const errorId = error ? `${inputId}-error` : undefined

  return (
    <div className="space-y-2">
      <label
        htmlFor={inputId}
        className="block text-sm font-medium text-white"
      >
        {label}
        {required && (
          <span className="text-red-400 ml-1" aria-label="required">
            *
          </span>
        )}
      </label>
      
      {hint && (
        <p id={hintId} className="text-sm text-neutral-light/60">
          {hint}
        </p>
      )}
      
      <input
        id={inputId}
        className={`input-field ${error ? 'input-error' : ''} ${className}`}
        aria-describedby={[hintId, errorId].filter(Boolean).join(' ') || undefined}
        aria-invalid={error ? 'true' : undefined}
        required={required}
        {...props}
      />
      
      {error && (
        <p id={errorId} className="text-sm text-red-400 flex items-center">
          <AlertCircle className="w-4 h-4 mr-1 flex-shrink-0" aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  )
}

// Accessible Select Component
interface AccessibleSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string
  options: { value: string; label: string }[]
  error?: string
  hint?: string
  required?: boolean
}

export function AccessibleSelect({
  label,
  options,
  error,
  hint,
  required = false,
  id,
  className = '',
  ...props
}: AccessibleSelectProps) {
  const selectId = id || `select-${Math.random().toString(36).substring(7)}`
  const hintId = hint ? `${selectId}-hint` : undefined
  const errorId = error ? `${selectId}-error` : undefined

  return (
    <div className="space-y-2">
      <label
        htmlFor={selectId}
        className="block text-sm font-medium text-white"
      >
        {label}
        {required && (
          <span className="text-red-400 ml-1" aria-label="required">
            *
          </span>
        )}
      </label>
      
      {hint && (
        <p id={hintId} className="text-sm text-neutral-light/60">
          {hint}
        </p>
      )}
      
      <select
        id={selectId}
        className={`input-field ${error ? 'input-error' : ''} ${className}`}
        aria-describedby={[hintId, errorId].filter(Boolean).join(' ') || undefined}
        aria-invalid={error ? 'true' : undefined}
        required={required}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      
      {error && (
        <p id={errorId} className="text-sm text-red-400 flex items-center">
          <AlertCircle className="w-4 h-4 mr-1 flex-shrink-0" aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  )
}

// Alert/Notification Component
interface AlertProps {
  type: 'info' | 'success' | 'warning' | 'error'
  title?: string
  children: ReactNode
  onClose?: () => void
  className?: string
}

export function Alert({ type, title, children, onClose, className = '' }: AlertProps) {
  const typeConfig = {
    info: {
      icon: Info,
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/30',
      iconColor: 'text-blue-400',
      titleColor: 'text-blue-300'
    },
    success: {
      icon: CheckCircle,
      bgColor: 'bg-accent-green/10', 
      borderColor: 'border-accent-green/30',
      iconColor: 'text-accent-green',
      titleColor: 'text-accent-green'
    },
    warning: {
      icon: AlertCircle,
      bgColor: 'bg-yellow-500/10',
      borderColor: 'border-yellow-500/30', 
      iconColor: 'text-yellow-400',
      titleColor: 'text-yellow-300'
    },
    error: {
      icon: AlertCircle,
      bgColor: 'bg-red-500/10',
      borderColor: 'border-red-500/30',
      iconColor: 'text-red-400', 
      titleColor: 'text-red-300'
    }
  }

  const config = typeConfig[type]
  const Icon = config.icon

  return (
    <div
      className={`p-4 rounded-lg border ${config.bgColor} ${config.borderColor} ${className}`}
      role={type === 'error' ? 'alert' : 'status'}
      aria-live={type === 'error' ? 'assertive' : 'polite'}
    >
      <div className="flex items-start">
        <Icon className={`w-5 h-5 ${config.iconColor} flex-shrink-0 mt-0.5`} aria-hidden="true" />
        
        <div className="ml-3 flex-1">
          {title && (
            <h3 className={`text-sm font-medium ${config.titleColor} mb-1`}>
              {title}
            </h3>
          )}
          <div className="text-sm text-neutral-light/80">
            {children}
          </div>
        </div>
        
        {onClose && (
          <button
            onClick={onClose}
            className={`ml-3 ${config.iconColor} hover:opacity-75 focus:opacity-75 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent`}
            aria-label="Close alert"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  )
}

// Progress Bar Component
interface ProgressBarProps {
  value: number
  max?: number
  label?: string
  showValue?: boolean
  className?: string
}

export function ProgressBar({ 
  value, 
  max = 100, 
  label, 
  showValue = true, 
  className = '' 
}: ProgressBarProps) {
  const percentage = Math.round((value / max) * 100)
  
  return (
    <div className={`space-y-2 ${className}`}>
      {(label || showValue) && (
        <div className="flex justify-between text-sm">
          {label && <span className="text-white font-medium">{label}</span>}
          {showValue && (
            <span className="text-neutral-light/60" aria-live="polite">
              {percentage}%
            </span>
          )}
        </div>
      )}
      
      <div className="w-full bg-shadow-gray/30 rounded-full h-2 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-primary to-accent-green transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
          aria-label={label || `Progress: ${percentage}%`}
        />
      </div>
    </div>
  )
}

// Screen Reader Only Text
export function ScreenReaderText({ children }: { children: ReactNode }) {
  return <span className="sr-only">{children}</span>
}