import {
  Autocomplete,
  Button,
  Collapse,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import * as React from "react";
import { Add, Remove } from "@mui/icons-material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { DashBoardVocabulryContext } from "contexts";
import {
  IDashBoardVocabularyContext,
  IExpandWord,
} from "pages/dashboard/learning/vocabulary";
import { IExampleOfWord } from "@interfaces";
import { POS, dataPOS } from "utils/dataCommon";
export interface IExamplesListProps {
  dataWord?: IExpandWord;
}

export default function ExamplesList(props: IExamplesListProps) {
  const { dataWord = {} } = props;
  const { examples = [] } = dataWord;
  const [openCollape, setOpenCollape] = React.useState(true);

  const { handleChangeListWords } = React.useContext(
    DashBoardVocabulryContext
  ) as IDashBoardVocabularyContext;
  const handleChangeExamplesList = (params: IExampleOfWord) => {
    const newArray = [...examples];
    const index = newArray.findIndex((i) => i._id === params._id);
    newArray[index] = {
      ...newArray[index],
      ...params,
    };
    if (handleChangeListWords) {
      handleChangeListWords({ ...dataWord, examples: newArray });
    }
  };
  const handleAddExample = () => {
    if (handleChangeListWords) {
      handleChangeListWords({
        ...dataWord,
        examples: [
          ...examples,
          { _id: (dataWord._id || "") + examples.length, type: "n" },
        ],
      });
    }
  };
  const handleRemoveExample = (id: string) => {
    const newArray = examples.filter((i) => i._id !== id);
    if (handleChangeListWords) {
      handleChangeListWords({
        ...dataWord,
        examples: newArray,
      });
    }
  };

  return (
    <>
      <Grid item pb={"8px"}>
        <Button
          sx={{ width: "100%", justifyContent: "flex-start" }}
          variant="outlined"
          onClick={() => {
            setOpenCollape(!openCollape);
          }}
        >
          {" "}
          Examples{openCollape ? <Remove /> : <Add />}
        </Button>
      </Grid>
      <Grid item>
        <Collapse
          in={openCollape}
          timeout="auto"
          unmountOnExit
          sx={{ pl: "1rem" }}
        >
          {examples?.map((item, index) => {
            const { type = "", translation, example, translateExample } = item;
            const pos = dataPOS.find((i) => i.pos === type);
            return (
              <Grid key={item._id} item container direction={"column"}>
                <Grid item pb={"5px"} container alignItems={"center"}>
                  <Typography variant="subtitle1" color={"primary"}>
                    Example {index + 1}
                  </Typography>
                  <IconButton
                    color="primary"
                    onClick={() => {
                      handleRemoveExample(item._id || "");
                    }}
                  >
                    <HighlightOffIcon />
                  </IconButton>
                </Grid>
                <Grid item container justifyContent={"space-between"}>
                  <Grid item xs={4}>
                    <Autocomplete
                      id="tags-outlined"
                      options={dataPOS}
                      getOptionLabel={(option) => option.title || ""}
                      value={pos}
                      onChange={(event, newValue, reason) => {
                        handleChangeExamplesList({
                          ...item,
                          type: newValue?.pos || "",
                        });
                      }}
                      isOptionEqualToValue={(option, value) =>
                        option.pos === (value ? value.pos : "")
                      }
                      filterSelectedOptions
                      disableClearable
                      size="small"
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Type"
                          placeholder="Type"
                        />
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
                          ...item,
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
                        ...item,
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
                        ...item,
                        translateExample: e.target.value,
                      });
                    }}
                  />
                </Grid>
              </Grid>
            );
          })}
        </Collapse>
      </Grid>
      <Grid item mb={"8px"} sx={{ textAlign: "center" }}>
        <Button
          variant="outlined"
          onClick={() => {
            handleAddExample();
          }}
        >
          Add Example
        </Button>
      </Grid>
    </>
  );
}
