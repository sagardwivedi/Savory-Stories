import { withTV } from 'tailwind-variants/dist/transformer.js';
import type { Config } from 'tailwindcss';

const config = {
  darkMode: ['class'],
  content: ['./src/**/*.{ts,tsx}'],
  prefix: '',
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: 'hsl(var(--color-bg))',
          inverse: 'hsl(var(--color-bg-inverse))',
          surface: 'hsl(var(--color-bg-surface))',
          muted: 'hsl(var(--color-bg-muted))',
          disabled: 'hsl(var(--color-bg-disabled))',
          overlay: 'hsl(var(--color-bg-overlay))',
          tooltip: 'hsl(var(--color-bg-tooltip))',
          neutral: {
            DEFAULT: 'hsl(var(--color-bg-neutral))',
            hover: 'hsl(var(--color-bg-neutral-hover))',
            active: 'hsl(var(--color-bg-neutral-active))',
          },
          primary: {
            DEFAULT: 'hsl(var(--color-bg-primary))',
            hover: 'hsl(var(--color-bg-primary-hover))',
            active: 'hsl(var(--color-bg-primary-active))',
          },
          success: {
            DEFAULT: 'hsl(var(--color-bg-success))',
            hover: 'hsl(var(--color-bg-success-hover))',
            active: 'hsl(var(--color-bg-success-active))',
            muted: {
              DEFAULT: 'hsl(var(--color-bg-success-muted))',
              hover: 'hsl(var(--color-bg-success-muted-hover))',
              active: 'hsl(var(--color-bg-success-muted-active))',
            },
          },
          danger: {
            DEFAULT: 'hsl(var(--color-bg-danger))',
            hover: 'hsl(var(--color-bg-danger-hover))',
            active: 'hsl(var(--color-bg-danger-active))',
            muted: {
              DEFAULT: 'hsl(var(--color-bg-danger-muted))',
              hover: 'hsl(var(--color-bg-danger-muted-hover))',
              active: 'hsl(var(--color-bg-danger-muted-active))',
            },
          },
          warning: {
            DEFAULT: 'hsl(var(--color-bg-warning))',
            hover: 'hsl(var(--color-bg-warning-hover))',
            active: 'hsl(var(--color-bg-warning-active))',
            muted: {
              DEFAULT: 'hsl(var(--color-bg-warning-muted))',
              hover: 'hsl(var(--color-bg-warning-muted-hover))',
              active: 'hsl(var(--color-bg-warning-muted-active))',
            },
          },
          accent: {
            DEFAULT: 'hsl(var(--color-bg-accent))',
            hover: 'hsl(var(--color-bg-accent-hover))',
            active: 'hsl(var(--color-bg-accent-active))',
            muted: {
              DEFAULT: 'hsl(var(--color-bg-accent-muted))',
              hover: 'hsl(var(--color-bg-accent-muted-hover))',
              active: 'hsl(var(--color-bg-accent-muted-active))',
            },
          },
        },
        fg: {
          DEFAULT: 'hsl(var(--color-fg))',
          muted: {
            DEFAULT: 'hsl(var(--color-fg-muted))',
            inverse: 'hsl(var(--color-fg-muted-inverse))',
          },
          inverse: 'hsl(var(--color-fg-inverse))',
          disabled: 'hsl(var(--color-fg-disabled))',
          link: {
            DEFAULT: 'hsl(var(--color-fg-link))',
            hover: 'hsl(var(--color-fg-link-hover))',
            active: 'hsl(var(--color-fg-link-active))',
            visited: 'hsl(var(--color-fg-link-visited))',
          },
          accent: 'hsl(var(--color-fg-accent))',
          success: 'hsl(var(--color-fg-success))',
          warning: 'hsl(var(--color-fg-warning))',
          danger: 'hsl(var(--color-fg-danger))',
          info: 'hsl(var(--color-fg-info))',
          onAccent: 'hsl(var(--color-fg-onAccent))',
          onNeutral: 'hsl(var(--color-fg-onNeutral))',
          onPrimary: 'hsl(var(--color-fg-onPrimary))',
          onSuccess: 'hsl(var(--color-fg-onSuccess))',
          onMutedSuccess: 'hsl(var(--color-fg-onMutedSuccess))',
          onDanger: 'hsl(var(--color-fg-onDanger))',
          onMutedDanger: 'hsl(var(--color-fg-onMutedDanger))',
          onWarning: 'hsl(var(--color-fg-onWarning))',
          onMutedWarning: 'hsl(var(--color-fg-onMutedWarning))',
          onTooltip: 'hsl(var(--color-fg-onTooltip))',
        },
        border: {
          DEFAULT: 'hsl(var(--color-border))',
          field: 'hsl(var(--color-border-field))',
          control: 'hsl(var(--color-border-control))',
          hover: 'hsl(var(--color-border-hover))',
          active: 'hsl(var(--color-border-active))',
          disabled: 'hsl(var(--color-border-disabled))',
          danger: 'hsl(var(--color-border-danger))',
          success: 'hsl(var(--color-border-success))',
          warning: 'hsl(var(--color-border-warning))',
          info: 'hsl(var(--color-border-info))',
          secondary: 'hsl(var(--color-border-secondary))',
          focus: 'hsl(var(--color-border-focus))',
          inverse: 'hsl(var(--color-border-inverse))',
        },
      },
      transitionTimingFunction: {
        drawer: 'cubic-bezier(0.32,0.72,0,1)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'progress-grow': {
          '0%': {
            transform: 'scaleX(0.01)',
          },
          '20%': {
            transform: 'scaleX(0.1)',
          },
          '30%': {
            transform: 'scaleX(0.6)',
          },
          '40%,50%': {
            transform: 'scaleX(0.9)',
          },
          '100%': {
            transform: 'scaleX(1)',
          },
        },
        'progress-pulse': {
          '0%': {
            'mask-position': '200% center',
          },
          '100%': {
            'mask-position': '0% center',
          },
        },
      },
      animation: {
        'progress-indeterminate':
          'progress-grow var(--progress-duration) 1 both normal, progress-pulse 1s ease var(--progress-duration) infinite normal none running',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    require('tailwindcss-react-aria-components'),
  ],
} satisfies Config;

export default withTV(config);
