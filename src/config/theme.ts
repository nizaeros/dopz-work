export const theme = {
  colors: {
    primary: {
      DEFAULT: '#132490',
      dark: '#0e1b6b',
      light: '#c1cbf7',
      bg: 'rgba(19, 36, 144, 0.1)'
    },
    gray: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827'
    },
    success: {
      light: '#dcfce7',
      DEFAULT: '#22c55e',
      dark: '#166534'
    },
    error: {
      light: '#fee2e2',
      DEFAULT: '#ef4444',
      dark: '#991b1b'
    }
  },
  transitions: {
    DEFAULT: 'all 0.2s ease-in-out',
    fast: 'all 0.1s ease-in-out',
    slow: 'all 0.3s ease-in-out'
  },
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)'
  },
  focus: {
    DEFAULT: 'outline-none ring-2 ring-primary ring-offset-2',
    error: 'outline-none ring-2 ring-error ring-offset-2'
  }
} as const;

export type Theme = typeof theme;