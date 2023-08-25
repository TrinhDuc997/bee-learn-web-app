import SearchComponent from "@components/common/SearchComponent";
import { ITag } from "@interfaces";
import { Autocomplete, Box, Chip, Grid, TextField } from "@mui/material";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { IExpandWord } from "pages/learning/vocabulary/note-book";

interface IAddNewVocabular {
  dataWords: IExpandWord[];
}

function AddNewVocabulary(props: IAddNewVocabular) {
  const { dataWords } = props;
  const { data: session, update } = useSession();
  const { user } = session || {};
  const { tags = [] } = user || {};
  const cloneTags = tags.map((item) => {
    return {
      ...item,
    };
  });
  const tagDefault = cloneTags[0] || null;
  const [tag, setTag] = useState<ITag | null>(tagDefault);
  const filterDataWords = dataWords;
  return (
    <Grid container height={"100%"}>
      <Grid container item alignItems={"center"}>
        <Autocomplete
          id="listTags"
          size="small"
          value={tag}
          sx={{
            width: 250,
            mr: "1rem",
            "& .MuiOutlinedInput-root": {
              borderRadius: "10px",
            },
          }}
          options={cloneTags}
          getOptionLabel={(option) => option.title || ""}
          isOptionEqualToValue={(option, value) => option.title === value.title}
          filterSelectedOptions
          onChange={(event, value) => {
            setTag(value);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              color="primary"
              label="Thêm từ mới vào danh sách"
            />
          )}
        />
        <Autocomplete
          id="findingWords"
          size="small"
          freeSolo
          filterSelectedOptions
          disableClearable
          value={undefined}
          sx={{
            width: 250,
            mr: "1rem",
            "& .MuiOutlinedInput-root": {
              borderRadius: "10px",
            },
          }}
          options={[]}
          getOptionLabel={(option) => option || ""}
          isOptionEqualToValue={(option, value) => option === value}
          onChange={(event, value) => {}}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Tìm kiếm"
              InputProps={{
                ...params.InputProps,
                type: "search",
              }}
              color="primary"
            />
          )}
        />
        {/* <SearchComponent onChange={() => {}} /> */}
      </Grid>
      <Grid item container height={"90%"}>
        <Box
          padding={"1rem"}
          borderRadius={"15px"}
          border={"1px solid"}
          borderColor={"divider"}
          width={"100%"}
          minHeight={"100px"}
          height={"100%"}
          overflow={"auto"}
          sx={{
            "&::-webkit-scrollbar": {
              width: "8px",
              background: "fixed",
            },
            "&::-webkit-scrollbar-thumb": {
              width: "8px",
              borderRadius: "10px",
              background: "#bbb",
            },
          }}
        >
          {filterDataWords.map((item) => {
            return (
              <Chip
                key={item.idOfWord}
                label={item.word}
                variant="outlined"
                color="primary"
                sx={{ margin: "5px", fontWeight: "bold" }}
              />
            );
          })}
        </Box>
      </Grid>
    </Grid>
  );
}

export default AddNewVocabulary;
