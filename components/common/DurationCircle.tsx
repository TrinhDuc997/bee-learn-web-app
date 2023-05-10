import React, { useState, useEffect } from "react";
import {
  Box,
  CircularProgress,
  SxProps,
  Theme,
  Typography,
} from "@mui/material";

interface IDurationCircle {
  size?: number;
  duration?: number;
  sx?: SxProps<Theme>;
  actionTimeout?: Function;
}
function DurationCircle(props: IDurationCircle) {
  const { size = 40, duration = 10, sx, actionTimeout } = props;
  const [seconds, setSeconds] = useState(duration);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (!!actionTimeout && prevSeconds - 1 === 0) {
          actionTimeout();
        }
        return prevSeconds - 1 === 0 ? duration : prevSeconds - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const progress = seconds / duration; // Calculate progress as a decimal value between 0 and 1
  return (
    <Box
      sx={{
        width: size,
        height: size,
        position: "relative",
        zIndex: 99,
        right: 0,
        ...sx,
      }}
    >
      <CircularProgress
        variant="determinate"
        value={progress * 100} // Convert progress to an integer between 0 and 100
        size={size}
        thickness={4}
      />
      <Box
        sx={{
          transform: "translate(-50%, -50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "absolute",
          top: size / 2,
          left: size / 2,
        }}
      >
        <Typography variant="h6">{seconds}</Typography>
      </Box>
    </Box>
  );
}

export default DurationCircle;
