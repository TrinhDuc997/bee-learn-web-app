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
import { dataPOSMap } from "utils/dataCommon";

type VocabularyReviewProps = {
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
  const { options, dataWord = {} } = props;
  const { examples = [] } = dataWord;
  const {
    example = "",
    translateExample = "",
    type = "",
    translation,
  } = examples[0] || {};
  const pos = dataPOSMap[type];
  const correctAnswer = dataWord.word || "";
  const similarWord =
    example.split(" ").find((i) => i.includes(correctAnswer)) || "";
  const formatQuestion = example.replace(
    similarWord,
    Array(similarWord.length).fill("_").join("")
  );
  const [isCorrect, setIsCorrect] = useState(false);
  const [open, setOpen] = useState(false);
  const divRef = useRef(null);
  const pronunciation = _.getIpaPronunciation(dataWord.word || "");
  const handleSubmit = (selectedOption: string) => {
    responsiveVoice(dataWord.word || "");

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
              <Typography variant="body1">{pos}</Typography>
            </Grid>
            <Grid item textAlign={"center"}>
              <Typography variant="body1">{translation}</Typography>
            </Grid>
            <Grid item textAlign={"center"}>
              <Typography variant="body1">
                {example ? `Ex: ${example}` : ""}
              </Typography>
            </Grid>
            <Grid item textAlign={"center"}>
              <Typography variant="body1">{translateExample}</Typography>
            </Grid>
          </Grid>
        </Paper>
      </InformFlashCard>
    </Grid>
  );
};

export default forwardRef(ExampleForReview);
