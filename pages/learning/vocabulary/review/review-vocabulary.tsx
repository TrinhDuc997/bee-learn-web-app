import { Box, Button, Grid, IconButton } from "@mui/material";
import { useRouter } from "next/router";
import * as React from "react";
import { wordsAPI } from "@api-client";
import CustomizedProgressBars from "@components/common/loadingComponent/CircularLoading";
import { LearningLayout } from "@components/layouts";
import _ from "@components/common";
import { IWord, IWords } from "@interfaces";
import SliderBee from "@components/common/SliderBee";
import Loading from "@components/common/loadingPage";
import SpellWordReview, {
  IRefSpellWordReview,
} from "@components/learnVocabulary/review/SpellWordReview";
import ReInputWordReview, {
  RefReInputWordReview,
} from "@components/learnVocabulary/review/ReInputWordReview";
import ExampleForReview, {
  RefExampleForReview,
} from "@components/learnVocabulary/review/ExampleForReview";
import ListenAndRewrite, {
  RefListenAndRewrite,
} from "@components/learnVocabulary/review/ListenAndRewrite";
import responsiveVoice from "utils/responsiveVoice";
import { useSession } from "next-auth/react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export interface IListWordsReviewProps {}

function getRandomGameToReview(preGame: number): number {
  // Updating will the game reviewing vocabulary flow for each word later.
  let newGame: number = preGame;
  while (newGame === preGame) {
    newGame = Math.ceil(Math.random() * 4);
  }
  return newGame;
}

function getRandomObject(data: IWords, numberOfWordsIsGet: number = 3): IWords {
  let randomObjects: IWord[] = [];
  for (let i = 0; i < numberOfWordsIsGet; i++) {
    // Generate a random index within the remaining data array length
    const randomIndex = Math.floor(Math.random() * data.length);

    // Push the selected object into the randomObjects array
    randomObjects.push(data[randomIndex]);
  }
  return randomObjects;
}
function shuffleData(data: IWords) {
  for (let i = data.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [data[i], data[j]] = [data[j], data[i]];
  }
  return data;
}
/**
 * when reviewing vocabulary will have 4 games to review
 *  game 1: You are reading the meaning of Vietnamese, translating it to English, and spelling that.
 *  game 2: You are reading meaning and translation to English.
 *  game 3: Giving an example sentence with missed words and select an answer to fill up in place of missed
 *  game 4: listening and writing again.
 *
 * how to get data to review words.
 *  Words will have lastTimeReview. nextTimeReview will base on lastTimeReview plus amount of time corresponding to each level:
 *      with words in level1 review once an hour: ex: lastTimeReview: 2023/05/20 08:30 => nextTimeReview: 2023/05/20 09:30
 *      with words in level2 review once a day
 *      with words in level3 once each two day
 *      with words in level4 once every three days.
 *
 * with each vocabulary review will get 100 words to review
 */
