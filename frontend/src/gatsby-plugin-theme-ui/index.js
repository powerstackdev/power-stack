// example theme
import { roboto } from '@theme-ui/presets'
import {darken} from "@theme-ui/color";

export default {
  ...roboto,
  colors: {
    ...roboto.colors,
    background: `#fdf7ec`,
    white: '#fff'
  },
  styles: {
    ...roboto.styles,
  },
  cards: {
    primary: {
      padding: 3,
      borderRadius: 4,
      boxShadow: '0 0 8px rgba(0, 0, 0, 0.125)',
      bg: 'white',
      // color: 'background',
      // backgroundImage: (theme) => `linear-gradient(45deg, ${theme.colors.secondary}, ${darken('secondary', .15)(theme)})`,
      pb: 4,
      pt: 2
    },
    compact: {
      padding: 1,
      borderRadius: 2,
      border: '1px solid',
      borderColor: 'muted',
    },
  },
}