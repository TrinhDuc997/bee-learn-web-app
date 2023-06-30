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
import responsiveVoice from "utils/responsiveVoice";

interface InputWordProps {
  dataWord: IWord;
  showDuration?: boolean;
}

export interface RefReInputWord {
  getWordReInput: Function;
  handleInputIncorrectReInput: Function;
  setInput: Function;
}

function ReInputWord(props: InputWordProps, ref?: Ref<RefReInputWord>) {
  const { dataWord = {}, showDuration = true } = props;
  const { word = "" } = dataWord;
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
    const nextInput = document.getElementById(`reInputWord`);
    nextInput?.focus();
  }, [word]);

  const handleInputIncorrectReInput = (isInCorrect: boolean) => {
    if (isInCorrect) {
      responsiveVoice(dataWord.word || "");
    }
    setOpen(isInCorrect);
  };
  const getWordReInput = () => {
    return input;
  };
  useImperativeHandle(ref, () => ({
    getWordReInput,
    handleInputIncorrectReInput,
    setInput,
  }));

  return (
    <Grid container direction={"column"}>
      <Grid item>
        <Typography variant="h5" color={"primary.main"} sx={{ margin: "1rem" }}>
          {dataWord.definition}
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
          id="reInputWord"
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
              {showDuration && (
                <DurationCircle
                  sx={{
                    zIndex: 98,
                    position: "absolute",
                    right: "5px",
                    top: "20px",
                  }}
                  duration={15}
                  actionTimeout={() => {
                    setOpen(false);
                  }}
                />
              )}
              <Typography variant="h5">{_.capitalizeWord(word)}</Typography>
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
}

export default forwardRef(ReInputWord);