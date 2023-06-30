import {
  ChangeEvent,
  KeyboardEvent,
  Ref,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import TextField from "@mui/material/TextField";
import { Box, Grid, Paper, Popper, Slide, Typography } from "@mui/material";
import { IWord, partOfSpeechMap } from "@interfaces";
import { useRef } from "react";
import _ from "@components/common";
import InformFlashCard from "../InformFlashCard";
import DurationCircle from "@components/common/DurationCircle";
import responsiveVoice from "utils/responsiveVoice";
import { dataPOSMap } from "utils/dataCommon";

interface InputWordProps {
  dataWord: IWord;
  showDuration?: boolean;
}

export interface IRefSpellWordV2 {
  getInputSpellWordV2: Function;
  handleInputIncorrect: Function;
  setInputs: Function;
}
function SpellWordV2(props: InputWordProps, ref: Ref<IRefSpellWordV2>) {
  const { dataWord = {}, showDuration = true } = props;
  const { word = "", examples = [] } = dataWord;
  const {
    translation,
    type = "",
    example,
    translateExample,
  } = examples[0] || {};
  const pos = dataPOSMap[type];
  const [inputs, setInputs] = useState<string[]>(Array(word.length).fill(""));
  const pronunciation = _.getIpaPronunciation(word || "");

  const [open, setOpen] = useState(false);
  const divRef = useRef(null);

  useEffect(() => {
    const nextInput = document.getElementById(`reInput-${0}`);
    nextInput?.focus();
    setInputs(Array(word.length).fill(""));
  }, [word]);
  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const e = event.nativeEvent as InputEvent;
    // console.log("🚀 ~ file: SpellWordV2.tsx:21 ~ SpellWordV2 ~ event:", event);
    const value = e.data;
    const nextIndex =
      index === inputs.length - 1 ? inputs.length - 1 : index + 1;
    if (!!value) {
      const newInputs = [...inputs];
      newInputs[index] = value.toUpperCase();
      const nextInput = document.getElementById(`reInput-${nextIndex}`);
      nextInput?.focus();

      setInputs(newInputs);
      // if (open) {
      //   // in case the user input is incorrect and when input again then the hide notifications
      //   setOpen(false);
      // }
    }
  };
  const handleKeyDownInput = (
    event: KeyboardEvent<HTMLDivElement>,
    index: number,
    preValue: string // The requirement is when the press double deleteContentBackward, turn back pre element
  ) => {
    if (event.code === "Backspace" && !!preValue) {
      const newInputs = [...inputs];
      newInputs[index] = "";
      setInputs(newInputs);
    } else if (event.code === "Backspace" && preValue === "") {
      const nextInput = document.getElementById(`reInput-${index - 1}`);
      nextInput?.focus();
    } else if (event.code === "ArrowUp" || event.code === "ArrowRight") {
      const nextInput = document.getElementById(`reInput-${index + 1}`);
      nextInput?.focus();
    } else if (event.code === "ArrowLeft" || event.code === "ArrowDown") {
      const nextInput = document.getElementById(`reInput-${index - 1}`);
      nextInput?.focus();
    }
  };

  const handleInputIncorrect = (isInCorrect: boolean) => {
    if (isInCorrect) {
      responsiveVoice(dataWord.word || "");
    }
    setOpen(isInCorrect);
  };

  useImperativeHandle(ref, () => ({
    getInputSpellWordV2: () => {
      return inputs.join("");
    },
    handleInputIncorrect,
    setInputs,
  }));
  return (
    <Grid container direction={"column"}>
      <Grid item>
        <Typography variant="h5" color={"primary.main"} sx={{ margin: "1rem" }}>
          {translation}
        </Typography>
      </Grid>

      <Grid item>
        <Box
          sx={{
            display: "inline-block",
            padding: "5px",
            border: "2px solid",
            borderColor: "primary.main",
            borderRadius: "10px",
            position: "relative",
          }}
          ref={divRef}
        >
          <form>
            {Array.from(word).map((letter, index) => (
              <TextField
                key={`${letter + index}`}
                inputProps={{
                  style: {
                    textAlign: "center",
                  },
                }}
                autoComplete="off"
                color="primary"
                sx={{
                  width: "1.5em",
                  marginLeft: "4px",
                  marginRight: "4px",
                }}
                value={inputs[index]}
                variant="standard"
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  handleInputChange(event, index);
                }}
                onKeyUp={(event) => {
                  handleKeyDownInput(event, index, inputs[index]);
                }}
                id={`reInput-${index}`}
              />
            ))}
          </form>
          <InformFlashCard open={open} locateRefElement={divRef}>
            <Paper
              sx={{
                backgroundColor:
                  inputs.join("").toUpperCase() === word?.toUpperCase()
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
                  <Typography variant="body1">Ex: {example}</Typography>
                  <Typography variant="body2">{translateExample}</Typography>
                </Grid>
              </Grid>
            </Paper>
          </InformFlashCard>
        </Box>
      </Grid>
    </Grid>
  );
}

export default forwardRef(SpellWordV2);
