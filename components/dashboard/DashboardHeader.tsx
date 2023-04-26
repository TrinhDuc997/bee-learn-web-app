import { Avatar, Box, Grid, Typography } from "@mui/material";
import React from "react";
import _ from "../common";
import { useAuth } from "@hooks";
import AccountMenu from "@components/common/AccountSetting";
function DashboardHeader() {
  const { profile = {} } = useAuth();
  console.log(
    "🚀 ~ file: DashboardHeader.tsx:7 ~ DashboardHeader ~ profile:",
    profile
  );
  const { name = "" } = profile;
  return (
    <Grid
      container
      height={"70px"}
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      <Grid item>
        <Typography variant="h5" fontWeight={"800"}>
          Xin chào {name}
        </Typography>
        <Typography variant="body2">Chúc bạn một ngày tốt lành!</Typography>
      </Grid>
      <Grid item>
        <Box sx={{ mr: "3rem" }}>
          <AccountMenu />
        </Box>
      </Grid>
    </Grid>
  );
}

export default DashboardHeader;
