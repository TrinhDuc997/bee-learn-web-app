import * as React from "react";
import { LayoutProps } from "@interfaces";
import { Grid, Stack } from "@mui/material";
import DashboardHeader from "./DashboardHeader";
import DashboardSpaceLeft from "./DashboardSpaceLeft";

export function DashboardLayout(props: LayoutProps) {
  const { children } = props;
  return (
    <Grid minHeight={"100vh"} container direction={"row"}>
      <Grid item width={"300px"} padding={"1rem"} height={"100vh"}>
        <DashboardSpaceLeft />
      </Grid>
      <Grid item sm padding={"1rem"} height={"100vh"}>
        <DashboardHeader />
        <Grid
          sx={{
            backgroundColor: "background.default",
            padding: "1rem",
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
