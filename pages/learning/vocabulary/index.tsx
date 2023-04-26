import { Box, Grid } from "@mui/material";
import * as React from "react";
import { LearningLayout } from "@components/layouts";
export interface ILearningVocabularyProps {}

export default function LearningVocabulary(props: ILearningVocabularyProps) {
  return (
    <Grid container>
      <Grid item xs={3}></Grid>
      <Grid item xs={6}>
        <Box
          sx={{
            boxShadow: "0px 30px 20px 20px #f0f0f0",
            pl: "0px",
            pr: "0px",
            overflow: "auto",
          }}
          height={"100vh"}
          paddingTop={"100px"}
          paddingBottom={"100px"}
        ></Box>
      </Grid>
      <Grid item xs={3}>
        <Box height={"100%"} width={"100%"}></Box>
      </Grid>
    </Grid>
  );
}
LearningVocabulary.Layout = LearningLayout;
