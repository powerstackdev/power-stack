// example theme
import { roboto } from "@theme-ui/presets";
import { darken } from "@theme-ui/color";

const starterTheme = {...roboto};

export default {
  ...starterTheme,
  colors: {
    ...starterTheme.colors,
    primary: `#e60000`,
    background: `#efefef`,
    white: '#fff'
  },
  styles: {
    ...starterTheme.styles,
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
  buttons: {
    primary: {
      color: "background",
      bg: "primary",
      "&:hover": {
        bg: "text"
      },
      borderRadius: `100px`
    },
    secondary: {
      color: "background",
      bg: "secondary",
      "&:hover": {
        backgroundImage: (theme) => `linear-gradient(45deg, ${theme.colors.secondary}, ${darken("secondary", .15)(theme)})`
      },
      borderRadius: `100px`
    },
  },
  badges: {
    primary: {
      color: 'background',
      bg: 'primary',
    },
    outline: {
      color: 'primary',
      bg: 'transparent',
      boxShadow: 'inset 0 0 0 1px',
    },
    icon: {
      padding: '10px',
      height: '100%',
      width: '66px',
      textAlign: 'center',
      fontSize: `30px`,
      borderRadius: '100%'
    }
  },
}