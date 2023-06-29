import * as React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Autocomplete,
  Box,
  Button,
  Collapse,
  Grid,
  TextField,
  TextareaAutosize,
  TextareaAutosizeProps,
  Typography,
} from "@mui/material";
import { IExpandWord } from "pages/dashboard/learning/vocabulary";
import { DashBoardVocabulryContext } from "contexts";
import { POS, dataPOS } from "utils/dataCommon";
import { IVocabularySubjects } from "@interfaces";
import ExamplesList from "./ExamplesList";
import { LoadingButton } from "@mui/lab";

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      display: "none",
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
};
const styleButtonPreNext = {
  height: "100%",
  width: "7%",
  position: "absolute",
  display: "flex",
  alignItems: "center",
  color: "background.default",
  justifyContent: "center",
  fontSize: "70px",
  cursor: "pointer",
  userSelect: "none",
  "&:hover": {
    background: "linear-gradient(to left,#999999, #fafafa)",
    color: "primary.dark",
  },
};

const textareaProps: TextareaAutosizeProps = {};

/**
 * Experimenting with distilling swipe offset and velocity into a single variable, so the
 * less distance a user has swiped, the more velocity they need to register as a swipe.
 * Should accomodate longer swipes and short flicks without having binary checks on
 * just distance thresholds and velocity > 0.
 */
