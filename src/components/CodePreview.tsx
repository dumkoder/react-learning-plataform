'use client'

import { useEffect, useRef, useState } from 'react'
import { AlertCircle } from 'lucide-react'
import { useContent, getContent } from '@/hooks/useContent'
import { transformCodeForPreview } from '@/lib/utils'

interface CodePreviewProps {
  code: string
}

export function CodePreview({ code }: CodePreviewProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { content } = useContent()

  useEffect(() => {
    if (!iframeRef.current) return

    setIsLoading(true)
    setError(null)

    try {
      // Transform the code to make it work in the iframe
      const transformedCode = transformCodeForPreview(code)
      
      const html = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>React Preview</title>
            <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
            <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
            <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
            <style>
              body {
                margin: 0;
                padding: 16px;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                background: #0a0a0a;
                color: #ededed;
              }
              .error {
                color: #dc3545;
                background: #f8d7da;
                border: 1px solid #f5c6cb;
                padding: 16px;
                border-radius: 4px;
                font-family: monospace;
                white-space: pre-wrap;
                margin: 16px 0;
              }
              .loading {
                display: flex;
                align-items: center;
                justify-content: center;
                height: 200px;
                color: #6c757d;
              }
            </style>
          </head>
          <body>
            <div id="root">
              <div class="loading">Loading...</div>
            </div>
            
            <script type="text/babel">
              try {
                ${transformedCode}
                
                // Render the component
                const root = ReactDOM.createRoot(document.getElementById('root'));
                root.render(React.createElement(App));
                
                // Send success message to parent
                window.parent.postMessage({ type: 'success' }, '*');
              } catch (error) {
                console.error('Render error:', error);
                document.getElementById('root').innerHTML = 
                  '<div class="error">Error: ' + error.message + '</div>';
                  
                // Send error message to parent
                window.parent.postMessage({ 
                  type: 'error', 
                  message: error.message 
                }, '*');
              }
            </script>
          </body>
        </html>
      `

      const blob = new Blob([html], { type: 'text/html' })
      const url = URL.createObjectURL(blob)
      
      iframeRef.current.src = url

      // Clean up
      return () => {
        URL.revokeObjectURL(url)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
      setIsLoading(false)
    }
  }, [code])

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'error') {
        setError(event.data.message)
        setIsLoading(false)
      } else if (event.data.type === 'success') {
        setError(null)
        setIsLoading(false)
      }
    }

    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [])


  return (
    <div className="border border-border rounded-lg overflow-hidden bg-card">
      <div className="bg-muted px-4 py-2 border-b border-border">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-foreground">{getContent(content, 'common.preview', 'Preview')}</span>
          {isLoading && (
            <span className="text-xs text-muted-foreground">{getContent(content, 'common.loading', 'Loading...')}</span>
          )}
          {error && (
            <div className="flex items-center text-red-600">
              <AlertCircle className="h-4 w-4 mr-1" />
              <span className="text-xs">{getContent(content, 'common.error', 'Error')}</span>
            </div>
          )}
        </div>
      </div>
      
      {error ? (
        <div className="p-4">
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
            <div className="flex items-start">
              <AlertCircle className="h-5 w-5 text-destructive mr-2 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="text-sm font-medium text-destructive">
                  Compilation Error
                </h4>
                <pre className="text-sm text-destructive/80 mt-2 whitespace-pre-wrap font-mono">
                  {error}
                </pre>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <iframe
          ref={iframeRef}
          className="w-full h-96 border-0"
          title="React Preview"
          sandbox="allow-scripts"
        />
      )}
    </div>
  )
}