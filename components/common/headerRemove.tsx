import { Box } from "@mui/material";
import * as React from "react";

export interface HeaderProps {}

export function Header(props: HeaderProps) {
  return (
    <Box
      sx={{
        padding: "5px",
        backgroundColor: "primary.main",
      }}
      className="header"
    >
      <Box
        sx={{
          float: "left",
          width: "33.33%",
          textAlign: "center",
        }}
        className="headerLeft"
      >
        <img style={{ width: "240px", height: "70px" }} src="/logo.png" />
      </Box>
      <Box
        sx={{
          float: "left",
          width: "33.33%",
        }}
        className="headerMid"
      ></Box>
      <Box
        sx={{
          float: "left",
          width: "33.33%",
        }}
        className="headerRight"
      ></Box>
    </Box>
  );
}
