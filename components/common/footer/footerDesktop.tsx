import { Box, Typography } from "@mui/material";
import * as React from "react";
import CopyrightIcon from "@mui/icons-material/Copyright";

export interface FooterProps {}

export function FooterDesktop(props: FooterProps) {
  return (
    <Box
      py={2}
      sx={{
        mt: "2rem",
        padding: "5px",
        backgroundColor: "secondary.main",
      }}
      className="footer"
      display={{ xs: "none", md: "block" }}
    >
      <Box
        sx={{
          float: "left",
          width: "33.33%",
          textAlign: "center",
        }}
        className="headerLeft"
      >
        <CopyrightIcon sx={{ verticalAlign: "middle" }} />
        <Typography
          sx={{ verticalAlign: "middle", fontWeight: "700" }}
          component="b"
        >
          {" "}
          2022
        </Typography>
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
