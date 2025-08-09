import Link from 'next/link'
import { cn } from '@/lib/utils'

interface LogoProps {
  variant?: 'default' | 'compact'
  className?: string
  linkClassName?: string
  showText?: boolean
}

export default function Logo({ 
  variant = 'default', 
  className = '', 
  linkClassName = '',
  showText = true 
}: LogoProps) {
  const logoSize = variant === 'compact' ? 'h-8 w-8' : 'h-10 w-10'
  const textSize = variant === 'compact' ? 'text-xl' : 'text-2xl'

  return (
    <Link 
      href="/"
      className={cn(
        "flex items-center space-x-3 hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-dark rounded-lg",
        linkClassName
      )}
      aria-label="CHIRO 홈페이지"
    >
      {/* Logo Symbol */}
      <div className={cn(
        "flex items-center justify-center bg-gradient-to-br from-primary to-accent-green rounded-lg p-1.5",
        logoSize,
        className
      )}>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="w-full h-full text-white"
          aria-hidden="true"
        >
          {/* Abstract C + H shapes representing CHIRO */}
          <path
            d="M6 4C4.89543 4 4 4.89543 4 6V18C4 19.1046 4.89543 20 6 20H8V18H6V6H8V4H6Z"
            fill="currentColor"
          />
          <path
            d="M10 4V9H14V4H16V20H14V11H10V20H8V4H10Z"
            fill="currentColor"
          />
          <path
            d="M18 4V6H20V18H18V20H20C21.1046 20 22 19.1046 22 18V6C22 4.89543 21.1046 4 20 4H18Z"
            fill="currentColor"
          />
        </svg>
      </div>

      {/* Logo Text */}
      {showText && (
        <div className={cn(
          "font-inter font-bold text-white tracking-tight",
          textSize
        )}>
          CHIRO
          <span className="text-primary text-lg ml-1">.</span>
        </div>
      )}
    </Link>
  )
}