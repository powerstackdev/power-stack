// example theme
import { system } from "@theme-ui/presets"
import { darken } from "@theme-ui/color"

const starterTheme = { ...system }

export default {
  ...starterTheme,
  colors: {
    ...starterTheme.colors,
    white: "#fff",
    primary: `#1e1e1e`,
    background: `#FCFCFD`,
    darkGrey: `#344054`,
    lightGrey: `#EAECF0`,
    border: `#EAECF0`,
    modes: {
      dark: {
        ...starterTheme.colors.modes.dark,
        white: "#1e1e1e",
        darkGrey: `white`,
      },
    },
  },
  fonts: {
    body: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
    heading: "inherit",
    monospace: "Menlo, monospace",
  },
  fontWeights: {
    body: 400,
    heading: 700,
    link: 500,
    bold: 700,
  },
  radii: {
    medium: `8px`,
    large: `12px`,
  },
  styles: {
    ...starterTheme.styles,
    h1: {
      fontSize: `1.6em`,
      letterSpacing: `-0.05em`,
      color: `red`,
    },
  },
  cards: {
    primary: {
      padding: 2,
      borderRadius: "large",
      border: `1px solid`,
      borderColor: `border`,
      boxShadow: `0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06)`,
      bg: "white",
      color: "text",
    },
    compact: {
      padding: 1,
      borderRadius: 2,
      border: "1px solid",
      borderColor: "muted",
    },
  },
  links: {
    button: {
      color: "background",
      bg: "primary",
      fontWeight: "link",
      borderRadius: "medium",
      "&:hover": {
        bg: "text",
      },
    },
  },
  buttons: {
    primary: {
      color: "background",
      bg: "primary",
      fontWeight: "link",
      borderRadius: "medium",
      "&:hover": {
        bg: "text",
      },
    },
    secondary: {
      color: "background",
      bg: "secondary",
      "&:hover": {
        backgroundImage: (theme) =>
          `linear-gradient(45deg, ${theme.colors.secondary}, ${darken(
            "secondary",
            0.15
          )(theme)})`,
      },
      borderRadius: `100px`,
    },
    clear: {
      bg: `transparent`,
      color: `darkGrey`,
      py: `2px`,
      fontSize: 4,
      verticalAlign: `bottom`,
      borderRadius: "medium",
      svg: {
        mb: `-4px`,
      },
      "&:hover": {
        bg: "lightGrey",
      },
    },
    outline: {
      boxShadow: `0px 1px 2px rgba(16, 24, 40, 0.05)`,
      bg: `transparent`,
      color: `darkGrey`,
      border: `1px solid`,
      borderColor: `border`,
      borderRadius: "medium",
    },
  },
  badges: {
    primary: {
      color: "darkGrey",
      bg: "lightGrey",
      borderRadius: "medium",
      p: 1,
      px: 2,
    },
    outline: {
      color: "primary",
      bg: "transparent",
      boxShadow: "inset 0 0 0 1px",
    },
    icon: {
      padding: "10px",
      height: "100%",
      width: "66px",
      textAlign: "center",
      fontSize: `30px`,
      borderRadius: "100%",
    },
  },
  forms: {
    label: {
      fontSize: 1,
      mb: 1,
      color: "darkGrey",
      fontWeight: 500,
    },
    input: {
      borderColor: "#D0D5DD",
      boxShadow: "0px 1px 2px rgba(16, 24, 40, 0.05)",
    },
  },
}
