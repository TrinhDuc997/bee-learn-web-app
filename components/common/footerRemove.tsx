import { Box, Typography } from "@mui/material";
import * as React from "react";
import CopyrightIcon from "@mui/icons-material/Copyright";

export interface FooterProps {}

export function Footer(props: FooterProps) {
  return (
    <Box
      py={2}
      sx={{
        padding: "5px",
        backgroundColor: "secondary.main",
      }}
      className="footer"
    >
      <Box
        sx={{
          float: "left",
          width: "33.33%",
          textAlign: "right",
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
