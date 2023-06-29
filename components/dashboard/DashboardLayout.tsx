import * as React from "react";
import { LayoutProps } from "@interfaces";
import { Grid, Stack } from "@mui/material";
import DashboardHeader from "./DashboardHeader";
import DashboardSpaceLeft from "./DashboardSpaceLeft";
import { useAuth } from "@hooks";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

export function DashboardLayout(props: LayoutProps) {
  const { children } = props;
  const { profile } = useAuth();
  const router = useRouter();
  React.useEffect(() => {
    if (!Cookies.get("access_token")) {
      router.push("/login");
    }
  }, [profile]);
  return (
    <Grid minHeight={"100vh"} container direction={"row"} flexWrap={"nowrap"}>
      <Grid item width={"300px"} padding={"1rem"} height={"100vh"}>
        <DashboardSpaceLeft />
      </Grid>
      <Grid
        item
        container
        sm
        padding={"1rem"}
        height={"100vh"}
        overflow={"auto"}
      >
        <DashboardHeader />
        <Grid
          sx={{
            backgroundColor: "background.default",
            padding: "0.5rem",
            borderRadius: "10px",
            border: "1px solid",
            borderColor: "divider",
            overflow: "auto",
          }}
          height={"calc(100% - 70px)"}
          item
          container
        >
          {children}
        </Grid>
      </Grid>
    </Grid>
  );
}
