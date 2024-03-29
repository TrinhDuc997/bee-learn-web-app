import { Box, Button, CircularProgress, Grid } from "@mui/material";
import { useRouter } from "next/router";
import * as React from "react";
import { wordsAPI } from "@api-client";
import CustomizedProgressBars from "@components/common/loadingComponent/CircularLoading";
import { LearningLayout } from "@components/layouts";
import _ from "@components/common";
// import axios from "axios";
import { IWordLeaned, IWords } from "@interfaces";
import Flashcard, { IRefFlascard } from "@components/learnVocabulary/FlashCard";
import SpellWordV2, {
  IRefSpellWordV2,
} from "@components/learnVocabulary/newVocab/SpellWordV2";
import { BannerTitle } from "@components/common/header/BannerTitle";
import Loading from "@components/common/loadingPage";
import ReInputWord, {
  RefReInputWord,
} from "@components/learnVocabulary/newVocab/ReInputWord";
import SliderBee from "@components/common/SliderBee";
// import { useAuth } from "@hooks";
import { useSession } from "next-auth/react";
export interface IListWordsProps {}
// const variants = {
//   enter: (direction: number) => {
//     return {
//       x: direction > 0 ? 1000 : -1000,
//       opacity: 0,
//     };
//   },
//   center: {
//     zIndex: 1,
//     x: 0,
//     opacity: 1,
//   },
//   exit: (direction: number) => {
//     return {
//       zIndex: 0,
//       display: "none",
//       x: direction < 0 ? 1000 : -1000,
//       opacity: 0,
//     };
//   },
// };
export default function LearnNewWord(props: IListWordsProps) {
  const router = useRouter();
  const { query } = router;
  const [dataWords, setDataWords] = React.useState<IWords>([]);
  const [isLoading, setLoading] = React.useState(false);
  const [loadingFinish, setLoadingFinish] = React.useState(false);
  const [step, setStep] = React.useState(1);
  const [[pageWord, direction], setPageWord] = React.useState([18, 18]);
  const { data: session, update } = useSession();
  const { user } = session || {};
  const { id = "", tags = [] } = user || {};

  const dataFetchedRef = React.useRef(false);
  const flashcardRef = React.useRef<IRefFlascard>(null);
  const spellWordV2Ref = React.useRef<IRefSpellWordV2>(null);
  const reInputWordRef = React.useRef<RefReInputWord>(null);

  const dataWord = dataWords[pageWord];
  // func handle --- start

  const paginate = (newDirection: number) => {
    if (pageWord + newDirection > dataWords.length - 1) {
      setPageWord([0, 0]);
    } else if (pageWord + newDirection < 0) {
      setPageWord([dataWords.length + newDirection, newDirection]);
    } else {
      setPageWord([pageWord + newDirection, newDirection]);
    }
  };
  const handleNextStep = () => {
    const flashcardElement = flashcardRef.current;
    const spellWordV2Element = spellWordV2Ref.current;
    const reInputWordRefElement = reInputWordRef.current;

    if (!!flashcardElement && step === 1) {
      const isFlipped = flashcardElement.doSomething();
      if (isFlipped) {
        setStep(2);
        // flashcardElement.setDefaultFlashcard();
      } else {
        flashcardElement.handleClick();
      }
    } else if (!!spellWordV2Element && step === 2) {
      const inputWord = spellWordV2Element.getInputSpellWordV2();
      if (inputWord === dataWord.word?.toUpperCase()) {
        setStep(3);
      } else {
        spellWordV2Element.handleInputIncorrect(
          inputWord !== dataWord.word?.toUpperCase()
        );
      }
    } else if (!!reInputWordRefElement && step === 3) {
      const reInputWord = reInputWordRefElement.getWordReInput();
      if (reInputWord === dataWord.word?.toUpperCase()) {
        setStep(1);
        if (pageWord === dataWords.length - 1) {
          // Once the user learned all the new words
          handleSubmit();
        } else {
          paginate(1);
        }
      } else {
        reInputWordRefElement?.handleInputIncorrectReInput(
          reInputWord !== dataWord.word?.toUpperCase()
        );
      }
    }
  };

  async function handleSubmit() {
    setLoadingFinish(true);
    // những field cần lưu: số lần review: defaule 1, số lần review đúng, thời gian review gần nhất, word
    const defaultTagId = tags[0]._id || "";
    const wordsLearned: IWordLeaned[] = dataWords.map((item) => {
      return {
        word: item.word || "",
        numberOfReview: 4,
        numberOfReviewCorrect: 0,
        tagIds: [defaultTagId],
      };
    });
    const course = localStorage.getItem("subject") || "TOEIC";
    const dataSubmit = {
      id: id,
      isLearnNewWord: true,
      wordsLearned,
      courseLearned: {
        course,
        subject: query.subject,
        numberPacks: [Number(query.numberPack) || 0],
      },
    };
    setLoadingFinish(true);
    const newdata = await wordsAPI.updateWordsUserLearned(dataSubmit);
    await update({ ...session, user: newdata });
    router.push("/learning/vocabulary/subjects/");
    // setLoadingFinish(false);
  }
  // func handle --- end

  // React useEffect --- STAT
  const handleClickButonContinue = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      const btnContinue = document.getElementById(
        "btn-continue-learn-new-word"
      );
      if (!!btnContinue) {
        btnContinue.click();
      }
    }
  };
  React.useEffect(() => {
    addEventListener("keydown", handleClickButonContinue);
    return () => {
      removeEventListener("keydown", handleClickButonContinue);
    };
  }, []);
  React.useEffect(() => {
    if (!!query.subject) {
      setLoading(true);
      const fetchDataVocabSubject = async () => {
        const listWords: IWords = await wordsAPI.getListVocabulary({
          limit: 20,
          subject: query.subject || "",
          page: query.numberPack, // In case the course is basic vocabulary, limiting each pack is 20 words and sending the pack numbers to get data.
        });
        setDataWords(listWords);
        setLoading(false);
      };
      fetchDataVocabSubject().catch(console.error);
    }
  }, [query.subject]);
  // React useEffect --- END

  if (isLoading || !query.subject) return <CustomizedProgressBars />;
  if (loadingFinish) return <Loading />;
  return (
    <Grid container height={"100%"}>
      <Grid item lg={3} md={1} sm={1} xs={0} height={"100%"}></Grid>
      <Grid item lg={6} md={10} sm={10} xs={12} height={"100%"}>
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
            <Grid item width={"60%"}>
              <BannerTitle title={query.subject as string} />
            </Grid>
            <Grid item width={"80%"}>
              <SliderBee max={dataWords.length} value={pageWord} />
            </Grid>
            <Grid item xs={12}>
              <Grid container justifyContent="center" spacing={4}>
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
                  {step === 2 && (
                    <SpellWordV2 dataWord={dataWord} ref={spellWordV2Ref} />
                  )}
                  {step === 3 && (
                    <ReInputWord dataWord={dataWord} ref={reInputWordRef} />
                  )}
                </Grid>
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
                id="btn-continue-learn-new-word"
              >
                Tiếp tục
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="text"
                onClick={() => {
                  setStep(1);
                  if (pageWord === dataWords.length - 1) {
                    // Once the user learned all the new words
                    handleSubmit();
                  } else {
                    paginate(1);
                  }
                }}
                id="btn-continue-learn-new-word"
              >
                Đã học
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

LearnNewWord.Layout = LearningLayout;
