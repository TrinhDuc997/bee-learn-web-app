import { Grid } from "@mui/material";
import { Box, Stack } from "@mui/system";
import * as React from "react";
import { LayoutProps } from "@interfaces";
import HeaderPageLearningVocab from "../common/header/HeaderPageLearningVocab";
import NavTabs from "../common/navigate/NavTabs";
// import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useAuth } from "@hooks";
import Loading from "@components/common/loadingPage";
// import Cookies from 'cookies';
export const LearningLayout = (props: LayoutProps) => {
  const { children } = props;
  const { isLoading, profile } = useAuth();

  const router = useRouter();
  React.useEffect(() => {
    if (!isLoading && !profile) {
      router.push("/login");
    }
  }, [isLoading, profile]);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <Stack minHeight="100vh">
      <Box
        component="header"
        sx={{
          // position: "fixed",
          width: "100%",
          top: 0,
          zIndex: 999,
          height: "70px",
        }}
      >
        <HeaderPageLearningVocab />
      </Box>
      <Box component="main" height={"calc(100vh - 70px - 50px)"}>
        {children}
      </Box>
      <Box
        component="footer"
        sx={{
          // position: "fixed",
          width: "100%",
          bottom: 0,
          zIndex: 999,
          backgroundColor: "white",
          height: 50,
        }}
      >
        <Grid container>
          <Grid item lg={3} sm={1} md={1} xs={0}></Grid>
          <Grid item lg={6} sm={10} md={10} xs={12}>
            <NavTabs />
          </Grid>
          <Grid item lg={3} sm={1} md={1} xs={0}></Grid>
        </Grid>
      </Box>
    </Stack>
  );
};
