import * as React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Autocomplete,
  Grid,
  TextField,
  TextareaAutosizeProps,
  Typography,
} from "@mui/material";

import Example from "./Example";
import { LoadingButton } from "@mui/lab";
import { IExpandWord } from "pages/learning/vocabulary/note-book";
import { ITag } from "@interfaces";

interface IEditWordsProps {
  wordEdit: IExpandWord;
  user: any;
  setWordEdit: Function;
  handleChangeItems: Function;
  handleCloseEditWord: Function;
  isLoadingGenEx?: boolean;
  isLoadingUpdateWord?: boolean;
}
export const EditWords = (props: IEditWordsProps) => {
  const {
    wordEdit,
    user,
    isLoadingGenEx,
    isLoadingUpdateWord,
    setWordEdit,
    handleChangeItems,
    handleCloseEditWord,
  } = props;
  const tags = user.tags as ITag[];
  const [openAutocomplete, setOpenComplete] = useState(false);
  const { word = "", tags: tagsOfWord } = wordEdit || {};
  const handleChangeWordEdit = (params: IExpandWord) => {
    setWordEdit(params);
  };
  return (
    <Grid
      container
      alignContent={"flex-start"}
      sx={{
        width: "100%",
        height: "100%",
        margin: 0,
        // bgcolor: "background.default",
      }}
    >
      <Grid xs={12} item>
        <Typography variant="h4" fontWeight={"bold"} id="parent-modal-title">
          {word}
        </Typography>
      </Grid>
      <Grid
        item
        container
        xs={12}
        mt={"5px"}
        mb={"10px"}
        justifyContent={"space-between"}
      >
        <Grid item xs={6} pl={"5px"}>
          <Autocomplete
            multiple
            limitTags={2}
            id="multiple-limit-tags"
            options={tags}
            getOptionLabel={(option) => option.title || ""}
            value={tagsOfWord}
            onChange={(event, newValues, reason) => {
              handleChangeWordEdit({
                ...wordEdit,
                tags: newValues,
              });
            }}
            open={openAutocomplete}
            onClose={(event: React.BaseSyntheticEvent, reason) => {
              if (reason === "blur" || event.target.nodeName === "svg") {
                setOpenComplete(false);
              }
            }}
            onOpen={() => {
              setOpenComplete(true);
            }}
            isOptionEqualToValue={(option, value) =>
              option.title === value.title
            }
            filterSelectedOptions
            disableCloseOnSelect
            size="small"
            renderInput={(params) => (
              <TextField {...params} label="Tags" placeholder="Tags" />
            )}
          />
        </Grid>
      </Grid>
      <Example
        dataWord={wordEdit}
        handleChangeWordEdit={handleChangeWordEdit}
      />
      <Grid item xs={12} container justifyContent={"space-around"}>
        <LoadingButton
          loading={isLoadingUpdateWord}
          variant="outlined"
          onClick={() => {
            handleChangeItems(wordEdit);
            handleCloseEditWord();
          }}
        >
          Lưu
        </LoadingButton>
        <LoadingButton
          loading={isLoadingGenEx}
          onClick={() => {}}
          variant="outlined"
        >
          Generate example from AI
        </LoadingButton>
      </Grid>
    </Grid>
  );
};
