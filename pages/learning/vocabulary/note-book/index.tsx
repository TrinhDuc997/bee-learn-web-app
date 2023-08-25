import * as React from "react";
import { LearningLayout } from "@components/layouts";
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
} from "@mui/material";
import NoteBookTab from "@components/learnVocabulary/noteBooks/NoteBookTab";
import { wordsAPI } from "@api-client";
// import { useAuth } from "@hooks";
import { ITag, IWord } from "@interfaces";
import { NoteBookContext } from "contexts";
import { useSession } from "next-auth/react";
import CloseIcon from "@mui/icons-material/Close";
import { EditWords } from "@components/learnVocabulary/noteBooks/EditWords";

export interface INoteBooksContext {
  handleChangeListWords: Function;
  handleChangeItems: Function;
  handleFilterListWords: Function;
  // handleSubmit: Function;
  handleSubmitImportVocab: Function;
  handleOpenEditWord: Function;
  tags?: ITag[];
}

export interface INoteBookProps {}
export interface IExpandWord extends IWord {
  levelOfWord?: number;
  idOfWord?: number;
  isChanged?: boolean;
  tags?: ITag[];
}
const genDataFollowLevel = (level: number) => {
  let numberOfReview = 4,
    numberOfReviewCorrect = 0; // Default is Level 1.
  if (level === 2) {
    numberOfReview = 4;
    numberOfReviewCorrect = 1;
  } else if (level === 3) {
    numberOfReview = 4;
    numberOfReviewCorrect = 2;
  } else if (level === 4) {
    numberOfReview = 4;
    numberOfReviewCorrect = 3;
  }
  return {
    numberOfReview,
    numberOfReviewCorrect,
  };
};
export default function NoteBook(props: INoteBookProps) {
  const { data: session, update } = useSession();
  const { user } = session || {};
  const { id = "" } = user || {};
  const [dataWords, setDataWords] = React.useState<IExpandWord[]>([]);
  const [filterDataWords, setFilterDataWords] = React.useState<IExpandWord[]>(
    []
  );
  const dataWordsRef = React.useRef(dataWords);

  // Handle Dialog --- START
  const [wordEdit, setWordEdit] = React.useState<IExpandWord | null>(null);
  const handleCloseEditWord = () => {
    setWordEdit(null);
  };
  const handleOpenEditWord = (params: IExpandWord) => {
    setWordEdit(params);
  };
  // Handle Dialog --- END

  const handleChangeListWords = React.useCallback((params: IExpandWord) => {
    setDataWords((oldListWords: IExpandWord[]) => {
      const newArray = [...oldListWords];
      const index = oldListWords.findIndex((i) => i._id === params._id);
      newArray[index] = {
        ...newArray[index],
        ...params,
      };
      dataWordsRef.current = newArray;
      return newArray;
    });
  }, []);
  const handleChangeItems = React.useCallback(
    async (params: IExpandWord) => {
      const index = dataWordsRef.current.findIndex(
        (i) => i.idOfWord === params.idOfWord
      );
      const { tags = [] } = params;
      const changedItem = {
        ...dataWordsRef.current[index],
        ...params,
        tagIds: tags.map((i) => i._id),
      };
      const dataSubmit = {
        id,
        isReturnWordLearned: true,
        wordsLearned: [
          {
            ...changedItem,
            ...genDataFollowLevel(changedItem.levelOfWord || 1),
          },
        ],
      };
      const newdata = await wordsAPI.updateWordsUserLearned(dataSubmit);
      const { hierarchicalArrayOfWords } = newdata;
      if (!!newdata) {
        setDataWords((oldListWords: IExpandWord[]) => {
          const newArray = [
            ...oldListWords.map((item) => {
              if (item.idOfWord === params.idOfWord) {
                return {
                  ...item,
                  ...params,
                };
              } else {
                return item;
              }
            }),
          ];
          dataWordsRef.current = newArray;
          return newArray;
        });
        if (filterDataWords.length > 0) {
          // updating data of items when filtering
          setFilterDataWords((oldListWords: IExpandWord[]) => {
            const newArray = [
              ...oldListWords.map((item) => {
                if (item.idOfWord === params.idOfWord) {
                  return {
                    ...item,
                    ...params,
                  };
                } else {
                  return item;
                }
              }),
            ];
            return newArray;
          });
        }
      }

      // update data session
      const newSession = {
        ...session,
        user: {
          ...session?.user,
          hierarchicalArrayOfWords,
        },
      };
      await update(newSession);
    },
    [id]
  );

  const handleFilterListWords = React.useCallback((filterValue: string) => {
    setFilterDataWords(() => {
      const newArray = dataWordsRef.current.filter((item) => {
        return item.word?.includes(filterValue) && !!filterValue;
      });
      return newArray;
    });
  }, []);

  const handleSubmitImportVocab = React.useCallback(
    async (dataImport: IExpandWord[]) => {
      const dataSubmit = {
        id,
        wordsLearned: dataImport.map((item) => {
          return {
            ...item,
            ...genDataFollowLevel(item.levelOfWord || 1),
          };
        }),
      };
      const newdata = await wordsAPI.importWordsUserLearned(dataSubmit);
      const { hierarchicalArrayOfWords = [], wordsLearned } = newdata;
      const newSession = {
        ...session,
        user: {
          ...session?.user,
          hierarchicalArrayOfWords,
        },
      };
      await update(newSession);
      setDataWords((oldListWords: IExpandWord[]) => {
        let dataMatched = oldListWords;
        wordsLearned.forEach((item) => {
          const checkExisted = oldListWords.find((i) => i.word === item.word);
          if (!checkExisted) {
            dataMatched = [item, ...dataMatched];
          }
        });
        dataWordsRef.current = dataMatched;
        return dataMatched;
      });
    },
    [id]
  );

  React.useEffect(() => {
    const fetchDataVocabSubject = async () => {
      const listWords: IExpandWord[] = await wordsAPI.getListWordsToReview({
        limit: "UNLIMIT",
      });
      dataWordsRef.current = listWords;
      setDataWords(listWords);
    };
    fetchDataVocabSubject().catch(console.error);
    return () => {
      fetchDataVocabSubject().catch(console.error);
    };
  }, []);
  let dataWordsLV1: IExpandWord[] = [],
    dataWordsLV2: IExpandWord[] = [],
    dataWordsLV3: IExpandWord[] = [],
    dataWordsLV4: IExpandWord[] = [];
  dataWords.forEach((item) => {
    if (item.levelOfWord === 1) {
      dataWordsLV1.push(item);
    } else if (item.levelOfWord === 2) {
      dataWordsLV2.push(item);
    } else if (item.levelOfWord === 3) {
      dataWordsLV3.push(item);
    } else if (item.levelOfWord === 4) {
      dataWordsLV4.push(item);
    }
  });
  const valueNoteBookContext = React.useMemo(() => {
    return {
      handleChangeListWords,
      handleChangeItems,
      handleFilterListWords,
      handleSubmitImportVocab,
      handleOpenEditWord,
    };
  }, [user]);
  // const quantityItemChanged = dataWordsRef.current.filter(
  //   (i) => i.isChanged
  // ).length;
  return (
    <NoteBookContext.Provider value={valueNoteBookContext}>
      <Grid container height={"100%"}>
        <Grid item lg={3} md={1} sm={1} xs={0} height={"100%"}></Grid>
        <Grid item lg={6} md={10} sm={10} xs={12} height={"100%"} pt={"8px"}>
          <Box
            sx={{
              boxShadow: "0px 30px 20px 20px #f0f0f0",
              pl: "0px",
              pr: "0px",
              overflow: "auto",
            }}
            height={"100%"}
          >
            <NoteBookTab
              // handleSubmit={handleSubmit}
              // quantityItemChanged={quantityItemChanged}
              dataWords={dataWords}
              dataWordsLV1={
                filterDataWords.length > 0 ? filterDataWords : dataWordsLV1
              }
              dataWordsLV2={
                filterDataWords.length > 0 ? filterDataWords : dataWordsLV2
              }
              dataWordsLV3={
                filterDataWords.length > 0 ? filterDataWords : dataWordsLV3
              }
              dataWordsLV4={
                filterDataWords.length > 0 ? filterDataWords : dataWordsLV4
              }
            />
          </Box>
        </Grid>
        <Grid item lg={3} md={1} sm={1} xs={0} height={"100%"}>
          <Box height={"100%"} width={"100%"}></Box>
        </Grid>
        <Dialog
          open={!!wordEdit}
          onClose={handleCloseEditWord}
          aria-labelledby="dialog-title"
          PaperProps={{
            sx: {
              borderRadius: "15px",
              height: "80%",
              width: "80%",
              maxWidth: "800px",
              padding: "1rem",
            },
          }}
        >
          <DialogTitle sx={{}} id="customized-dialog-title">
            <IconButton
              aria-label="close"
              onClick={handleCloseEditWord}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <Divider />
          <DialogContent sx={{ padding: "8px", width: "100%" }}>
            {!!wordEdit && (
              <EditWords
                wordEdit={wordEdit}
                user={user}
                setWordEdit={setWordEdit}
                handleChangeItems={handleChangeItems}
                handleCloseEditWord={handleCloseEditWord}
              />
            )}
          </DialogContent>
        </Dialog>
      </Grid>
    </NoteBookContext.Provider>
  );
}
NoteBook.Layout = LearningLayout;
