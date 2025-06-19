import { useState, useEffect } from 'react';

interface Content {
  [key: string]: unknown;
}

let contentCache: Content | null = null;

export function useContent(language: string = 'en'): {
  content: Content | null;
  loading: boolean;
  error: string | null;
} {
  const [content, setContent] = useState<Content | null>(contentCache);
  const [loading, setLoading] = useState(contentCache === null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (contentCache) {
      setContent(contentCache);
      setLoading(false);
      return;
    }

    const loadContent = async () => {
      try {
        setLoading(true);
        const response = await import(`../content/${language}.json`);
        const loadedContent = response.default;
        
        contentCache = loadedContent;
        setContent(loadedContent);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load content');
        console.error('Failed to load content:', err);
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, [language]);

  return { content, loading, error };
}

// Helper function to get nested content with dot notation
export function getContent(content: Content | null, path: string, fallback: string = ''): string {
  if (!content) return fallback;
  
  const keys = path.split('.');
  let current: unknown = content;
  
  for (const key of keys) {
    if (current && typeof current === 'object' && current !== null && key in current) {
      current = (current as Record<string, unknown>)[key];
    } else {
      return fallback;
    }
  }
  
  return typeof current === 'string' ? current : fallback;
}

// Helper function to get array content
export function getArrayContent(content: Content | null, path: string): unknown[] {
  if (!content) return [];
  
  const keys = path.split('.');
  let current: unknown = content;
  
  for (const key of keys) {
    if (current && typeof current === 'object' && current !== null && key in current) {
      current = (current as Record<string, unknown>)[key];
    } else {
      return [];
    }
  }
  
  return Array.isArray(current) ? current : [];
}