import { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { Box, Grid, Typography } from "@mui/material";
import { IWord } from "@interfaces";

interface InputWordProps {
  dataWord: IWord;
}

export default function SpellWordV2(props: InputWordProps) {
  const { dataWord = {} } = props;
  const { word = "" } = dataWord;
  const [inputs, setInputs] = useState<string[]>(Array(word.length).fill(""));

  useEffect(() => {
    const nextInput = document.getElementById(`input-${0}`);
    nextInput?.focus();
  }, []);
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
      const nextInput = document.getElementById(`input-${nextIndex}`);
      nextInput?.focus();

      setInputs(newInputs);
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
      const nextInput = document.getElementById(`input-${index - 1}`);
      nextInput?.focus();
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const enteredWord = inputs.join("");
    if (enteredWord === word) {
      alert("Correct!");
    } else {
      alert("Incorrect!");
    }
  };

  return (
    <Grid container direction={"column"}>
      <Grid item>
        <Typography variant="h5" color={"primary.main"} sx={{ margin: "1rem" }}>
          {dataWord.definition}
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
          }}
        >
          <form onSubmit={handleSubmit}>
            {Array.from(word).map((letter, index) => (
              <TextField
                key={`${letter + index}`}
                inputProps={{
                  style: {
                    textAlign: "center",
                  },
                }}
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
                id={`input-${index}`}
              />
            ))}
            {/* <button type="submit">Submit</button> */}
          </form>
        </Box>
      </Grid>
    </Grid>
  );
}