interface IEditWordsProps {
  listWords: IExpandWord[];
  indexWord: number;
  dataSubjects: IVocabularySubjects[];
  isLoadingGenEx?: boolean;
  isLoadingUpdateWord?: boolean;
}
export const EditWords = (props: IEditWordsProps) => {
  const {
    listWords,
    indexWord = 0,
    dataSubjects,
    isLoadingGenEx,
    isLoadingUpdateWord,
  } = props;
  const [[page, direction], setPage] = useState([indexWord, indexWord]);
  const [openAutocomplete, setOpenComplete] = useState(false);

  console.log("🚀 ~ file: EditWords.tsx:68 ~ EditWords ~ page:", page);
  const { handleChangeListWords, generateDataWords, handleUpdateListWords } =
    React.useContext(DashBoardVocabulryContext);

  const paginate = (newDirection: number) => {
    if (page === 0 && newDirection === -1) {
      // => go to last word of listWords
      setPage([listWords.length - 1, newDirection]);
    } else if (page === listWords.length - 1 && newDirection === 1) {
      // go to fist word of listWords
      setPage([0, newDirection]);
    } else {
      setPage([page + newDirection, newDirection]);
    }
  };

  const {
    word = "",
    definition = "",
    description = "",
    pos,
    topics,
    examples = [],
  } = listWords[page] || {};
  console.log(
    "🚀 ~ file: EditWords.tsx:90 ~ EditWords ~ listWords[page]:",
    listWords[page]
  );
  const convertTopics =
    topics?.map((i) => {
      return i.split(" - ")[0];
    }) || [];
  const convertPOS: POS[] =
    pos?.split(",").map((item: string) => {
      const convertData = dataPOS.find((i) => i.pos === item.trim());
      if (convertData) {
        return convertData;
      } else {
        return {
          pos: item,
          title: item,
        };
      }
    }) || [];
  const eventListenerKeydown = (event: KeyboardEvent) => {
    const target = event.target as Element;
    if (event.key === "ArrowRight" && target.nodeName !== "TEXTAREA") {
      const btnRight = document.getElementById("arrowRight");
      if (!!btnRight) {
        btnRight.click();
      }
    } else if (event.key === "ArrowLeft" && target.nodeName !== "TEXTAREA") {
      const btnLeft = document.getElementById("arrowLeft");
      if (!!btnLeft) {
        btnLeft.click();
      }
    }
  };

  // React.useEffect(() => {
  //   setPage([indexWord, 0]);
  // }, [indexWord]);

  React.useEffect(() => {
    addEventListener("keydown", eventListenerKeydown);
    return () => {
      removeEventListener("keydown", eventListenerKeydown);
    };
  }, []);
  return (
    <>
      <Grid
        item
        sx={{
          ...styleButtonPreNext,
          transform: "scale(-1)",
          left: "-1px",
        }}
        id="arrowLeft"
        onClick={() => paginate(-1)}
      >
        {"‣"}
      </Grid>
      <Grid
        item
        sx={{
          width: "85%",
          height: "100%",
          overflow: "auto",
          // "&::-webkit-scrollbar": {
          //   position: "sticky",
          //   right: "-10px",
          //   zIndex: 99,
          // },
          // "&::-webkit-scrollbar-thumb": {
          //   position: "sticky",
          //   right: "-10px",
          //   zIndex: 99,
          // },
        }}
      >
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={page}
            custom={listWords}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
          >
            <Grid
              container
              direction={"column"}
              sx={{
                width: "100%",
                height: "100%",
                margin: 0,
                // bgcolor: "background.default",
              }}
            >
              <Grid item>
                <h2 id="parent-modal-title">{word}</h2>
              </Grid>
              <Grid item>
                <TextField
                  id="outlined-multiline-static"
                  label="Vietnamese"
                  multiline
                  sx={{ width: "100%", pb: "1rem" }}
                  size="small"
                  // InputProps={{ inputComponent: TextareaAutosize }}
                  defaultValue={definition}
                  onBlur={(e) => {
                    if (handleChangeListWords) {
                      handleChangeListWords({
                        ...listWords[page],
                        definition: e.target.value,
                      });
                    }
                  }}
                />
              </Grid>
              <Grid item>
                <TextField
                  id="outlined-multiline-static"
                  label="Description"
                  multiline
                  sx={{ width: "100%", pb: "1rem" }}
                  size="small"
                  defaultValue={description}
                  onBlur={(e) => {
                    if (handleChangeListWords) {
                      handleChangeListWords({
                        ...listWords[page],
                        description: e.target.value,
                      });
                    }
                  }}
                />
              </Grid>
              <Grid
                item
                container
                xs={12}
                mt={"5px"}
                mb={"10px"}
                justifyContent={"space-between"}
              >
                <Grid item xs={6} pr={"5px"}>
                  <Autocomplete
                    multiple
                    id="tags-outlined"
                    options={dataPOS}
                    getOptionLabel={(option) => option.title || ""}
                    value={convertPOS}
                    onChange={(event, newValues, reason) => {
                      if (handleChangeListWords) {
                        const newPOS = newValues.map((i) => i.pos);
                        handleChangeListWords({
                          ...listWords[page],
                          pos: newPOS.join(", "),
                        });
                      }
                    }}
                    // onClose={(values, reason) => {
                    //   if (reason === "blur" || reason === "removeOption") {

                    //   }
                    // }}
                    isOptionEqualToValue={(option, value) =>
                      option.pos === value.pos
                    }
                    filterSelectedOptions
                    disableCloseOnSelect
                    size="small"
                    renderInput={(params) => (
                      <TextField {...params} label="POS" placeholder="POS" />
                    )}
                  />
                </Grid>
                <Grid item xs={6} pl={"5px"}>
                  <Autocomplete
                    multiple
                    limitTags={2}
                    id="multiple-limit-tags"
                    options={[...dataSubjects.map((i) => i.title), "BASIC"]}
                    getOptionLabel={(option) => option || ""}
                    value={convertTopics}
                    onChange={(event, newValues, reason) => {
                      if (handleChangeListWords) {
                        handleChangeListWords({
                          ...listWords[page],
                          topics: newValues,
                        });
                      }
                    }}
                    open={openAutocomplete}
                    onClose={(event: React.BaseSyntheticEvent, reason) => {
                      if (
                        reason === "blur" ||
                        event.target.nodeName === "svg"
                      ) {
                        setOpenComplete(false);
                      }
                    }}
                    onOpen={() => {
                      setOpenComplete(true);
                    }}
                    isOptionEqualToValue={(option, value) => option === value}
                    filterSelectedOptions
                    disableCloseOnSelect
                    size="small"
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Subjects"
                        placeholder="Subjects"
                      />
                    )}
                  />
                </Grid>
              </Grid>
              <ExamplesList dataWord={listWords[page]} />
              <Grid
                item
                container
                justifyContent={"space-around"}
                sx={{
                  pb: "1rem",
                  // textAlign: "center",
                  // bottom: "1px",
                  // width: "85%",
                  // bgcolor: "background.default",
                  // zIndex: "9",
                }}
              >
                <LoadingButton
                  loading={isLoadingGenEx}
                  onClick={() => {
                    if (generateDataWords) {
                      const { word = "abandon" } = listWords[page];
                      generateDataWords(word);
                    }
                  }}
                  variant="outlined"
                >
                  Generate example from AI
                </LoadingButton>
                <LoadingButton
                  loading={isLoadingUpdateWord}
                  variant="outlined"
                  onClick={() => {
                    if (handleUpdateListWords) {
                      handleUpdateListWords();
                    }
                  }}
                >
                  Save
                </LoadingButton>
              </Grid>
            </Grid>
          </motion.div>
        </AnimatePresence>
      </Grid>

      <Grid
        sx={{
          ...styleButtonPreNext,
          right: "-1px",
        }}
        id="arrowRight"
        onClick={() => paginate(1)}
      >
        {"‣"}
      </Grid>
    </>
  );
};
