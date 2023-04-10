import { Grid } from "@mui/material";
import { Box, Container, Stack } from "@mui/system";
import * as React from "react";
import { LayoutProps } from "../../models";
import HeaderPageLearningVocab from "../common/header/headerPageLearningVocab";
import NavTabs from "../common/navigate/navTabs";

export const LearnVocabLayouts = (props: LayoutProps) => {
  const { children } = props;
  const [value, setValue] = React.useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Stack minHeight="100vh">
      <Box
        component="header"
        sx={{ position: "fixed", width: "100%", top: 0, zIndex: 999 }}
      >
        <HeaderPageLearningVocab />
      </Box>
      <Box component="main">
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
            >
              {children}
            </Box>
          </Grid>
          <Grid item xs={3}>
            <Box height={"100%"} width={"100%"}></Box>
          </Grid>
        </Grid>
      </Box>
      <Box
        component="footer"
        sx={{
          position: "fixed",
          width: "100%",
          bottom: 0,
          zIndex: 999,
          backgroundColor: "white",
        }}
      >
        <Grid container>
          <Grid item xs={3}></Grid>
          <Grid item xs={6}>
            <NavTabs />
          </Grid>
          <Grid item xs={3}></Grid>
        </Grid>
      </Box>
    </Stack>
  );
};
