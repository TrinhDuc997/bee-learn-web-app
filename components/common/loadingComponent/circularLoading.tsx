import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CircularProgress, {
  circularProgressClasses,
  CircularProgressProps,
} from "@mui/material/CircularProgress";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";

// Inspired by the former Facebook spinners.
function CircularLoading(props: CircularProgressProps) {
  const { size } = props;
  return (
    <Box sx={{ position: "relative" }}>
      <CircularProgress
        variant="indeterminate"
        disableShrink
        sx={{
          color: (theme) =>
            theme.palette.mode === "light" ? "primary.main" : "primary.dark",
          animationDuration: "550ms",
          position: "absolute",
          left: `-${Number(size) / 2}px`,
          top: `-${Number(size) / 2}px`,
          [`& .${circularProgressClasses.circle}`]: {
            strokeLinecap: "round",
          },
        }}
        thickness={5}
        {...props}
      />
    </Box>
  );
}

export default function CustomizedProgressBars() {
  return (
    <Box
      sx={{
        flexGrow: 1,
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularLoading size={100} />
    </Box>
  );
}
