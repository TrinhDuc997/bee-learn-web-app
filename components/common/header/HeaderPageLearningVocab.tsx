import { Avatar, Box, Chip, Grid, Stack } from "@mui/material";
import { useRouter } from "next/router";
import * as React from "react";
import { theme /*themeExtend*/ } from "@utils";
import AccountMenu from "../AccountSetting";
import Image from "next/image";

export default function HeaderPageLearningVocab() {
  const router = useRouter();
  return (
    <Grid
      sx={{
        background: theme.palette.primary.gradient,
        height: 70,
        alignItems: "center",
      }}
      container
      spacing={1}
    >
      <Grid item xs={3}>
        <Box
          sx={{
            textAlign: "center",
          }}
          className="headerLeft"
        >
          <a
            onClick={() => {
              router.push("/");
            }}
            style={{ cursor: "pointer" }}
          >
            <Image
              src="/LogoBee.png"
              width={140}
              height={60}
              layout="intrinsic"
            />
          </a>
        </Box>
      </Grid>
      <Grid item xs={6}>
        <Box sx={{}} className="headerMid"></Box>
      </Grid>

      <Grid item xs={3}>
        <Box sx={{ height: "100%" }} className="headerRight">
          <Stack
            direction="row"
            spacing={1}
            sx={{
              height: "100%",
              alignItems: "center",
              justifyContent: "right",
              pr: { xs: "0px", sm: "40px" },
            }}
          >
            <AccountMenu />
          </Stack>
        </Box>
      </Grid>
    </Grid>
  );
}
