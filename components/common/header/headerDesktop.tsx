import { Box } from "@mui/material";
import { useRouter } from "next/router";
import * as React from "react";
import { theme } from "@utils";

export interface HeaderDesktopProps {}

export function HeaderDesktop(props: HeaderDesktopProps) {
  const router = useRouter();
  return (
    <Box
      sx={{
        padding: "5px",
        background: theme.palette.primary.gradient,
      }}
      className="header"
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
        <a
          onClick={() => {
            router.push("/");
          }}
          style={{ cursor: "pointer" }}
        >
          <img style={{ width: "160px", height: "50px" }} src="/Logo.png" />
        </a>
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
