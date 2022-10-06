// src/smooth-doc/theme.js
import { theme as baseTheme } from 'smooth-doc/src/theme'
import { th } from '@xstyled/styled-components'


export const theme = {
  ...baseTheme,
  fonts: {
    ...baseTheme.fonts,
    base: 'Mulish',
  },
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
    background: '#FCFCFD',
    white: '#FFF',
    'on-background': '#000',
    'on-link': 'rgb(52, 64, 84)',
    modes: {
      dark: {
        ...baseTheme.colors.modes.dark,
        white: th.color('gray-900'),
        'on-background': '#FFF',
        'on-link': '#FFF'
      }
    }
  },
}