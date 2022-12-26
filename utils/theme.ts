import { createTheme } from "@mui/material/styles";
import { blue, green, grey, red, yellow } from "@mui/material/colors";

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
    },
    secondary: {
      main: yellow[700],
      light: yellow[600],
      dark: yellow[800],
      contrastText: "#000000",
    },
    error: {
      main: red.A400,
    },
  },
});
