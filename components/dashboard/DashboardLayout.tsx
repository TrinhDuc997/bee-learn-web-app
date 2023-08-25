import * as React from "react";
import { LayoutProps } from "@interfaces";
import { Grid, Stack } from "@mui/material";
import DashboardHeader from "./DashboardHeader";
import DashboardSpaceLeft from "./DashboardSpaceLeft";
// import { useAuth } from "@hooks";
import { useRouter } from "next/router";
import Loading from "@components/common/loadingPage";
import { useSession } from "next-auth/react";

export function DashboardLayout(props: LayoutProps) {
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
