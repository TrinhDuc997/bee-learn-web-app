import {
  Box,
  Button,
  ButtonBase,
  Divider,
  Drawer,
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
import BasicPagination from "@components/common/navigate/Pagination";
// import { useAuth } from "@hooks";
import { useSession } from "next-auth/react";

export interface ISubjectVocabularyProps {}

export default function SubjectVocabulary(props: ISubjectVocabularyProps) {
  const router = useRouter();
  const [dataSubjects, setDataSubject] = React.useState<IVocabularySubjects[]>(
    []
  );
  const [isLoading, setLoading] = React.useState(false);
  const dataFetchedRef = React.useRef(false);
  const [courseSelected, setCourSelected] = React.useState("");
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const { data: session } = useSession();
  const { user } = session || {};
  const { courseLearned = [] } = user || {};
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
    setOpenDrawer(false);
    setLoading(true);
    setCourSelected(course);
    localStorage.setItem("subject", course);
    const dataVocabularySubjects: IVocabularySubjects[] =
      await wordsAPI.getListVocabularySubjects({ course });
    setDataSubject(dataVocabularySubjects);
    setLoading(false);
  };

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setOpenDrawer(open);
    };

  // if (isLoading) return <CustomizedProgressBars />;
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
          paddingTop={"4rem"}
          paddingBottom={"1rem"}
        >
          <Grid
            container
            rowSpacing={5}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            sx={{ pl: "1rem", pr: "1rem" }}
            justifyContent={"center"}
          >
            <Box
              width={{ lg: "60%", md: "65%", xs: "90%" }}
              margin={"auto"}
              mt={0}
            >
              <BannerTitle
                title="Chọn Chủ Đề Học"
                sxTypography={{ fontSize: { xs: "18px", sm: "1.5rem" } }}
              />
            </Box>
            {isLoading ? (
              <Grid item xs={6} margin={"auto"} height={"70vh"}>
                <CustomizedProgressBars />
              </Grid>
            ) : (
              dataSubjects.map((item) => {
                const filename = item.title?.replaceAll(" ", "") + ".png";
                const sizePagination = Math.floor((item?.numberWord || 0) / 20);
                const dataCourseLearned =
                  courseLearned.find((i: any) => i.subject === item.title) ||
                  {};
                const { numberPacks = [] } = dataCourseLearned;
                return (
                  // <Box sx={{ overflow: "auto" }}>
                  <Grid
                    key={item.title}
                    item
                    xs={12}
                    sm={10}
                    md={6}
                    lg={10}
                    xl={6}
                  >
                    {sizePagination > 1 ? (
                      <Paper
                        sx={{
                          background: "#f3f3f3",
                          width: "100%",
                          boxShadow: "-3px 5px 1px -1px rgb(0 0 0 / 20%)",
                          borderRadius: "15px",
                        }}
                      >
                        <Grid
                          container
                          flexWrap={"nowrap"}
                          spacing={3}
                          justifyContent={"center"}
                        >
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
                                  variant="h6"
                                  sx={{ color: "primary.dark" }}
                                >
                                  {item.title}
                                </Typography>
                                <Typography variant="body1" pl={"1rem"}>
                                  {item.subTitle}
                                </Typography>
                              </Grid>
                              <Grid item>
                                <BasicPagination
                                  handleChangePage={(page: number) => {
                                    router.push({
                                      pathname: router.asPath + "/list-words",
                                      query: {
                                        subject:
                                          courseSelected === "BASIC"
                                            ? "BASIC"
                                            : item.title,
                                        numberPack:
                                          courseSelected === "BASIC"
                                            ? item._id?.split(" ")[1] // format of _id is Pack 1, Pack 2....
                                            : page,
                                      },
                                    });
                                  }}
                                  count={sizePagination}
                                  pages={numberPacks}
                                />
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Paper>
                    ) : (
                      <ButtonBase
                        sx={{
                          width: "100%",
                          "&:click": {
                            backgroundColor: "primary.light",
                          },
                          display: "block",
                        }}
                        onClick={() => {
                          router.push({
                            pathname: router.asPath + "/list-words",
                            query: {
                              subject:
                                courseSelected === "BASIC"
                                  ? "BASIC"
                                  : item.title,
                            },
                          });
                        }}
                      >
                        <Paper
                          sx={{
                            width: "100%",
                            boxShadow: "-3px 5px 1px -1px rgb(0 0 0 / 20%)",
                            borderRadius: "15px",
                            backgroundColor:
                              numberPacks[0] === 0
                                ? "primary.light"
                                : "#f3f3f3",
                          }}
                        >
                          <Grid container flexWrap={"nowrap"} spacing={3}>
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
                                    variant="h6"
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
                    )}
                  </Grid>
                  // </Box>
                );
              })
            )}
          </Grid>
        </Box>
        <Button
          onClick={toggleDrawer(true)}
          variant="outlined"
          sx={{
            display: { md: "block", lg: "none" },
            borderRadius: "50%",
            height: "60px",
            width: "60px",
            ml: "5px",
            position: "fixed",
            top: { md: "80px" },
            right: "0px",
            bottom: { xs: "60px" },
          }}
        >
          Khóa Học
        </Button>
      </Grid>
      <Grid item lg={3} md={1} sm={1} xs={0} height={"100%"}>
        <Box
          height={"100%"}
          width={"100%"}
          paddingTop={"2rem"}
          paddingLeft={{ xl: "3rem", lg: "2rem" }}
          paddingRight={{ xl: "7rem", lg: "2rem" }}
        >
          <Paper
            sx={{
              height: "50vh",
              width: "100%",
              borderRadius: "15px",
              padding: "1rem",
              display: { lg: "block", md: "none", sm: "none", xs: "none" },
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
          <Drawer
            anchor={"right"}
            open={openDrawer}
            onClose={toggleDrawer(false)}
            sx={{ width: "220px" }}
          >
            <Paper
              sx={{
                height: "50vh",
                width: "220px",
                borderRadius: "15px",
                padding: "1rem",
                boxShadow: "none",
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
          </Drawer>
        </Box>
      </Grid>
    </Grid>
  );
}

SubjectVocabulary.Layout = LearningLayout;
