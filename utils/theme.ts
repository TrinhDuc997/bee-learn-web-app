import { createTheme } from "@mui/material/styles";
import { green, grey, orange, red, yellow } from "@mui/material/colors";

// Create a theme instance.
const paperColor = grey[200];
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
      //linear-gradient(130deg, rgb(23, 173, 55), rgb(152, 236, 45))
    },
    secondary: {
      main: yellow[700],
      contrastText: "#ffffff",
      gradient: `linear-gradient(to right, ${yellow[400]}, ${yellow[800]})`,
    },

    background: {
      default: grey[50],
      paper: paperColor,
    },
    error: {
      main: red.A200,
      light: red[600],
    },
    success: {
      main: green.A200,
      light: green[600],
    },
    warning: {
      light: orange[200],
      main: orange[400],
      dark: orange[700],
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
    MuiTableContainer: {
      styleOverrides: {
        root: {
          "&::-webkit-scrollbar": {
            width: "8px",
            background: "fixed",
          },
          "&::-webkit-scrollbar-thumb": {
            width: "8px",
            borderRadius: "10px",
            background: grey[300],
          },
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          "&::-webkit-scrollbar": {
            width: "8px",
            background: "fixed",
          },
          "&::-webkit-scrollbar-thumb": {
            width: "8px",
            borderRadius: "10px",
            background: grey[500],
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          fontWeight: "bold",
          backgroundColor: paperColor,
        },
      },
    },
    MuiTable: {
      styleOverrides: {
        root: {},
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "10px",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          borderRadius: "10px",
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        root: {
          borderRadius: "10px",
        },
      },
    },
  },
});