export default function ReviewVocabulary(props: IListWordsReviewProps) {
  const router = useRouter();
  // const { query } = router;
  const [dataWords, setDataWords] = React.useState<IWords>([]);
  const dataWordsRef = React.useRef(dataWords);

  const [isLoading, setLoading] = React.useState(false);
  const [loadingFinish, setLoadingFinish] = React.useState(false);
  const [game, setGame] = React.useState(getRandomGameToReview(1));
  const [[pageWord, direction], setPageWord] = React.useState([0, 0]);

  const { data: session } = useSession();
  const { user } = session || {};
  const { id = "" } = user || {};

  // const flashcardRef = React.useRef<IRefFlascard>(null);
  const SpellWordReviewRef = React.useRef<IRefSpellWordReview>(null);
  const ReInputWordReviewRef = React.useRef<RefReInputWordReview>(null);
  const exampleForReviewRef = React.useRef<RefExampleForReview>(null);
  const listenAndRewriteRef = React.useRef<RefListenAndRewrite>(null);

  const dataWord = dataWords[pageWord];
  const { examples = [] } = dataWord || {};
  const { translation } = examples[0] || {};

  let dataGame4: IWords = [];
  if (game === 3 && !!dataWord) {
    dataGame4 = [...getRandomObject(dataWords), dataWord];
    dataGame4 = shuffleData(dataGame4);
  }

  // func handle --- start

  const paginate = async (newDirection: number) => {
    if (pageWord + newDirection > dataWords.length - 1) {
      const dataSubmit = {
        id: id,
        isLearnNewWord: false,
        isReviewWords: true,
        wordsLearned: dataWordsRef.current,
      };
      await wordsAPI.updateWordsUserLearned(dataSubmit);
      router.push("/learning/vocabulary/review");
    } else if (pageWord + newDirection < 0) {
      setPageWord(() => {
        setGame((preGame) => getRandomGameToReview(preGame));
        return [dataWords.length + newDirection, newDirection];
      });
    } else {
      setPageWord(() => {
        setGame((preGame) => getRandomGameToReview(preGame));
        return [pageWord + newDirection, newDirection];
      });
    }
  };
  const updateWordReviewed = (
    wordReviewed: string,
    isReviewCorrect: boolean
  ) => {
    setDataWords((oldDataWords) => {
      const newDataWords = oldDataWords.map((item) => {
        if (item.word === wordReviewed) {
          return {
            ...item,
            numberOfReview: (item.numberOfReview || 0) + 1,
            numberOfReviewCorrect:
              (item.numberOfReviewCorrect || 0) + (isReviewCorrect ? 1 : 0),
          };
        }
        return item;
      });
      dataWordsRef.current = newDataWords;
      paginate(1);
      return newDataWords;
    });
  };
  const handleNextWord = () => {
    const SpellWordReviewElement = SpellWordReviewRef.current;
    const ReInputWordReviewRefElement = ReInputWordReviewRef.current;
    const exampleForReviewRefElement = exampleForReviewRef.current;
    const listenAndRewriteRefElement = listenAndRewriteRef.current;

    if (!!SpellWordReviewElement && game === 1) {
      // handle game 1
      // const inputWord = SpellWordReviewElement.getInputSpellWordReview();
      const checked = SpellWordReviewElement.openNotice;
      const isReivewCorrectly = SpellWordReviewElement.isReviewCorrectly;
      if (!checked) {
        responsiveVoice(dataWord.word || "");
        SpellWordReviewElement.setOpenNotice(true);
      } else {
        SpellWordReviewElement.setOpenNotice(false);
        // setGame((preGame) => getRandomGameToReview(preGame));
        SpellWordReviewElement.setInputs([]);
        updateWordReviewed(dataWord.word || "", isReivewCorrectly);
        // paginate(1);
      }
    } else if (!!ReInputWordReviewRefElement && game === 2) {
      // handle game 2
      // const ReInputWordReview = ReInputWordReviewRefElement.getWordReInput();
      const checked = ReInputWordReviewRefElement.openNotice;
      const isReivewCorrectly = ReInputWordReviewRefElement.isReivewCorrectly;
      if (!checked) {
        responsiveVoice(dataWord.word || "");
        ReInputWordReviewRefElement?.setOpenNotice(true);
      } else {
        ReInputWordReviewRefElement.setOpenNotice(false);
        // setGame((preGame) => getRandomGameToReview(preGame));
        ReInputWordReviewRefElement.setInput("");
        updateWordReviewed(dataWord.word || "", isReivewCorrectly);
        // paginate(1);
      }
    } else if (!!exampleForReviewRefElement && game === 3) {
      // handle game 3
      const checked = exampleForReviewRefElement.openNotice;
      const isReivewCorrectly = exampleForReviewRefElement.isReivewCorrectly;

      if (checked) {
        exampleForReviewRefElement.setOpenNotice(false);
        // setGame((preGame) => getRandomGameToReview(preGame));
        updateWordReviewed(dataWord.word || "", isReivewCorrectly);
        // paginate(1);
      }
    } else if (!!listenAndRewriteRefElement && game === 4) {
      // handle game 4
      // const ReInputWordReview = listenAndRewriteRefElement.getWordReInput();
      const checked = listenAndRewriteRefElement.openNotice;
      const isReivewCorrectly = listenAndRewriteRefElement.isReivewCorrectly;
      if (!checked) {
        responsiveVoice(dataWord.word || "");
        listenAndRewriteRefElement?.setOpenNotice(true);
      } else {
        listenAndRewriteRefElement.setOpenNotice(false);
        listenAndRewriteRefElement.setInput("");
        updateWordReviewed(dataWord.word || "", isReivewCorrectly);
      }
    }
  };

  // func handle --- end

  // React useEffect --- STAT
  const eventListenerKeydown = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      const btnContinue = document.getElementById(
        "btn-continue-review-vocabulary"
      );
      if (!!btnContinue) {
        btnContinue.click();
      }
    }
    if (["1", "2", "3", "4"].includes(event.key)) {
      // declaring an event for game 3, using key 1 || 2 || 3 || 4 to select answers
      const btnOption = document.getElementById(`option-${event.key}`);
      if (!!btnOption) {
        btnOption.click();
      }
    }
  };
  React.useEffect(() => {
    addEventListener("keydown", eventListenerKeydown);
    setLoading(true);
    const fetchDataVocabSubject = async () => {
      const listWords: IWords = await wordsAPI.getListWordsToReview({ id });
      setDataWords(listWords);
      setLoading(false);
    };
    fetchDataVocabSubject().catch(console.error);
    return () => {
      removeEventListener("keydown", eventListenerKeydown);
    };
  }, []);

  if (isLoading) return <CustomizedProgressBars />;
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
            <Grid item container width={"100%"} alignItems={"flex-end"}>
              <Grid item width={"10%"} textAlign="center">
                <IconButton>
                  <ArrowBackIcon
                    sx={{
                      fontSize: "40px",
                      color: "secondary.main",
                    }}
                  />
                </IconButton>
              </Grid>
              <Grid item width={"80%"}>
                <SliderBee max={dataWords.length} value={pageWord} />
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container justifyContent="center" spacing={4} pt={"2rem"}>
                <Grid item textAlign={"center"}>
                  {game === 1 && (
                    <SpellWordReview
                      dataWord={dataWord}
                      ref={SpellWordReviewRef}
                    />
                  )}
                  {game === 2 && (
                    <ReInputWordReview
                      dataWord={dataWord}
                      ref={ReInputWordReviewRef}
                    />
                  )}
                  {game === 3 && (
                    <ExampleForReview
                      options={dataGame4.map((i) => i.word || "")}
                      dataWord={dataWord}
                      ref={exampleForReviewRef}
                    />
                  )}
                  {game === 4 && (
                    <ListenAndRewrite
                      dataWord={dataWord}
                      ref={listenAndRewriteRef}
                    />
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
                  handleNextWord();
                }}
                id="btn-continue-review-vocabulary"
              >
                Tiếp tục
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

ReviewVocabulary.Layout = LearningLayout;
