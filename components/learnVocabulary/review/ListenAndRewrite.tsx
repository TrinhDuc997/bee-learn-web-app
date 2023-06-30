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
import { Box, ButtonBase, Grid, Paper, Typography } from "@mui/material";
import { IWord, partOfSpeechMap } from "@interfaces";
import InformFlashCard from "../InformFlashCard";
import _ from "@components/common";
import DurationCircle from "@components/common/DurationCircle";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import Image from "next/image";
import responsiveVoice from "utils/responsiveVoice";
import { dataPOSMap } from "utils/dataCommon";

interface InputWordProps {
  dataWord: IWord;
}

export interface RefListenAndRewrite {
  getWordReInput: Function;
  handleInputIncorrectReInput: Function;
  setInput: Function;
  openNotice: boolean;
  isReivewCorrectly: boolean;
  setOpenNotice: Function;
}

function ListenAndRewrite(
  props: InputWordProps,
  ref?: Ref<RefListenAndRewrite>
) {
  const { dataWord = {} } = props;
  const { word = "", examples = [] } = dataWord;
  const {
    translation,
    type = "",
    example,
    translateExample,
  } = examples[0] || {};
  const pos = dataPOSMap[type];
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
    const nextInput = document.getElementById(`ListenAndRewrite`);
    nextInput?.focus();
    if (!!word) {
      readWord(word);
    }
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
  function readWord(word: string, rate?: number) {
    if (!!rate) {
      responsiveVoice(word, rate);
    } else {
      responsiveVoice(word);
    }
  }
  return (
    <Grid container direction={"column"} spacing={2}>
      <Grid item container justifyContent={"space-around"}>
        <ButtonBase
          sx={{
            padding: "10px",
            border: "2px solid",
            borderColor: "primary.main",
            borderRadius: "50%",
            width: "55px",
            height: "55px",
          }}
          onClick={() => readWord(word)}
        >
          <VolumeUpIcon fontSize="large" sx={{ color: "#009500" }} />
        </ButtonBase>
        <ButtonBase
          sx={{
            padding: "10px",
            border: "2px solid",
            borderColor: "primary.main",
            borderRadius: "50%",
            width: "55px",
            height: "55px",
          }}
        >
          <Image
            src={"/snail-icon.svg"}
            width={45}
            height={45}
            color="red"
            style={{
              filter:
                "brightness(0) saturate(100%) invert(20%) sepia(100%) saturate(5037%) hue-rotate(98deg) brightness(119%) contrast(103%)",
            }}
            onClick={() => readWord(word, 0.5)}
          />
        </ButtonBase>
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
          id="ListenAndRewrite"
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

export default forwardRef(ListenAndRewrite);
