// Theme constants
export const THEME_COLORS = {
  PRIMARY: 'var(--primary)',
  BACKGROUND: 'var(--background)',
  FOREGROUND: 'var(--foreground)',
  CARD: 'var(--card)',
  MUTED: 'var(--muted)',
} as const;

// Layout constants
export const LAYOUT = {
  CONTAINER_MAX_WIDTH: 'max-w-6xl',
  GRID_GAPS: {
    SM: 'gap-4',
    MD: 'gap-6',
    LG: 'gap-8',
  },
  SPACING: {
    SM: 'mb-6',
    MD: 'mb-12',
    LG: 'mb-16',
  },
} as const;

// Animation constants
export const TRANSITIONS = {
  DEFAULT: 'transition-colors',
  ALL: 'transition-all',
  SHADOW: 'transition-shadow',
} as const;

// Common class combinations
export const COMMON_CLASSES = {
  CARD_BASE: 'bg-card rounded-lg border border-border',
  BUTTON_BASE: 'inline-flex items-center justify-center rounded-lg font-semibold transition-colors',
  HOVER_LIFT: 'hover:shadow-lg transition-shadow',
  TEXT_MUTED: 'text-muted-foreground',
} as const;