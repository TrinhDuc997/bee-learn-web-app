import * as React from "react";
import { LearningLayout } from "@components/layouts";
import { Box, Grid } from "@mui/material";

export interface INoteBookProps {}

export default function NoteBook(props: INoteBookProps) {
  return (
    <Grid container height={"100%"}>
      <Grid item xs={3} height={"100%"}></Grid>
      <Grid item xs={6} height={"100%"}>
        <Box
          sx={{
            boxShadow: "0px 30px 20px 20px #f0f0f0",
            pl: "0px",
            pr: "0px",
            overflow: "auto",
          }}
          height={"100%"}
          paddingTop={"100px"}
          paddingBottom={"100px"}
        >
          <div>Note Book</div>
        </Box>
      </Grid>
      <Grid item xs={3} height={"100%"}>
        <Box height={"100%"} width={"100%"}></Box>
      </Grid>
    </Grid>
  );
}
NoteBook.Layout = LearningLayout;
