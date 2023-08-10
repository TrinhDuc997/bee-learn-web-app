import * as React from "react";
import { LearningLayout } from "@components/layouts";
import { Box, Grid } from "@mui/material";
import NoteBookTab from "@components/learnVocabulary/noteBooks/NoteBookTab";
import { wordsAPI } from "@api-client";
// import { useAuth } from "@hooks";
import { IWord } from "@interfaces";
import { NoteBookContext } from "contexts";
import { useSession } from "next-auth/react";

export interface INoteBooksContext {
  handleChangeListWords?: Function;
  handleFilterListWords?: Function;
  handleSubmit?: Function;
}

export interface INoteBookProps {}
export interface IExpandWord extends IWord {
  levelOfWord?: number;
  idOfWord?: number;
  isChanged?: boolean;
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

  const handleChangeListWords = React.useCallback((params: IExpandWord) => {
    setDataWords((oldListWords: IExpandWord[]) => {
      const newArray = [...oldListWords];
      const index = oldListWords.findIndex(
        (i) => i.idOfWord === params.idOfWord
      );
      newArray[index] = {
        ...newArray[index],
        ...params,
        isChanged: true,
      };
      dataWordsRef.current = newArray;
      return newArray;
    });
  }, []);
  const handleFilterListWords = React.useCallback((filterValue: string) => {
    setFilterDataWords(() => {
      const newArray = dataWordsRef.current.filter((item) => {
        return item.word?.includes(filterValue) && !!filterValue;
      });
      return newArray;
    });
  }, []);

  const handleSubmit = async () => {
    const listItemChanged = dataWords.filter((i) => i.isChanged);
    const dataSubmit = {
      id,
      isLearnNewWord: false,
      wordsLeaned: listItemChanged.map((item) => {
        return {
          ...item,
          ...genDataFollowLevel(item.levelOfWord || 1),
        };
      }),
    };
    const newdata = await wordsAPI.updateWordsUserLearned(dataSubmit);
    const newSession = {
      ...session,
      user: {
        ...session?.user,
        ...newdata,
      },
    };
    await update(newSession);
    setDataWords((oldListWords: IExpandWord[]) => {
      const newArray = [
        ...oldListWords.map((item) => {
          return {
            ...item,
            isChanged: false,
          };
        }),
      ];

      dataWordsRef.current = newArray;
      return newArray;
    });
  };
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
      handleFilterListWords,
    };
  }, []);
  const quantityItemChanged = dataWordsRef.current.filter(
    (i) => i.isChanged
  ).length;
  return (
    <NoteBookContext.Provider value={valueNoteBookContext}>
      <Grid container height={"100%"}>
        <Grid item lg={3} md={1} sm={1} xs={0} height={"100%"}></Grid>
        <Grid item lg={6} md={10} sm={10} xs={12} height={"100%"}>
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
              handleSubmit={handleSubmit}
              quantityItemChanged={quantityItemChanged}
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
      </Grid>
    </NoteBookContext.Provider>
  );
}
NoteBook.Layout = LearningLayout;
