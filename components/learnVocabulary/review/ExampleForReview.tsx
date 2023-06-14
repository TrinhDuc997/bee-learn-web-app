import React, {
  Ref,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Button, Grid, Paper, Stack, Typography } from "@mui/material";
import InformFlashCard from "../InformFlashCard";
import { IWord, partOfSpeechMap } from "@interfaces";
import _ from "@components/common";
import responsiveVoice from "utils/responsiveVoice";

type VocabularyReviewProps = {
  question: string;
  options: string[];
  // onSubmit?: Function;
  dataWord: IWord;
};

export interface RefExampleForReview {
  isCorrect: boolean;
  openNotice: boolean;
  setOpenNotice: Function;
}
const ExampleForReview = (
  props: VocabularyReviewProps,
  ref?: Ref<RefExampleForReview>
) => {
  const { question, options, dataWord = {} } = props;
  const correctAnswer = dataWord.word || "";
  const formatQuestion = question.replace(
    correctAnswer,
    Array(correctAnswer.length).fill("_").join("")
  );
  const [isCorrect, setIsCorrect] = useState(false);
  const [open, setOpen] = useState(false);
  const divRef = useRef(null);
  const pronunciation = _.getIpaPronunciation(dataWord.word || "");
  const handleSubmit = (selectedOption: string) => {
    responsiveVoice(dataWord.word || "");
    console.log(
      "🚀 ~ file: ExampleForReview.tsx:48 ~ handleSubmit ~ correctAnswer:",
      dataWord.word || ""
    );

    const isCorrect = selectedOption === correctAnswer;
    setIsCorrect(isCorrect);
    setOpen(true);
    // onSubmit(isCorrect);
  };
  useImperativeHandle(ref, () => ({
    isCorrect,
    openNotice: open,
    setOpenNotice: (isOpen: boolean) => {
      setOpen(isOpen);
    },
  }));

  useEffect(() => {});

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography
          variant="h5"
          sx={{ fontWeight: "bold" }}
          color={"primary.dark"}
        >
          {formatQuestion}
        </Typography>
      </Grid>
      <Grid item xs={12} ref={divRef}>
        <Stack spacing={2} alignItems={"center"}>
          {options.map((option, index) => (
            <Button
              key={index}
              variant="outlined"
              // color="secondary"
              sx={{ width: "90%" }}
              id={`option-${index + 1}`}
              onClick={() => handleSubmit(option)}
            >
              {option}
            </Button>
          ))}
        </Stack>
      </Grid>
      <InformFlashCard open={open} locateRefElement={divRef}>
        <Paper
          sx={{
            backgroundColor: isCorrect ? "success.light" : "error.light",
            borderRadius: "15px",
            color: "secondary.contrastText",
            pb: "2rem",
          }}
        >
          <Grid
            container
            direction={"column"}
            spacing={2}
            sx={{ alignItems: "center" }}
          >
            <Grid item>
              <Typography variant="h5">
                {_.capitalizeWord(correctAnswer)}
              </Typography>
            </Grid>
            {!!pronunciation && (
              <Grid item>
                <Typography variant="body1">/ {pronunciation} /</Typography>
              </Grid>
            )}
            <Grid item>
              <Typography variant="body1">
                {partOfSpeechMap[dataWord.pos || ""] ||
                  dataWord.description?.split(":")[0]}
              </Typography>
            </Grid>
            <Grid item textAlign={"center"}>
              <Typography variant="body1">{dataWord.definition}</Typography>
            </Grid>
          </Grid>
        </Paper>
      </InformFlashCard>
    </Grid>
  );
};

export default forwardRef(ExampleForReview);
