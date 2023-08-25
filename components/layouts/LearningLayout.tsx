import { Grid } from "@mui/material";
import { Box, Stack } from "@mui/system";
import * as React from "react";
import { LayoutProps } from "@interfaces";
import HeaderPageLearningVocab from "../common/header/HeaderPageLearningVocab";
import NavTabs from "../common/navigate/NavTabs";
// import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Loading from "@components/common/loadingPage";
import { useSession } from "next-auth/react";
// import Cookies from 'cookies';
export const LearningLayout = (props: LayoutProps) => {
  const { children } = props;
  const { status } = useSession();
  const router = useRouter();

  React.useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status]);

  if (status === "unauthenticated") {
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
          height: "65px",
          boxShadow: "0px -4px 4px -4px rgba(0,0,0,.2)",
        }}
      >
        <HeaderPageLearningVocab />
      </Box>
      <Box component="main" height={"calc(100vh - 65px - 50px)"}>
        {children}
      </Box>
      <Box
        component="footer"
        sx={{
          width: "100%",
          bottom: 0,
          zIndex: 999,
          boxShadow: "0px -4px 4px -4px rgba(0,0,0,.2)",
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
