import { Box, Button, CircularProgress, Grid } from "@mui/material";
import { useRouter } from "next/router";
import * as React from "react";
import { wordsAPI } from "@api-client";
import CustomizedProgressBars from "@components/common/loadingComponent/CircularLoading";
import BasicPagination from "@components/common/navigate/Pagination";
import { LearningLayout } from "@components/layouts";
import { VocabularyCard } from "@components/learnVocabulary";
import _ from "@components/common";
// import axios from "axios";
import { IWords } from "@interfaces";
import Flashcard, { IRefFlascard } from "@components/learnVocabulary/FlashCard";
import { AnimatePresence, motion } from "framer-motion";
import SpellWord from "@components/learnVocabulary/SpellWord";
import SpellWordV2 from "@components/learnVocabulary/SpellWordV2";
import { BannerTitle } from "@components/common/header/BannerTitle";
import ReInputWord from "@components/learnVocabulary/ReInputWord";
export interface IListWordsProps {}
const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      display: "none",
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
};
export default function LearnNewWord(props: IListWordsProps) {
  const router = useRouter();
  const { query } = router;
  const [dataWords, setDataWords] = React.useState<IWords>([]);
  const [isLoading, setLoading] = React.useState(false);
  const [step, setStep] = React.useState(1);
  const dataFetchedRef = React.useRef(false);
  const flashcardRef = React.useRef<IRefFlascard>(null);

  // func handle change page to get data --- start

  const [[pageWord, direction], setPageWord] = React.useState([0, 0]);
  const paginate = (newDirection: number) => {
    console.log(
      "🚀 ~ file: learn-new-word.tsx:97 ~ paginate ~ newDirection:",
      newDirection
    );
    if (pageWord + newDirection > dataWords.length - 1) {
      setPageWord([0, 0]);
    } else if (pageWord + newDirection < 0) {
      setPageWord([dataWords.length + newDirection, newDirection]);
    } else {
      setPageWord([pageWord + newDirection, newDirection]);
    }
  };
  // func handle change page to get data --- end
  const handleNextStep = () => {
    const flashcardElement = flashcardRef.current;
    if (!!flashcardElement) {
      // Check flash card is Flipped yet!
      const isFlipped = flashcardElement.doSomething();
      if (isFlipped) {
        setStep((step) => {
          if (step === 3) {
            paginate(1);
          }
          return step === 3 ? 1 : step + 1;
        });
      } else {
        flashcardElement.handleClick();
      }
    } else {
      setStep((step) => {
        if (step === 3) {
          paginate(1);
        }
        return step === 3 ? 1 : step + 1;
      });
    }
  };
  React.useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    setLoading(true);
    const fetchDataVocabSubject = async () => {
      const listWords: IWords = await wordsAPI.getListVocabulary({
        limit: 20,
        subject: query.subject || "",
        page: query.numberPack, // với trường hợp khóa học là từ vựng cơ bản thì sẽ giới hạn mỗi pack sẽ là 20 từ và gửi số pack lên để lấy dữ liệu
      });
      setDataWords(listWords);
      setLoading(false);
    };
    fetchDataVocabSubject().catch(console.error);
    console.log("componentDidMount");
    addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        const btnContinue = document.getElementById("btn-continue");
        if (!!btnContinue) {
          btnContinue.click();
        }
      }
    });
  }, []);
  //ComponentDidMount run first times --- end

  if (isLoading) return <CustomizedProgressBars />;
  return (
    <Grid container height={"100%"}>
      <Grid item xs={3} height={"100%"}></Grid>
      <Grid item xs={6} height={"100%"}>
        <Box
          sx={{
            boxShadow: "0px 30px 20px 20px #f0f0f0",
            pl: "0px",
            pr: "0px",
            overflow: "hidden",
          }}
          height={"100%"}
          paddingTop={"1rem"}
          paddingBottom={"1rem"}
          id="learn-new-word"
        >
          <Grid
            sx={{ flexGrow: 1, height: "100%", alignItems: "center" }}
            justifyContent="center"
            container
            direction={"column"}
            flexWrap={"nowrap"}
            spacing={2}
          >
            <Grid item>
              <BannerTitle title={query.subject as string} />
            </Grid>
            <Grid item xs={12}>
              <Grid container justifyContent="center" spacing={4} pt={"2rem"}>
                {/* <Grid item sx={{ display: "flex", alignItems: "center" }}>
                  <Box className="prev" onClick={() => paginate(-1)}>
                    {"‣"}
                  </Box>
                </Grid> */}
                <Grid item textAlign={"center"}>
                  {step === 1 && (
                    <Flashcard
                      pageWord={pageWord}
                      direction={direction}
                      dataWords={dataWords}
                      paginate={paginate}
                      handleNextStep={handleNextStep}
                      ref={flashcardRef}
                    />
                  )}
                  {step === 2 && <SpellWordV2 dataWord={dataWords[pageWord]} />}
                  {step === 3 && <ReInputWord dataWord={dataWords[pageWord]} />}
                </Grid>
                {/* <Grid item sx={{ display: "flex", alignItems: "center" }}>
                  <Box className="next" onClick={() => paginate(1)}>
                    {"‣"}
                  </Box>
                </Grid> */}
              </Grid>
            </Grid>
            <Grid item>
              <Button
                sx={{
                  width: "250px",
                  height: "40px",
                  fontWeight: "bold",
                  borderRadius: "15px",
                  border: "2px solid",
                  boxShadow: "-1px 4px 2px 0px",
                }}
                variant="outlined"
                onClick={() => {
                  handleNextStep();
                }}
                id="btn-continue"
              >
                Tiếp tục
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Grid>
      <Grid item xs={3} height={"100%"}>
        <Box height={"100%"} width={"100%"}></Box>
      </Grid>
    </Grid>
  );
}

LearnNewWord.Layout = LearningLayout;
