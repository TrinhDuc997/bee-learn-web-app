import { Autocomplete, Grid, TextField } from "@mui/material";
import * as React from "react";

import { IExampleOfWord } from "@interfaces";
import { dataPOS } from "utils/dataCommon";
import { IExpandWord } from "pages/learning/vocabulary/note-book";

export interface IExamplesListProps {
  dataWord?: IExpandWord;
  handleChangeWordEdit: Function;
}
/**
 * Currently, just showing and update one example with each word.
 */
export default function Example(props: IExamplesListProps) {
  const { dataWord = {}, handleChangeWordEdit } = props;
  const { examples = [] } = dataWord;
  const firstExample = examples[0] || {};
  const { type = "", translation, example, translateExample } = firstExample;
  const pos = dataPOS.find((i) => i.pos === type) || { pos: type, title: type };

  const handleChangeExamplesList = (params: IExampleOfWord) => {
    const newArray = [...examples];
    const index = newArray.findIndex((i) => i._id === params._id);
    newArray[index] = {
      ...newArray[index],
      ...params,
    };
    handleChangeWordEdit({ ...dataWord, examples: newArray });
  };

  return (
    <Grid item container direction={"column"} pl={"5px"}>
      <Grid item container justifyContent={"space-between"}>
        <Grid item xs={4}>
          <Autocomplete
            id="tags-outlined"
            options={dataPOS}
            getOptionLabel={(option) => option.title || ""}
            value={pos}
            onChange={(event, newValue, reason) => {
              handleChangeExamplesList({
                ...firstExample,
                type: newValue?.pos || "",
              });
            }}
            // isOptionEqualToValue={(option, value) =>
            //   option.pos === (value ? value.pos : "")
            // }
            filterSelectedOptions
            disableClearable
            size="small"
            renderInput={(params) => (
              <TextField {...params} label="Type" placeholder="Type" />
            )}
          />
        </Grid>
        <Grid item xs={7}>
          <TextField
            id="outlined-multiline-static"
            label="Translation"
            multiline
            sx={{ width: "100%", pb: "1rem" }}
            size="small"
            defaultValue={translation}
            onBlur={(e) => {
              handleChangeExamplesList({
                ...firstExample,
                translation: e.target.value,
              });
            }}
          />
        </Grid>
      </Grid>
      <Grid item>
        <TextField
          id="outlined-multiline-static"
          label="example"
          multiline
          sx={{ width: "100%", pb: "1rem" }}
          size="small"
          defaultValue={example}
          onBlur={(e) => {
            handleChangeExamplesList({
              ...firstExample,
              example: e.target.value,
            });
          }}
        />
      </Grid>
      <Grid item>
        <TextField
          id="outlined-multiline-static"
          label="Translate Example"
          multiline
          sx={{ width: "100%", pb: "1rem" }}
          size="small"
          defaultValue={translateExample}
          onBlur={(e) => {
            handleChangeExamplesList({
              ...firstExample,
              translateExample: e.target.value,
            });
          }}
        />
      </Grid>
    </Grid>
  );
}
