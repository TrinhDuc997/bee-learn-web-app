import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useRouter } from "next/router";
import * as React from "react";

export interface IListPostsSectionProps {
  data: Array<any>;
}

export function ListPostsSection(props: IListPostsSectionProps) {
  const { data } = props;
  const router = useRouter();
  return (
    <Box sx={{ width: "100%", p: "1rem" }}>
      <Grid
        wrap="nowrap"
        sx={{ flexGrow: 1, overflow: "auto" }}
        container
        spacing={2}
      >
        {data.map((item, index) => {
          return (
            <Grid key={index} item xs={12} sm={4} sx={{ pb: "16px" }}>
              <Card
                sx={{
                  width: 300,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onClick={() => router.push("/posts/phonetic-chart-IPA")}
              >
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="200"
                    image="/sectionPicture/imageIPA.png"
                    alt="imageIPA"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Bảng phiên âm tiếng Anh IPA
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Bảng phiên âm tiếng Anh đầy đủ - International Phonetic
                      Alphabet viết tắt IPA là bảng ký hiệu ngữ âm quốc tế mà
                      các bạn cần nắm vững khi bắt đầu học tiếng Anh.
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
