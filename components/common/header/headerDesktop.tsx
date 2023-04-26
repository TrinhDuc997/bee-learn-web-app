import { Box } from "@mui/material";
import { useRouter } from "next/router";
import * as React from "react";
import { theme } from "@utils";
import Image from "next/image";
import AccountMenu from "../AccountSetting";

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
      display={{ xs: "none", md: "flex" }}
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
          <Image width={160} height={50} layout="intrinsic" src="/Logo.png" />
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
          display: "flex",
          justifyContent: "flex-end",
        }}
        className="headerRight"
      >
        <Box sx={{ textAlign: "right", mr: "3rem" }}>
          <AccountMenu />
        </Box>
      </Box>
    </Box>
  );
}
