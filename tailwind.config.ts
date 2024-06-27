import { defineConfig } from 'windicss/helpers'

export default defineConfig({
  darkMode: 'class',
  shortcuts: {
    'wh-full': 'w-full h-full',
    'flex-row-center': 'flex justify-center items-center',
    'flex-row-between': 'flex justify-between items-center',
    'flex-row-end': 'flex justify-end items-center',
    'flex-col-center': 'flex flex-col justify-center items-center',
    'flex-x-center': 'flex justify-center',
    'flex-y-center': 'flex items-center',
    'i-flex-center': 'inline-flex justify-center items-center',
    'i-flex-x-center': 'inline-flex justify-center',
    'i-flex-y-center': 'inline-flex items-center',
    'nowrap-hidden': 'whitespace-nowrap overflow-hidden',
    'ellipsis-text': 'nowrap-hidden overflow-ellipsis',
    'transition-base': 'transition-all duration-300 ease-in-out',
    'absolute-lt': 'absolute left-0 top-0',
    'absolute-lb': 'absolute left-0 bottom-0',
    'absolute-rt': 'absolute right-0 top-0',
    'absolute-rb': 'absolute right-0 bottom-0',
    'absolute-tl': 'absolute-lt',
    'absolute-tr': 'absolute-rt',
    'absolute-bl': 'absolute-lb',
    'absolute-br': 'absolute-rb',
    'absolute-center': 'absolute-lt flex-row-center wh-full'
  },
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary-color)',
        primary_hover: 'var(--primary-color-hover)',
        primary_pressed: 'var(--primary-color-pressed)',
        primary_active: 'var(--primary-color-active)',
        info: 'var(--info-color)',
        info_hover: 'var(--info-color-hover)',
        info_pressed: 'var(--info-color-pressed)',
        info_active: 'var(--info-color-active)',
        success: 'var(--success-color)',
        success_hover: 'var(--success-color-hover)',
        success_pressed: 'var(--success-color-pressed)',
        success_active: 'var(--success-color-active)',
        warning: 'var(--warning-color)',
        warning_hover: 'var(--warning-color-hover)',
        warning_pressed: 'var(--warning-color-pressed)',
        warning_active: 'var(--warning-color-active)',
        error: 'var(--error-color)',
        error_hover: 'var(--error-color-hover)',
        error_pressed: 'var(--error-color-pressed)',
        error_active: 'var(--error-color-active)'
      },
      zIndex: {
        1000: 1000
      }
    }
  },
  extract: {
    include: ['src/**/*.{vue,html,jsx,tsx}'],
    exclude: ['node_modules', '.git', '.history', '.vscode']
  }
})
