import {
  Autocomplete,
  Button,
  Divider,
  Grid,
  IconButton,
  Modal,
  Popover,
  TextField,
} from "@mui/material";
import { useRouter } from "next/router";
import * as React from "react";
import { wordsAPI } from "@api-client";
import CustomizedProgressBars from "@components/common/loadingComponent/CircularLoading";
// import { IVocabularyVocabulary } from "@interfaces";
import { DashboardLayout } from "@components/dashboard";
import TableDataVocabulary from "@components/dashboard/learning/TableDataVocabulary";
import { IExampleOfWord, IVocabularySubjects, IWord } from "@interfaces";
import FilterListIcon from "@mui/icons-material/FilterList";
import { DashBoardVocabulryContext } from "contexts";
import { EditWords } from "@components/dashboard/learning/EditWords";
import { generateDataWordFromAI } from "api-client/common-api";
import { LoadingButton } from "@mui/lab";
import DataImporter from "@components/dashboard/learning/DataImportComponent";

export interface IExpandWord extends IWord {
  checked?: boolean;
  isChanged?: boolean;
}

export interface IDashBoardVocabularyContext {
  handleOpenModel?: Function;
  handleChangeListWords?: Function;
  generateDataWords?: Function;
  handleUpdateListWords?: Function;
}

export interface IDashboardVocabularyProps {}

