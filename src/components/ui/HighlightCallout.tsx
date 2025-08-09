interface HighlightCalloutProps {
  children: React.ReactNode
  type?: 'insight' | 'tip' | 'warning' | 'success'
  title?: string
}

export default function HighlightCallout({ 
  children, 
  type = 'insight', 
  title 
}: HighlightCalloutProps) {
  const getStyles = () => {
    switch (type) {
      case 'tip':
        return {
          container: 'bg-green-50 border-green-200 border-l-4 border-l-green-500',
          icon: 'text-green-600',
          title: 'text-green-900',
          content: 'text-green-800',
          iconPath: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z'
        }
      case 'warning':
        return {
          container: 'bg-amber-50 border-amber-200 border-l-4 border-l-amber-500',
          icon: 'text-amber-600',
          title: 'text-amber-900',
          content: 'text-amber-800',
          iconPath: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
        }
      case 'success':
        return {
          container: 'bg-emerald-50 border-emerald-200 border-l-4 border-l-emerald-500',
          icon: 'text-emerald-600',
          title: 'text-emerald-900',
          content: 'text-emerald-800',
          iconPath: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
        }
      default: // insight
        return {
          container: 'bg-blue-50 border-blue-200 border-l-4 border-l-blue-500',
          icon: 'text-blue-600',
          title: 'text-blue-900',
          content: 'text-blue-800',
          iconPath: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
        }
    }
  }

  const styles = getStyles()
  const defaultTitles = {
    insight: '💡 핵심 인사이트',
    tip: '💭 팁',
    warning: '⚠️ 주의사항',
    success: '✅ 성공 포인트'
  }

  return (
    <div className={`rounded-xl p-6 my-8 ${styles.container}`} role="note" aria-labelledby="callout-title">
      <div className="flex items-start gap-4">
        <div className={`flex-shrink-0 ${styles.icon}`}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={styles.iconPath} />
          </svg>
        </div>
        
        <div className="flex-1">
          <h4 
            id="callout-title" 
            className={`font-semibold mb-2 ${styles.title}`}
          >
            {title || defaultTitles[type]}
          </h4>
          <div className={`prose prose-sm max-w-none ${styles.content}`}>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}