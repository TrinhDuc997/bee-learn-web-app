import {
  ChangeEvent,
  KeyboardEvent,
  Ref,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import TextField from "@mui/material/TextField";
import { Box, Grid, Paper, Typography } from "@mui/material";
import { IWord, partOfSpeechMap } from "@interfaces";
import InformFlashCard from "../InformFlashCard";
import _ from "@components/common";
import DurationCircle from "@components/common/DurationCircle";
import { dataPOSMap } from "utils/dataCommon";
// import responsiveVoice from "utils/responsiveVoice";

interface InputWordProps {
  dataWord: IWord;
}

export interface RefReInputWordReview {
  getWordReInput: Function;
  handleInputIncorrectReInput: Function;
  setInput: Function;
  openNotice: boolean;
  isReivewCorrectly: boolean;
  setOpenNotice: Function;
}

function ReInputWordReview(
  props: InputWordProps,
  ref?: Ref<RefReInputWordReview>
) {
  const { dataWord = {} } = props;
  const { word = "", examples = [] } = dataWord;
  const {
    translation,
    type = "",
    example,
    translateExample,
  } = examples[0] || {};
  const pos = dataPOSMap[type] || type;
  const [input, setInput] = useState<string>("");
  const pronunciation = _.getIpaPronunciation(word);

  const [open, setOpen] = useState(false);
  const inputRef = useRef(null);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    // if (open) {
    //   // in case the user input is incorrect and when input again then the hide notifications
    //   setOpen(false);
    // }
    setInput(event.target.value.toUpperCase());
  };

  useEffect(() => {
    const nextInput = document.getElementById(`ReInputWordReview`);
    nextInput?.focus();
  }, [word]);

  const handleInputIncorrectReInput = (isInCorrect: boolean) => {
    setOpen(isInCorrect);
  };
  const getWordReInput = () => {
    return input;
  };
  useImperativeHandle(ref, () => ({
    getWordReInput,
    handleInputIncorrectReInput,
    setInput,
    openNotice: open,
    isReivewCorrectly: input.toUpperCase() === word?.toUpperCase(),
    setOpenNotice: (isOpen: boolean) => {
      setOpen(isOpen);
    },
  }));

  return (
    <Grid container direction={"column"}>
      <Grid item mb={"1rem"}>
        <Typography variant="h5" color={"primary.main"}>
          {translation}
        </Typography>
        <Typography variant="body1" color={"primary.main"}>
          ({pos})
        </Typography>
      </Grid>

      <Grid item>
        <TextField
          inputProps={{
            style: {
              textAlign: "center",
              borderColor: "secondary.main",
            },
          }}
          autoComplete="off"
          color="primary"
          sx={{
            marginLeft: "4px",
            marginRight: "4px",
            minWidth: "300px",
            borderColor: "secondary.main",
            "& .MuiOutlinedInput-root": {
              borderRadius: "10px",
              borderColor: "secondary.main",
            },
          }}
          value={input}
          variant="outlined"
          size="medium"
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            handleInputChange(event);
          }}
          id="ReInputWordReview"
          ref={inputRef}
        />
      </Grid>
      <InformFlashCard open={open} locateRefElement={inputRef}>
        <Paper
          sx={{
            backgroundColor:
              input.toUpperCase() === word?.toUpperCase()
                ? "success.light"
                : "error.light",
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
              <Typography variant="h5">{_.capitalizeWord(word)}</Typography>
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
}

export default forwardRef(ReInputWordReview);
