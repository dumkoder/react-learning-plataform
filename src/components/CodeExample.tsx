'use client'

import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

interface CodeExampleProps {
  code: string
  language?: string
  title?: string
  explanation?: string
}

export function CodeExample({ code, language = 'javascript', title, explanation }: CodeExampleProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {title && (
        <div className="bg-muted px-4 py-2 border-b border-border">
          <h4 className="text-sm font-medium text-foreground">{title}</h4>
        </div>
      )}
      
      <div className="relative">
        <pre className="overflow-x-auto p-4 bg-gray-900 text-gray-100">
          <code className={`language-${language}`}>
            {code}
          </code>
        </pre>
        
        <button
          onClick={handleCopy}
          className="absolute top-2 right-2 p-2 bg-gray-800 hover:bg-gray-700 rounded-md transition-colors"
          title="Copy code"
        >
          {copied ? (
            <Check className="h-4 w-4 text-green-400" />
          ) : (
            <Copy className="h-4 w-4 text-gray-400" />
          )}
        </button>
      </div>
      
      {explanation && (
        <div className="px-4 py-3 bg-accent border-t border-border">
          <p className="text-sm text-accent-foreground">{explanation}</p>
        </div>
      )}
    </div>
  )
}