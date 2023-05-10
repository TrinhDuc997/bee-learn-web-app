import {
  Box,
  ButtonBase,
  Divider,
  Grid,
  ListItemButton,
  ListItemText,
  MenuList,
  Paper,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import * as React from "react";
import { wordsAPI } from "@api-client";
import { BannerTitle } from "@components/common/header/BannerTitle";
import CustomizedProgressBars from "@components/common/loadingComponent/CircularLoading";
import { LearningLayout } from "@components/layouts";
import { IVocabularySubjects } from "@interfaces";
import Image from "next/image";
import { theme } from "@utils";

export interface ISubjectVocabularyProps {}

export default function SubjectVocabulary(props: ISubjectVocabularyProps) {
  const router = useRouter();
  const [dataSubjects, setDataSubject] = React.useState<IVocabularySubjects[]>(
    []
  );
  const [isLoading, setLoading] = React.useState(false);
  const dataFetchedRef = React.useRef(false);
  const [courseSelected, setCourSelected] = React.useState("");

  React.useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    setLoading(true);
    const defaultSubject = localStorage.getItem("subject") || "TOEIC";
    setCourSelected(defaultSubject);

    const fetchDataVocabSubject = async () => {
      const dataVocabularySubjects: IVocabularySubjects[] =
        await wordsAPI.getListVocabularySubjects({ course: defaultSubject });
      setDataSubject([...dataVocabularySubjects]);
      setLoading(false);
    };
    fetchDataVocabSubject().catch(console.error);
  }, []);
  const handleChangeCourse = async (course: string) => {
    setLoading(true);
    setCourSelected(course);
    localStorage.setItem("subject", course);
    const dataVocabularySubjects: IVocabularySubjects[] =
      await wordsAPI.getListVocabularySubjects({ course });
    setDataSubject(dataVocabularySubjects);
    setLoading(false);
  };
  // if (isLoading) return <CustomizedProgressBars />;
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
          paddingTop={"1rem"}
          paddingBottom={"1rem"}
        >
          <Grid
            container
            rowSpacing={2}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            sx={{ pl: "1rem", pr: "1rem" }}
          >
            <Box width={"60%"} margin={"auto"} mt={0}>
              <BannerTitle title="Chọn Chủ Đề Học" />
            </Box>
            {isLoading ? (
              <Grid item xs={6} margin={"auto"} height={"70vh"}>
                <CustomizedProgressBars />
              </Grid>
            ) : (
              dataSubjects.map((item) => {
                const filename = item.title?.replaceAll(" ", "") + ".png";
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
                      onClick={() => {
                        router.push({
                          pathname: router.asPath + "/list-words",
                          query: {
                            subject:
                              courseSelected === "BASIC" ? "BASIC" : item.title,
                            numberPack:
                              courseSelected === "BASIC"
                                ? item._id?.split(" ")[1] // format of _id is Pack 1, Pack 2....
                                : undefined,
                          },
                        });
                      }}
                    >
                      <Paper
                        sx={{
                          background: "#f3f3f3",
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
                            <Box
                              sx={{
                                borderRadius: "50%",
                                border: "5px solid #fbc02d",
                                width: "90px",
                                height: "90px",
                              }}
                            >
                              {courseSelected === "BASIC" ? (
                                <Box
                                  sx={{
                                    width: "100%",
                                    height: "100%",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    borderRadius: "50%",
                                    backgroundColor: "primary.main",
                                  }}
                                >
                                  <Typography variant="h5">
                                    {item.hrefImg}
                                  </Typography>
                                </Box>
                              ) : (
                                <Image
                                  src={`/VocabSubjectsPic/${filename}`}
                                  alt="english-vocab2"
                                  width={90}
                                  height={90}
                                  layout="intrinsic"
                                  style={{
                                    borderRadius: "50%",
                                  }}
                                />
                              )}
                            </Box>
                          </Grid>
                          <Grid
                            item
                            xs={12}
                            sm
                            container
                            sx={{ textAlign: "left" }}
                          >
                            <Grid item container direction={"column"}>
                              <Grid item>
                                <Typography
                                  variant="h5"
                                  sx={{ color: "primary.dark" }}
                                >
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
              })
            )}
          </Grid>
        </Box>
      </Grid>
      <Grid item xs={3} height={"100%"}>
        <Box
          height={"100%"}
          width={"100%"}
          paddingTop={"2rem"}
          paddingLeft={"3rem"}
          paddingRight={"7rem"}
        >
          <Paper
            sx={{
              height: "50vh",
              width: "100%",
              borderRadius: "15px",
              padding: "1rem",
            }}
          >
            <Box
              sx={{
                height: "50px",
                background: theme.palette.secondary.gradient,
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: "1rem",
              }}
            >
              <Typography variant="h5" fontWeight={"bold"}>
                Các Khóa Học
              </Typography>
            </Box>
            <Divider sx={{ width: "80%", margin: "auto" }} />
            <MenuList>
              <ListItemButton
                sx={{
                  border: "1px solid",
                  borderColor: "primary.dark",
                  mb: "1rem",
                }}
                selected={courseSelected === "BASIC"}
                onClick={() => handleChangeCourse("BASIC")}
              >
                <ListItemText
                  primary="Từ Vựng Cơ Bản"
                  sx={{ fontWeight: "bold" }}
                />
              </ListItemButton>
              <ListItemButton
                sx={{
                  border: "1px solid",
                  borderColor: "primary.dark",
                  mb: "1rem",
                }}
                selected={courseSelected === "TOEIC"}
                onClick={() => handleChangeCourse("TOEIC")}
              >
                <ListItemText primary="Từ Vựng TOEIC" />
              </ListItemButton>
              <ListItemButton
                sx={{
                  border: "1px solid",
                  borderColor: "primary.dark",
                  mb: "1rem",
                }}
                selected={courseSelected === "IELTS"}
                onClick={() => handleChangeCourse("IELTS")}
              >
                <ListItemText primary="Từ Vựng IELTS" />
              </ListItemButton>
              {/* <ListItemButton
                sx={{
                  border: "1px solid",
                  borderColor: "primary.dark",
                  mb: "1rem",
                }}
                selected={courseSelected === "ALL"}
                onClick={() => handleChangeCourse("ALL")}
              >
                <ListItemText primary="Tất cả các từ" />
              </ListItemButton> */}
            </MenuList>
          </Paper>
        </Box>
      </Grid>
    </Grid>
  );
}

SubjectVocabulary.Layout = LearningLayout;
