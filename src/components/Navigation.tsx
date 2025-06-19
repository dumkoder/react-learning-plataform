'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BookOpen, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { useContent, getContent } from '@/hooks/useContent'
import { getNavigationItems } from '@/lib/utils'

export function Navigation() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const { content } = useContent()
  const navigationItems = getNavigationItems()

  return (
    <nav className="bg-card shadow-lg border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="flex items-center space-x-2">
            <BookOpen className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-foreground">{getContent(content, 'navigation.brand', 'React Learning')}</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  pathname === item.href
                    ? 'bg-accent text-accent-foreground'
                    : 'text-muted-foreground hover:text-primary hover:bg-accent/50'
                }`}
              >
                {getContent(content, `navigation.${item.name}`, item.name)}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md text-muted-foreground hover:text-primary"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  pathname === item.href
                    ? 'bg-accent text-accent-foreground'
                    : 'text-muted-foreground hover:text-primary hover:bg-accent/50'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {getContent(content, `navigation.${item.name}`, item.name)}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}