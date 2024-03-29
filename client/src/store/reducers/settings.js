import { createMuiTheme } from "@material-ui/core/styles";
import indigo from "@material-ui/core/colors/indigo";
import green from "@material-ui/core/colors/green";
import red from "@material-ui/core/colors/red";

const TOGGLETHEMEMODE = "settings/TOGGLETHEMEMODE";
const SWAPTHEMECOLORS = "settings/SWAPTHEMECOLORS";

const primaryColor = indigo;
const secondaryColor = green;

const themeConfig = {
  palette: {
    primary: {
      main: 'rgb(76, 191, 134)', //'#3897f0',
      contrastText: '#FFF'
    },
    secondary: {
      main: 'rgb(252, 81, 133)', //rgb(229, 83, 86)', //'#d5602d',
      contrastText: '#FFF'
    },
    error: {
      main: '#d5602d'
    },
    action: {
      main: '#30e2c4'
    },
    // Used by `getContrastText()` to maximize the contrast between the background and
    // the text.
    contrastThreshold: 3,
    // Used to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2
  },
  typography: {
    // Use the system font.
    fontFamily:
      '-apple-system,system-ui,BlinkMacSystemFont,' +
      '"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif',
  }
};

// All the following keys are optional.
// We try our best to provide a great default value.
const defaultTheme = createMuiTheme(themeConfig);

const initState = {
  theme: defaultTheme,
  darkMode: false,
  colorsSwaped: false
};

export default function reducer(state = initState, action) {
  switch (action.type) {
    case TOGGLETHEMEMODE:
      if (action.enableDark) {
        return {
          ...state,
          theme: createMuiTheme({
            ...themeConfig,
            palette: {
              ...themeConfig.palette,
              primary: state.theme.palette.primary,
              secondary: state.theme.palette.secondary,
              type: "dark"
            },
            typography: {
              useNextVariants: true,
            },
          }),
          darkMode: true
        };
      }
      return {
        ...state,
        theme: createMuiTheme({
          ...themeConfig,
          palette: {
            ...themeConfig.palette,
            primary: state.theme.palette.primary,
            secondary: state.theme.palette.secondary
          }
        }),
        darkMode: false
      };

    case SWAPTHEMECOLORS:
      if (action.colorsSwaped) {
        return {
          ...state,
          theme: createMuiTheme({
            ...themeConfig,
            palette: {
              ...state.theme.palette,
              primary: secondaryColor,
              secondary: primaryColor
            }
          }),
          colorsSwaped: true
        };
      }
      return {
        ...state,
        theme: createMuiTheme({
          ...themeConfig,
          palette: {
            ...state.theme.palette,
            primary: primaryColor,
            secondary: secondaryColor
          }
        }),
        colorsSwaped: false
      };

    default:
      return state;
  }
}

export function toggleThemeMode(enableDark) {
  return {
    type: TOGGLETHEMEMODE,
    enableDark
  };
}

export function swapThemeColors(colorsSwaped) {
  return {
    type: SWAPTHEMECOLORS,
    colorsSwaped
  };
}
