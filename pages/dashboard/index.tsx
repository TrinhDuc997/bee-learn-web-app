import { Box, Grid } from "@mui/material";
import * as React from "react";
import { DashboardLayout } from "@components/dashboard";

export interface IAdminProps {}

export default function Dashboard(props: IAdminProps) {
  return <Box>Dashboard</Box>;
}

Dashboard.Layout = DashboardLayout;
