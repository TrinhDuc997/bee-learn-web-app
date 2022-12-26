import {
  Container,
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
import { MainLayout } from "../../components/layouts";
import { postsAPI } from "../../api-client";
import { IPhoneticIPA } from "../../models";
import { PhoneticItem } from "../../components/posts";
import { Box } from "@mui/system";

export interface PhoneticChartIPAProps {
  phoneticIPAData: Array<IPhoneticIPA>;
}
export interface PhoneticChartIPAProps {
  phoneticIPAData: Array<IPhoneticIPA>;
  phoneticIPAData2: {
    vowelsAndMonophthongs: Array<IPhoneticIPA>;
    vowelsAndDiphthongs: Array<IPhoneticIPA>;
    consonantsAndMonophthongs: Array<IPhoneticIPA>;
    consonantsAndDiphthongs: Array<IPhoneticIPA>;
  };
  phoneticIPAData3: Array<Array<IPhoneticIPA>>;
}

export default function PhoneticChartIPA(props: PhoneticChartIPAProps) {
  const { phoneticIPAData, phoneticIPAData2, phoneticIPAData3 } = props;
  const {
    vowelsAndDiphthongs,
    vowelsAndMonophthongs,
    consonantsAndDiphthongs,
    consonantsAndMonophthongs,
  } = phoneticIPAData2;
  return (
    <Container>
      <Typography
        fontSize={"2rem"}
        fontWeight={800}
        sx={{ mt: "5px" }}
        gutterBottom
        variant="h1"
      >
        Bảng phiên âm tiếng Anh IPA
      </Typography>
      <Divider sx={{ mb: "2rem" }} />
      <Container
        sx={{
          borderRadius: "10px",
          p: "10px",
          boxShadow: "1px 1px 10px 1px #f0f0f0",
        }}
      >
        <Typography sx={{ mb: "1rem" }}>
          <Typography component="strong" variant="strong">
            Bảng phiên âm tiếng Anh đầy đủ
          </Typography>{" "}
          - International Phonetic Alphabet viết tắt IPA là bảng ký hiệu ngữ âm
          quốc tế mà các bạn cần nắm vững khi bắt đầu học tiếng Anh.
        </Typography>
        <Typography sx={{ mb: "1rem" }}>
          Khác với tiếng Việt, khi học tiếng Anh bạn phải tìm hiểu về phiên âm
          quốc tế để hiểu rõ{" "}
          <Typography
            component="i"
            variant="strong"
            sx={{ fontStyle: "italic" }}
          >
            cách phát âm tiếng anh
          </Typography>{" "}
          chứ không phải nhìn vào mặt chữ của từ đó.
        </Typography>

        <Typography
          variant="h2"
          sx={{ fontSize: "2rem", fontWeight: "800", mb: "2rem" }}
        >
          1. Bảng phiên âm tiếng Anh IPA đầy đủ
        </Typography>

        <Typography sx={{ mb: "1rem" }}>
          Không giống mặt chữ cái,{" "}
          <Typography component="i" sx={{ fontWeight: "500" }}>
            bảng phiên âm
          </Typography>{" "}
          là những ký tự Latin mà bạn sẽ thấy khá là lạ lẫm. Cả thảy có{" "}
          <Typography component="i" sx={{ fontWeight: "500" }}>
            44 âm tiếng Anh
          </Typography>{" "}
          cơ bản mà chúng tôi sẽ hướng dẫn sử dụng bảng phiên âm và cách phát âm
          đúng theo chuẩn quốc tế cho bạn ngay dưới đây.
        </Typography>

        <Typography sx={{ mb: "1rem" }}>
          {" "}
          <Typography component="strong" variant="strong">
            Bảng phiên âm tiếng Anh quốc tế
          </Typography>{" "}
          IPA có 44 âm trong đó có 20 nguyên âm (vowel sounds) và 24 phụ âm
          (consonant sounds).
        </Typography>

        <Typography sx={{ mb: "1rem" }}>
          Dưới đây là{" "}
          <Typography component="strong" variant="strong">
            bảng phiên âm tiếng Anh đầy đủ
          </Typography>{" "}
          để các bạn tham khảo:
        </Typography>
        {/* <Table>
          <TableBody>
            <TableRow sx={{ mb: "2rem" }}>
              <TableCell colSpan={2} component="th" align="center" sx={{}}>
                <Typography variant="strong" sx={{ fontSize: "16px" }}>
                  Monophthongs
                </Typography>
              </TableCell>
              <TableCell component="th" align="center">
                <Typography variant="strong" sx={{ fontSize: "16px" }}>
                  Diphthongs
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow sx={{ mb: "2rem" }}>
              <TableCell component="th" align="center">
                <Typography
                  variant="strong"
                  sx={{
                    display: "inline-block",
                    transform: "rotate(270deg)",
                    fontSize: "16px",
                  }}
                >
                  Vowels
                </Typography>
              </TableCell>
              <TableCell>
                <Box>
                  <Grid container spacing={1}>
                    {vowelsAndMonophthongs.map((item, index) => {
                      return (
                        <Grid
                          key={item._id}
                          item={true}
                          xs={1}
                          md={1.2}
                          minWidth={100}
                        >
                          <PhoneticItem index={index} data={item} />
                        </Grid>
                      );
                    })}
                  </Grid>
                </Box>
              </TableCell>
              <TableCell>
                <Box>
                  <Grid container spacing={1}>
                    {vowelsAndDiphthongs.map((item, index) => {
                      return (
                        <Grid
                          key={item._id}
                          item={true}
                          xs={1}
                          md={1.2}
                          minWidth={100}
                        >
                          <PhoneticItem index={index} data={item} />
                        </Grid>
                      );
                    })}
                  </Grid>
                </Box>
              </TableCell>
            </TableRow>
            <TableRow sx={{ mb: "2rem" }}>
              <TableCell component="th" align="center">
                <Typography
                  variant="strong"
                  sx={{
                    display: "inline-block",
                    transform: "rotate(270deg)",
                    fontSize: "16px",
                  }}
                >
                  Consonants
                </Typography>
              </TableCell>
              <TableCell>
                <Box>
                  <Grid container spacing={1}>
                    {consonantsAndMonophthongs.map((item, index) => {
                      return (
                        <Grid
                          key={item._id}
                          item={true}
                          xs={1}
                          md={1.2}
                          minWidth={100}
                        >
                          <PhoneticItem index={index} data={item} />
                        </Grid>
                      );
                    })}
                  </Grid>
                </Box>
              </TableCell>
              <TableCell>
                <Grid container spacing={1}>
                  {consonantsAndDiphthongs.map((item, index) => {
                    return (
                      <Grid
                        key={item._id}
                        item={true}
                        xs={1}
                        md={1.2}
                        minWidth={100}
                      >
                        <PhoneticItem index={index} data={item} />
                      </Grid>
                    );
                  })}
                </Grid>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table> */}
        <Table>
          <TableHead>
            <TableRow sx={{ mb: "2rem" }}>
              <TableCell
                colSpan={5}
                component="th"
                align="center"
                sx={{
                  border: "none",
                  borderRight: "4px solid #fcbf2d",
                  padding: "5px",
                }}
              >
                <Typography variant="strong" sx={{ fontSize: "16px" }}>
                  Monophthongs
                </Typography>
              </TableCell>
              <TableCell
                colSpan={4}
                component="th"
                align="center"
                sx={{
                  border: "none",
                  borderLeft: "4px solid #fcbf2d",
                  padding: "5px",
                }}
              >
                <Typography variant="strong" sx={{ fontSize: "16px" }}>
                  Diphthongs
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {phoneticIPAData3.map((arrIPhoneticIPA, index) => {
              return (
                <TableRow key={index}>
                  {arrIPhoneticIPA.map((item, subIndex) => {
                    if ((index === 0 || index === 3) && subIndex === 0) {
                      return (
                        <React.Fragment
                          key={index === 0 ? "Vowels" : "Consonants"}
                        >
                          <TableCell
                            rowSpan={3}
                            sx={{
                              borderBottom:
                                index === 0 ? "4px solid #fcbf2d" : "none",
                              padding: "5px",
                            }}
                          >
                            <Typography
                              variant="strong"
                              sx={{
                                display: "inline-block",
                                transform: "rotate(270deg)",
                                fontSize: "16px",
                              }}
                            >
                              {index === 0 ? "Vowels" : "Consonants"}
                            </Typography>
                          </TableCell>
                          <TableCell
                            sx={{
                              border: "2px solid #fcbf2d",
                              borderTop:
                                index === 3
                                  ? "4px solid #fcbf2d"
                                  : "2px solid #fcbf2d",
                              padding: "5px",
                            }}
                            key={item._id}
                          >
                            <Grid item={true} xs={1} md={1.2}>
                              <PhoneticItem data={item} />
                            </Grid>
                          </TableCell>
                        </React.Fragment>
                      );
                    } else {
                      return (
                        <TableCell
                          sx={{
                            border: "2px solid #fcbf2d",
                            borderRight:
                              subIndex === 3
                                ? "4px solid #fcbf2d"
                                : "2px solid #fcbf2d",
                            borderTop:
                              index === 3
                                ? "4px solid #fcbf2d"
                                : "2px solid #fcbf2d",
                            padding: "5px",
                          }}
                          key={item._id}
                        >
                          <Grid item={true} xs={1} md={1.2}>
                            <PhoneticItem data={item} />
                          </Grid>
                        </TableCell>
                      );
                    }
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <Typography variant="strong">Ký hiệu:</Typography>
        <Typography>- Vowels: Nguyên âm </Typography>
        <Typography>- Consonants: Phụ âm </Typography>
        <Typography>- Monophthongs: Nguyên âm ngắn </Typography>
        <Typography>- Diphthongs: Nguyên âm dài</Typography>
      </Container>
    </Container>
  );
}

PhoneticChartIPA.Layout = MainLayout;

export async function getServerSideProps() {
  let phoneticIPAData: IPhoneticIPA[] = await postsAPI.getPhoneticData();
  let phoneticIPAData3 = [
    [
      ...phoneticIPAData.filter(
        (i) => i.ordinalNumber > 0 && i.ordinalNumber <= 6
      ),
    ],
    [
      ...phoneticIPAData.filter(
        (i) => i.ordinalNumber > 6 && i.ordinalNumber <= 13
      ),
    ],
    [
      ...phoneticIPAData.filter(
        (i) => i.ordinalNumber > 13 && i.ordinalNumber <= 20
      ),
    ],
    [
      ...phoneticIPAData.filter(
        (i) => i.ordinalNumber > 20 && i.ordinalNumber <= 28
      ),
    ],
    [
      ...phoneticIPAData.filter(
        (i) => i.ordinalNumber > 28 && i.ordinalNumber <= 36
      ),
    ],
    [
      ...phoneticIPAData.filter(
        (i) => i.ordinalNumber > 36 && i.ordinalNumber <= 44
      ),
    ],
  ];

  let phoneticIPAData2 = {
    vowelsAndMonophthongs: phoneticIPAData.filter(
      (i) => i.vowels && i.Monophthongs
    ),
    vowelsAndDiphthongs: phoneticIPAData.filter(
      (i) => i.vowels && i.Diphthongs
    ),
    consonantsAndMonophthongs: phoneticIPAData.filter(
      (i) => i.consonants && i.Monophthongs
    ),
    consonantsAndDiphthongs: phoneticIPAData.filter(
      (i) => i.consonants && i.Diphthongs
    ),
  };
  return {
    props: {
      phoneticIPAData,
      phoneticIPAData2,
      phoneticIPAData3,
    },
  };
}
