import { Box, ButtonBase, Grid, Paper, Typography } from "@mui/material";
import * as React from "react";
import { wordsAPI } from "@api-client";
import { BannerTitle } from "@components/common/header/BannerTitle";
import { LearnVocabLayouts } from "@components/layouts";
import { IVocabularySubjects } from "@interfaces";

export interface ILearnNewWordsProps {}

export default function LearnNewWords(props: ILearnNewWordsProps) {
  const [dataSubjects, setDataSubject] = React.useState<IVocabularySubjects[]>(
    []
  );
  const [isLoading, setLoading] = React.useState(false);
  const dataFetchedRef = React.useRef(false);

  React.useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    setLoading(true);
    const fetchDataVocabSubject = async () => {
      const dataVocabularySubjects: IVocabularySubjects[] =
        await wordsAPI.getListVocabularySubjects();
      setDataSubject(dataVocabularySubjects);
      setLoading(false);
    };
    fetchDataVocabSubject().catch(console.error);
  }, []);
  if (isLoading) return <div>Loading...</div>;
  return (
    <Grid
      container
      rowSpacing={1}
      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      sx={{ pl: "1rem", pr: "1rem" }}
    >
      <Box width={"60%"} margin={"auto"}>
        <BannerTitle title="Chọn Chủ Đề Học" />
      </Box>
      {dataSubjects.map((item) => {
        return (
          // <Box sx={{ overflow: "auto" }}>
          <Grid key={item.title} item xs={6}>
            <ButtonBase
              sx={{
                width: "100%",
                "&:click": {
                  backgroundColor: "primary.light",
                },
              }}
            >
              <Paper
                sx={{
                  backgroundColor: "#f3f3f3",
                  width: "100%",
                  boxShadow: "-3px 5px 1px -1px rgb(0 0 0 / 20%)",
                  borderRadius: "15px",
                }}
              >
                <Grid container spacing={3}>
                  <Grid
                    item
                    sx={{
                      width: 128,
                      height: 128,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src={`/VocabSubjectsPic/${item.hrefImg}.jpeg`}
                      alt="english-vocab2"
                      width={90}
                      height={90}
                      style={{
                        objectFit: "cover",
                        borderRadius: "50%",
                        border: "5px solid #fbc02d",
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm container sx={{ textAlign: "left" }}>
                    <Grid item container direction={"column"}>
                      <Grid item>
                        <Typography variant="h5" sx={{ color: "primary.dark" }}>
                          {item.title}
                        </Typography>
                        <Typography variant="body1" pl={"1rem"}>
                          {item.subTitle}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            </ButtonBase>
          </Grid>
          // </Box>
        );
      })}
    </Grid>
  );
}
LearnNewWords.Layout = LearnVocabLayouts;
