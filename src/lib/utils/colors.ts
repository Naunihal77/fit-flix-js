// Fitflix Blog System Color Tokens
// This file defines the consistent color palette for all blog-related components

export const blogColors = {
  // Primary colors
  primary: '#1E293B',      // Dark blue-gray for main elements
  secondary: '#64748B',    // Medium blue-gray for secondary elements
  accent: '#F97316',       // Orange for highlights and CTAs
  
  // Background colors
  background: '#FFFFFF',   // White for main backgrounds
  surface: '#F1F5F9',     // Light gray for surface backgrounds
  
  // Text colors
  text: '#0F172A',        // Dark text for headings and primary content
  mutedText: '#475569',   // Medium gray for secondary text
  
  // Border colors
  border: '#CBD5E1',      // Light gray for borders and dividers
  
  // Semantic mappings for existing colors
  // Replace hardcoded colors with these tokens
  heroGradient: {
    from: '#F97316',      // accent
    to: '#F97316'         // accent (single color for consistency)
  },
  
  // Status colors (using accent variations)
  status: {
    draft: '#FEF3C7',     // Light yellow
    published: '#D1FAE5', // Light green
    archived: '#F1F5F9'  // surface
  },
  
  // Interactive states
  interactive: {
    hover: '#EA580C',     // Darker orange for hover states
    active: '#C2410C'     // Even darker for active states
  }
} as const;

// CSS custom properties for use in CSS files
export const cssColorVariables = `
  :root {
    --blog-primary: ${blogColors.primary};
    --blog-secondary: ${blogColors.secondary};
    --blog-accent: ${blogColors.accent};
    --blog-background: ${blogColors.background};
    --blog-surface: ${blogColors.surface};
    --blog-text: ${blogColors.text};
    --blog-muted-text: ${blogColors.mutedText};
    --blog-border: ${blogColors.border};
    --blog-hover: ${blogColors.interactive.hover};
    --blog-active: ${blogColors.interactive.active};
  }
`;

// Tailwind color classes mapping
export const tailwindColorMap = {
  // Replace hardcoded colors with semantic Tailwind classes
  primary: 'text-slate-800',           // #1E293B
  secondary: 'text-slate-500',         // #64748B
  accent: 'text-orange-500',           // #F97316
  background: 'bg-white',               // #FFFFFF
  surface: 'bg-slate-50',              // #F1F5F9
  text: 'text-slate-900',              // #0F172A
  mutedText: 'text-slate-600',         // #475569
  border: 'border-slate-200',          // #CBD5E1
  
  // Interactive states
  hover: 'hover:text-orange-600',      // #EA580C
  active: 'active:text-orange-700',    // #C2410C
  
  // Status badges
  statusDraft: 'bg-yellow-100 text-yellow-800',
  statusPublished: 'bg-green-100 text-green-800',
  statusArchived: 'bg-slate-100 text-slate-800'
} as const;
