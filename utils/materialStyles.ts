import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface TypographyVariants {
    strong: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    strong?: React.CSSProperties;
  }
  interface PaletteColor {
    gradient: string;
  }
  interface SimplePaletteColorOptions {
    gradient?: string;
    border?: {
      subtle: string;
    };
  }
  interface TypeBackground {
    second: string;
  }
}

// Update the Typography's variant prop options
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    strong: true;
  }
}
