import { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { Box, Grid, Typography } from "@mui/material";
import { IWord } from "@interfaces";

interface InputWordProps {
  dataWord: IWord;
}

export default function ReInputWord(props: InputWordProps) {
  const { dataWord = {} } = props;
  const { word = "" } = dataWord;
  const [input, setInput] = useState<string>("");

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  useEffect(() => {
    const nextInput = document.getElementById(`reInputWord`);
    nextInput?.focus();
  }, []);
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
          color="primary"
          sx={{
            marginLeft: "4px",
            marginRight: "4px",
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
        />
      </Grid>
    </Grid>
  );
}
