import { type ClassValue, clsx } from "clsx";
import { BookOpen, Code, PlayCircle, Users, LucideIcon } from 'lucide-react';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function getDifficultyColor(difficulty: string): string {
  switch (difficulty.toLowerCase()) {
    case 'beginner':
      return 'bg-green-500/10 text-green-400';
    case 'intermediate':
      return 'bg-yellow-500/10 text-yellow-400';
    case 'advanced':
      return 'bg-red-500/10 text-red-400';
    default:
      return 'bg-muted text-muted-foreground';
  }
}

export function formatDuration(duration: string): string {
  return duration;
}

export function getNavigationItems() {
  return [
    { name: 'home', href: '/' },
    { name: 'fundamentals', href: '/fundamentals' },
    { name: 'hooks', href: '/hooks' },
    { name: 'advanced', href: '/advanced' },
    { name: 'redux', href: '/redux' },
    { name: 'routing', href: '/routing' },
    { name: 'testing', href: '/testing' },
    { name: 'playground', href: '/playground' },
  ];
}

export function getFeatureIcons() {
  return [BookOpen, Code, PlayCircle, Users];
}

export function getFeatureHrefs() {
  return ["/fundamentals", "/playground", "/advanced", "/hooks"];
}

export function createFeatures(contentFeatures: unknown[], icons: LucideIcon[], hrefs: string[]) {
  return contentFeatures.map((feature: unknown, index) => ({
    icon: icons[index] || BookOpen,
    title: (feature as { title?: string })?.title || '',
    description: (feature as { description?: string })?.description || '',
    href: hrefs[index] || '/'
  }));
}

export function transformCodeForPreview(code: string): string {
  // Remove import statements and replace with direct usage
  let transformedCode = code
    .replace(/import\s+React[^;]*;?\s*/g, '')
    .replace(/import\s+\{[^}]*\}\s+from\s+['"]react['"];?\s*/g, '')
    .replace(/import[^;]*;?\s*/g, '');
  
  // Replace React hooks with React.hookName
  transformedCode = transformedCode
    .replace(/\buseState\b/g, 'React.useState')
    .replace(/\buseEffect\b/g, 'React.useEffect')
    .replace(/\buseContext\b/g, 'React.useContext')
    .replace(/\buseReducer\b/g, 'React.useReducer')
    .replace(/\buseMemo\b/g, 'React.useMemo')
    .replace(/\buseCallback\b/g, 'React.useCallback')
    .replace(/\buseRef\b/g, 'React.useRef');
  
  // Ensure there's a default export
  if (!transformedCode.includes('export default')) {
    transformedCode = transformedCode.replace(/function\s+(\w+)/, 'function App');
    transformedCode += '\n// Auto-generated export\nconst App = App || (() => <div>Component not found</div>);';
  } else {
    transformedCode = transformedCode.replace(/export\s+default\s+(\w+);?/, '');
  }
  
  return transformedCode;
}