import { Box, Button, Grid, Typography } from "@mui/material";
import * as React from "react";
import { LearningLayout } from "@components/layouts";
import Image from "next/image";
import ChartReview from "@components/learnVocabulary/review/ChartReview";
// import { useAuth } from "@hooks";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
export interface ILearningVocabularyProps {}

export default function Review(props: ILearningVocabularyProps) {
  const { data: session } = useSession();
  const { user } = session || {};
  const { hierarchicalArrayOfWords = [0, 0, 0, 0] } = user || {};
  const router = useRouter();

  return (
    <Grid container height={"100%"}>
      <Grid item lg={3} md={1} sm={1} xs={0} height={"100%"}></Grid>
      <Grid item lg={6} md={10} sm={10} xs={12} height={"100%"}>
        <Box
          sx={{
            boxShadow: "0px 30px 20px 20px #f0f0f0",
            pl: "0px",
            pr: "0px",
            overflow: "auto",
          }}
          height={"100%"}
        >
          <Grid container spacing={5}>
            <Grid
              item
              xs={12}
              container
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Box
                sx={{
                  background: "linear-gradient(90deg, #fafafa 30%, #fbc02d)",
                }}
              >
                <Image
                  src="/beeReview.png"
                  width={90}
                  height={90}
                  layout="intrinsic"
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  height: "100%",
                  backgroundColor: "secondary.main",
                  borderTopRightRadius: "20px",
                  borderBottomRightRadius: "20px",
                }}
              >
                <Typography
                  variant="h5"
                  fontWeight={"bold"}
                  fontSize={{ xs: "18px", sm: "24px", md: "28px" }}
                  mr={3}
                >
                  Wellcome To Bee Learning
                </Typography>
              </Box>
            </Grid>
            <Grid
              container
              item
              xs={12}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Box
                sx={{
                  width: "100%",
                  maxWidth: "600px",
                  pl: "2rem",
                  pr: "2rem",
                }}
              >
                <ChartReview data={hierarchicalArrayOfWords} />
              </Box>
            </Grid>
            <Grid
              item
              container
              xs={12}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Button
                variant="outlined"
                size="large"
                onClick={() => {
                  router.push({
                    pathname: router.asPath + "/review-vocabulary",
                  });
                }}
              >
                Ôn Tập Ngay
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Grid>
      <Grid item lg={3} md={1} sm={1} xs={0} height={"100%"}>
        <Box height={"100%"} width={"100%"}></Box>
      </Grid>
    </Grid>
  );
}
Review.Layout = LearningLayout;
