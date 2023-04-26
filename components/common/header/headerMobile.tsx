import { Box } from "@mui/material";
import Image from "next/image";
import * as React from "react";

export interface HeaderMobileProps {}

export function HeaderMobile(props: HeaderMobileProps) {
  return (
    <Box
      sx={{
        padding: "5px",
        backgroundColor: "primary.main",
      }}
      className="header"
      display={{ xs: "block", md: "none" }}
    >
      <Box
        sx={{
          float: "left",
          width: "33.33%",
          textAlign: "center",
        }}
        className="headerLeft"
      >
        <Image width={140} height={35} layout="intrinsic" src="/Logo.png" />
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
