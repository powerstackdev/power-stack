// src/smooth-doc/theme.js
import { theme as baseTheme } from 'smooth-doc/src/theme'

export const theme = {
  ...baseTheme,
  colors: {
    ...baseTheme.colors,
    'primary-50': '#FFF0B8',
    'primary-100': '#FFEBA3',
    'primary-200': '#FFE27A',
    'primary-300': '#FFDA52',
    'primary-400': '#FFD129',
    'primary-500': '#FFC800',
    'primary-600': '#C79C00',
    'primary-700': '#8F7000',
    'primary-800': '#574400',
    'primary-900': '#1F1800',
    primary: '#ffc800', // primary-500
  },
}