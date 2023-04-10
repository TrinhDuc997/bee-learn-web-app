import { Box, Button, Typography } from "@mui/material";
import { Container, Stack } from "@mui/system";
import Image from "next/image";
import { useRouter } from "next/router";
import * as React from "react";
import englishVocab from "../../public/sectionPicture/english-vocab2.png";
import sectionGrammar from "../../public/sectionPicture/sectionGrammar.jpeg";
import sectionToeicIelts from "../../public/sectionPicture/sectionToeicIelts.jpeg";
export function HeroSection() {
  const router = useRouter();
  return (
    <Box
      display={{ xs: "none", md: "block" }}
      sx={{ m: "1rem" }}
      component="section"
    >
      <Container>
        <Stack
          direction={"row"}
          justifyContent="flex-start"
          sx={{
            pb: "3rem",
            pt: "2rem",
          }}
        >
          <Box padding={"2rem"} width={"60%"}>
            <Typography
              sx={{ mb: "2rem" }}
              color={"primary.dark"}
              component="h1"
              variant="h4"
              fontWeight={"bold"}
            >
              Ghi nhớ 1000 từ vựng trong 1 tháng
            </Typography>
            <Typography sx={{ mb: "1rem" }}>
              Ứng dụng học từ vụng hiệu quả
            </Typography>
            <Typography sx={{ mb: "1rem" }}>
              Học đúng thời điểm vàng giúp bạn học ít vẫn dễ dàng nhớ ngàn từ
              vựng
            </Typography>
            <Typography sx={{ mb: "1rem" }}>
              6000 từ vựng chia theo từng chủ để
            </Typography>
            <Button
              sx={{ ml: "1rem" }}
              variant="contained"
              onClick={() => {
                router.push("/learnVocabulary");
              }}
            >
              HỌC THỬ NGAY
            </Button>
          </Box>
          <Box width={"40%"}>
            <Image
              src={englishVocab}
              layout="responsive"
              alt="english-vocab2"
            />
          </Box>
        </Stack>

        <Stack
          direction={"row"}
          justifyContent="flex-start"
          sx={{
            pb: "3rem",
            pt: "2rem",
          }}
        >
          <Box width={"40%"}>
            <Image
              src={sectionGrammar}
              layout="responsive"
              alt="english-grammar"
            />
          </Box>
          <Box padding={"2rem"} width={"60%"}>
            <Typography
              sx={{ mb: "2rem" }}
              color={"primary.dark"}
              component="h1"
              variant="h4"
              fontWeight={"bold"}
            >
              Dễ dàng duy trì thói quen học tiếng Anh
            </Typography>
            <Typography sx={{ mb: "1rem" }}>
              Ứng dụng nhắc bạn học vào thời điểm vàng giúp bạn dễ dàng duy trì
              thói quen.
            </Typography>
            <Typography sx={{ mb: "1rem" }}>
              cung cấp khá đầy đủ các kiến thức ngữ pháp quan trọng. Nếu bạn
              đang bắt đầu “cày” IELTS thì đây là một website vô cùng cần thiết
              cho các bạn ôn tập ngữ pháp. Các bài học được tích hợp đan xen với
              các câu đố, trò chơi giải trí.
            </Typography>
            <Typography sx={{ mb: "1rem" }}></Typography>
            <Button sx={{ ml: "1rem" }} variant="contained">
              BẮT ĐẦU NGAY
            </Button>
          </Box>
        </Stack>

        <Stack
          direction={"row"}
          justifyContent="flex-start"
          sx={{
            pb: "3rem",
            pt: "2rem",
          }}
        >
          <Box padding={"2rem"} width={"60%"}>
            <Typography
              sx={{ mb: "2rem" }}
              color={"primary.dark"}
              component="h1"
              variant="h4"
              fontWeight={"bold"}
            >
              Ứng dụng cung cấp kho dề thi online Toeic và Ielts khủng
            </Typography>
            <Typography sx={{ mb: "1rem" }}>
              Ứng dụng giao diện thân thiện, dễ tính thời gian làm bài như thi
              thật.
            </Typography>
            <Typography sx={{ mb: "1rem" }}>
              có lời giải chi tiết sau mỗi bài thi.
            </Typography>
            <Typography sx={{ mb: "1rem" }}>
              report điểm tự động, đánh giá chi tiết bài thi
            </Typography>
            <Typography sx={{ mb: "1rem" }}></Typography>
          </Box>
          <Box width={"40%"} pt={"30px"}>
            <Image
              src={sectionToeicIelts}
              layout="responsive"
              alt="english-vocab2"
            />
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
