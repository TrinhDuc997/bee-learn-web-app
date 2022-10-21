import { createTheme } from "@mui/material/styles";
import { green, grey, red } from "@mui/material/colors";

// Create a theme instance.
export const theme = createTheme({
  palette: {
    primary: {
      main: green[500],
      light: green[200],
    },
    secondary: {
      main: grey[500],
    },
    error: {
      main: red.A400,
    },
  },
});