export default function DashboardVocabulary(props: IDashboardVocabularyProps) {
  const [dataSubjects, setDataSubject] = React.useState<IVocabularySubjects[]>(
    []
  );
  const [dataFilterSubjects, setDataFilterSubject] = React.useState<
    IVocabularySubjects[]
  >([]);
  const [selectedSubjects, setSelectedSubjects] = React.useState<
    IVocabularySubjects[]
  >([]);
  const [isLoading, setLoading] = React.useState(false);
  const [isLoadingGenEx, setLoadingGenEx] = React.useState(false);
  const [isLoadingUpdateWord, setLoadingUpdateWord] = React.useState(false);
  const [listWords, setDataWords] = React.useState<IExpandWord[]>([]);
  const listWordsRef = React.useRef(listWords);

  const [course, setCourse] = React.useState("");

  const [inputValue, setInputValue] = React.useState("");
  const [value, setValue] = React.useState("1");
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const changeCourse = (value: string) => {
    localStorage.setItem("dashboardCourse", value);
    setCourse(value);
  };

  const handleClickSelectAll = (isSelectedAll: boolean) => {
    setDataWords((oldListWords) => {
      const newListWords = oldListWords.map((i) => {
        return {
          ...i,
          checked: isSelectedAll,
        };
      });
      return newListWords;
    });
  };
  const handleSelect50Item = (isGenScript?: boolean) => {
    if (isGenScript) {
      let newListWords = [];
      let counter = 0;

      for (let i = 0; i < listWordsRef.current.length; i++) {
        const item = listWordsRef.current[i];
        if ((item.examples?.length || 0) === 0) {
          counter++;
          if (counter <= 50) {
            newListWords.push(item);
          } else {
            break; // Exit the loop once 50 items have been modified
          }
        }
      }
      const prompt = `tạo duy nhất chỉ một ví dụ của từng từ trong mãng JSON sau: "${newListWords.map(
        (i) => i.word
      )}".mỗi từ gồm các field từ loại(ký hiệu ex: n/adj/adv...),nghĩa tiếng việt của từ, nghĩa tiếng việt của ví dụ. hãy để dưới dạng Array Json. ex: [{word:"", type:"", translation:"", example:"", translateExample:""},...]`;

      console.log(prompt);
    } else {
      setDataWords((oldListWords) => {
        const newListWords = [...oldListWords];
        let counter = 0;

        for (let i = 0; i < newListWords.length; i++) {
          const item = newListWords[i];
          if ((item.examples?.length || 0) === 0) {
            counter++;
            if (counter <= 40) {
              newListWords[i] = {
                ...item,
                checked: true,
                isChanged: true,
              };
            } else {
              break; // Exit the loop once 50 items have been modified
            }
          }
        }
        return newListWords;
      });
    }
  };
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  // Handle Model --- START
  const [openModal, setOpenModal] = React.useState(false);
  const [openModalImportJSON, setOpenModalImportJSON] = React.useState(false);
  const [indexWord, setIndexWord] = React.useState(0);
  const handleOpenModel = React.useCallback((idWord: string) => {
    // const index = listWords.findIndex((i) => i._id === idWord);
    const index = listWordsRef.current.findIndex((i) => i._id === idWord);
    setIndexWord(index);
    setOpenModal(true);
  }, []);
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const handleCloseModalImportJSON = () => {
    setOpenModalImportJSON(false);
  };
  // Handle Model --- START

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const getListVocabulary = async (
    dataVocabularySubjects: IVocabularySubjects[]
  ) => {
    setLoading(true);
    const listWords: IExpandWord[] = await wordsAPI.getListVocabulary({
      limit: 10000,
      subjects: dataVocabularySubjects.map((i) => i.title),
    });
    setDataWords(listWords);
    setLoading(false);
  };

  const handleChangeListWords = React.useCallback((params: IExpandWord) => {
    setDataWords((oldListWords: IExpandWord[]) => {
      const newArray = [...oldListWords];
      const index = oldListWords.findIndex((i) => i._id === params._id);
      newArray[index] = {
        ...newArray[index],
        ...params,
        isChanged: true,
      };
      listWordsRef.current = newArray;
      return newArray;
    });
  }, []);

  async function generateDataWord(word: string) {
    const wordInListWords = listWordsRef.current.find((i) => i.word === word);
    const { examples = [] } = wordInListWords || {};

    const prompt = `tạo duy nhất chỉ một ví dụ của từ "${word}".gồm các field từ loại(ký hiệu ex: n/adj/adv...),nghĩa tiếng việt của từ, nghĩa tiếng việt của ví dụ. hãy để dưới dạng Array Json. ex: [{word:"", type:"", translation:"", example:"", translateExample:""}]`;
    setLoadingGenEx(true);
    const dataWord = await generateDataWordFromAI(prompt);
    const { choices } = dataWord;
    const { message } = choices[0];
    const { content = "" } = message || {};
    const convertContent = await JSON.parse(content);
    setLoadingGenEx(false);

    const example = {
      ...convertContent[0],
      _id: (wordInListWords?._id || "") + examples.length + 1,
    };

    handleChangeListWords({
      ...wordInListWords,
      examples: [...examples, example],
    });
  }
  async function generateDataWords() {
    const wordInListWords = listWordsRef.current.filter((i) => i.checked);
    const arrayWordNeedGenEx = wordInListWords?.map((i) => {
      return i.word;
    });
    const prompt = `tạo duy nhất chỉ một ví dụ của từng từ trong mãng JSON sau: "${arrayWordNeedGenEx}".mỗi từ gồm các field từ loại(ký hiệu ex: n/adj/adv...),nghĩa tiếng việt của từ, nghĩa tiếng việt của ví dụ. hãy để dưới dạng Array Json. ex: [{word:"", type:"", translation:"", example:"", translateExample:""},...]`;
    setLoadingGenEx(true);
    const dataWord = await generateDataWordFromAI(prompt);
    const { choices } = dataWord;
    const { message } = choices[0];
    const { content = "" } = message || {};
    const convertContent: IExampleOfWord[] = await JSON.parse(content);
    setLoadingGenEx(false);
    const newListWords = listWordsRef.current.map((item) => {
      const newEx = convertContent.find((subI) => subI.word === item.word);
      if (newEx) {
        return {
          ...item,
          examples: [...(item.examples || []), newEx],
        };
      } else {
        return item;
      }
    });

    setDataWords(newListWords);
  }

  async function importDataExJSON(convertContent: IExampleOfWord[]) {
    const newListWords = listWordsRef.current.map((item) => {
      const newEx = convertContent.find(
        (subI) => subI.word === item.word && (item.examples?.length || 0) === 0
      );
      if (newEx) {
        return {
          ...item,
          checked: true,
          isChanged: true,
          examples: [...(item.examples || []), newEx],
        };
      } else {
        return item;
      }
    });

    setDataWords(newListWords);
  }

  const handleUpdateListWords = async () => {
    const dataUpdate = listWordsRef.current.filter((i) => i.isChanged);
    const formatDataUpdate = dataUpdate.map((item) => {
      const copyItem = { ...item };
      delete copyItem.isChanged;
      delete copyItem.checked;
      const { examples } = copyItem;
      const newItem = {
        ...copyItem,
        examples: examples?.map((i) => {
          return {
            ...i,
            _id: undefined,
          };
        }),
      };
      return newItem;
    });
    setLoadingUpdateWord(true);
    const newData = await wordsAPI.updateListWords(formatDataUpdate);
    setLoadingUpdateWord(false);
    setDataWords((oldListWords) => {
      let newList = oldListWords.map((item) => {
        const { _id } = item;
        const newItem = newData.find((i) => i._id === _id);
        if (newItem) {
          return newItem;
        } else {
          return item;
        }
      });

      return newList;
    });
  };

  React.useEffect(() => {
    if (!course) {
      const defaultCourse = localStorage.getItem("dashboardCourse") || "TOEIC";
      changeCourse(defaultCourse);
    }
    if (listWordsRef.current !== listWords) {
      listWordsRef.current = listWords;
    }
  }, [course, listWords]);

  React.useEffect(() => {
    if (!!course) {
      const fetchDataVocabSubject = async () => {
        const dataVocabularySubjects: IVocabularySubjects[] =
          await wordsAPI.getListVocabularySubjects({ course: "ALL" }); // need to be updated later: when it is got all, only get it once
        const filterCourseSubjects = dataVocabularySubjects.filter((item) => {
          const { tag } = item;
          const checkSelectingSubjects = tag?.includes(course);
          return checkSelectingSubjects;
        });
        const listWords: IExpandWord[] = await wordsAPI.getListVocabulary({
          limit: 10000,
          subjects: filterCourseSubjects.map((i) => i.title),
        });

        setDataSubject(dataVocabularySubjects);
        setDataFilterSubject(filterCourseSubjects);
        setSelectedSubjects([{ title: "All" }]);
        setDataWords(listWords);
        setLoading(false);
      };

      setLoading(true);
      fetchDataVocabSubject().catch(console.error);
    }
  }, [course]);

  const DashBoardVocabularyContext = React.useMemo(() => {
    return {
      handleOpenModel,
      handleChangeListWords,
      generateDataWord,
      handleUpdateListWords,
    };
  }, []);
  const quantitySelectedWords = listWords.filter((i) => i.checked).length;
  return (
    <DashBoardVocabulryContext.Provider value={DashBoardVocabularyContext}>
      <Grid item container height={"100%"} direction="column">
        <Grid
          item
          container
          padding={"5px"}
          overflow={"auto"}
          justifyContent={"space-between"}
        >
          <Grid item>
            <LoadingButton
              loading={isLoadingGenEx}
              sx={{ mr: "5px" }}
              variant="outlined"
              onClick={() => {
                generateDataWords();
              }}
            >
              Generate Ex selected Words {`(${quantitySelectedWords})`}
            </LoadingButton>
            <LoadingButton
              loading={isLoadingUpdateWord}
              sx={{ mr: "5px" }}
              variant="outlined"
              onClick={() => {
                handleUpdateListWords();
              }}
            >
              Save selected Words {`(${quantitySelectedWords})`}
            </LoadingButton>
            <LoadingButton
              loading={isLoadingUpdateWord}
              variant="outlined"
              onClick={() => {
                setOpenModalImportJSON(true);
              }}
            >
              Import data Ex JSON
            </LoadingButton>
          </Grid>
          <Grid>
            <IconButton aria-describedby={id} onClick={handleClick}>
              <FilterListIcon fontSize="medium" color="primary" />
            </IconButton>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
            >
              <Grid
                container
                sx={{ padding: "1rem" }}
                direction={"column"}
                spacing={2}
              >
                <Grid item container flexWrap={"nowrap"}>
                  <Autocomplete
                    value={course}
                    onChange={(event: any, newValue: string | null) => {
                      changeCourse(newValue || "TOEIC");
                    }}
                    inputValue={inputValue}
                    onInputChange={(event, newInputValue) => {
                      setInputValue(newInputValue);
                    }}
                    id="filter-course"
                    options={["TOEIC", "IELTS", "BAISC"]}
                    sx={{ width: 200, mr: "8px" }}
                    size="small"
                    renderInput={(params) => (
                      <TextField {...params} label="Course" />
                    )}
                  />
                  <Autocomplete
                    multiple
                    id="tags-outlined"
                    options={[...dataFilterSubjects, { title: "All" }]}
                    getOptionLabel={(option) => option.title || ""}
                    value={selectedSubjects}
                    onChange={(event, newValues, reason) => {
                      if (newValues.length === 0) {
                        setSelectedSubjects([{ title: "All" }]);
                        getListVocabulary(dataFilterSubjects);
                      } else {
                        setSelectedSubjects(
                          newValues.filter((i) => i.title !== "All")
                        );
                      }
                    }}
                    onClose={(values, reason) => {
                      if (reason === "blur" || reason === "removeOption") {
                        if (selectedSubjects[0].title === "All") {
                        } else {
                          getListVocabulary(selectedSubjects);
                        }
                      }
                    }}
                    isOptionEqualToValue={(option, value) =>
                      option.title === value.title
                    }
                    readOnly={isLoading}
                    disabled={isLoading}
                    filterSelectedOptions
                    disableCloseOnSelect
                    sx={{ width: 300, mr: "8px" }}
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
                <Grid item container flexWrap={"nowrap"}>
                  <Button
                    variant="outlined"
                    sx={{ mr: "5px" }}
                    onClick={() => {
                      handleSelect50Item();
                    }}
                  >
                    Choose 40 words without Ex
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      handleSelect50Item(true);
                    }}
                  >
                    Generate script get Ex
                  </Button>
                </Grid>
              </Grid>
            </Popover>
          </Grid>
        </Grid>
        <Divider />
        <Grid
          item
          paddingTop={"5px"}
          width={"100%"}
          height={"calc(100% - 60px)"}
        >
          {isLoading ? (
            <CustomizedProgressBars />
          ) : (
            <TableDataVocabulary
              listWords={listWords}
              handleClickSelectAll={handleClickSelectAll}
            />
          )}
        </Grid>
        <Modal
          open={openModal}
          onClose={handleCloseModal}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
        >
          <Grid
            container
            alignItems={"center"}
            justifyContent={"space-around"}
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "50%",
              height: "70%",
              boxShadow: 24,
              borderRadius: "15px",
              overflow: "hidden",
              bgcolor: "background.default",
            }}
          >
            <EditWords
              listWords={listWords}
              dataSubjects={dataSubjects}
              indexWord={indexWord}
              isLoadingGenEx={isLoadingGenEx}
              isLoadingUpdateWord={isLoadingUpdateWord}
            />
          </Grid>
        </Modal>
        <Modal
          open={openModalImportJSON}
          onClose={handleCloseModalImportJSON}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
        >
          <Grid
            container
            alignItems={"center"}
            justifyContent={"space-around"}
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "50%",
              height: "70%",
              boxShadow: 24,
              borderRadius: "15px",
              overflow: "hidden",
              bgcolor: "background.default",
            }}
          >
            <DataImporter
              onImport={(importedData) => {
                importDataExJSON(importedData);
              }}
            />
          </Grid>
        </Modal>
      </Grid>
    </DashBoardVocabulryContext.Provider>
  );
}

DashboardVocabulary.Layout = DashboardLayout;
