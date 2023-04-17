import { Avatar, Box, Grid, Typography } from "@mui/material";
import React from "react";
import _ from "../common";
function DashboardHeader() {
  const fullName = "Trịnh Đức";
  return (
    <Grid
      container
      height={"70px"}
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      <Grid item>
        <Typography variant="h5" fontWeight={"800"}>
          Xin chào {fullName}
        </Typography>
        <Typography variant="body2">Chúc bạn một ngày tốt lành!</Typography>
      </Grid>
      <Grid item>
        <Avatar
          sx={{
            width: 45,
            height: 45,
            bgcolor: _.stringToColor(fullName),
            color: _.invertColor(_.stringToColor(fullName)),
            mr: "3rem",
          }}
        >
          {_.stringAvatar(fullName)}
        </Avatar>
      </Grid>
    </Grid>
  );
}

export default DashboardHeader;
