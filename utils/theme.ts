import {
  createTheme,
  experimental_extendTheme as extendTheme,
} from "@mui/material/styles";
import { green, grey, red, yellow } from "@mui/material/colors";

// Create a theme instance.
export const theme = createTheme({
  typography: {
    fontFamily: "Open Sans, sans-serif",
    strong: {
      fontWeight: "bold",
    },
  },
  palette: {
    primary: {
      main: green[500],
      light: green[200],
      dark: green[700],
      contrastText: "#000000",
      gradient: `linear-gradient(to right, ${green[700]}, ${green[400]})`,
    },
    secondary: {
      main: yellow[700],
      contrastText: "#ffffff",
      gradient: `linear-gradient(to right, ${yellow[400]}, ${yellow[800]})`,
    },

    background: {
      default: grey[50],
      second: grey[200],
      paper: grey[300],
    },
    error: {
      main: red.A200,
      light: red[600],
    },
    success: {
      main: green.A200,
      light: green[600],
    },
  },
  components: {
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: "10px",
          "&.Mui-selected": {
            backgroundColor: green[600],
            "&:hover": {
              backgroundColor: green[800],
            },
          },

          "&:hover": {
            backgroundColor: green[200],
          },
          "&.Mui-selected .MuiListItemIcon-root": {
            color: yellow[700],
          },
          "&.Mui-selected .MuiTypography-root": {
            color: yellow[700],
          },
        },
      },
    },
  },
});

// export const themeExtend = extendTheme({
//   typography: {
//     fontFamily: "Open Sans, sans-serif",
//     strong: {
//       fontWeight: "bold",
//     },
//   },
//   colorSchemes: {
//     light: {
//       palette: {
//         primary: {
//           main: green[500],
//           contrastText: "#000000",
//         },
//         secondary: {
//           main: yellow[600],
//           contrastText: "#000000",
//         },
//         gradient:
//           "linear-gradient(to right, var(--mui-palette-primary-main), var(--mui-palette-primary-light))",
//         border: {
//           subtle: "var(--mui-palette-neutral-200)",
//         },
//       },
//     },
//     dark: {
//       palette: {
//         primary: {
//           main: "#56ab2f",
//           contrastText: "#000000",
//         },
//         secondary: {
//           main: yellow[800],
//           contrastText: "#000000",
//         },
//         border: {
//           subtle: "var(--mui-palette-neutral-600)",
//         },
//       },
//     },
//   },
// });
