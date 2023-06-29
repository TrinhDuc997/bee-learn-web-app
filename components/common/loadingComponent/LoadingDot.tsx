import { Box, SxProps, Theme } from "@mui/material";
import React from "react";

const LoadingDots = (props: { sx?: SxProps<Theme> }) => {
  const { sx } = props;
  return (
    <Box className="loading-dots" sx={sx}>
      <Box className="dot dot-1"></Box>
      <Box className="dot dot-2"></Box>
      <Box className="dot dot-3"></Box>
    </Box>
  );
};

export default LoadingDots;
