import * as React from "react";
import { LearningLayout } from "@components/layouts";
import { Box, Grid } from "@mui/material";
import NoteBookTab from "@components/learnVocabulary/noteBooks/NoteBookTab";
import { wordsAPI } from "@api-client";
import { useAuth } from "@hooks";
import { IWord } from "@interfaces";

export interface INoteBookProps {}
export interface IExpandWord extends IWord {
  levelOfWord?: number;
}
export default function NoteBook(props: INoteBookProps) {
  const { profile = {} } = useAuth();
  const { id } = profile;
  const [dataWords, setDataWords] = React.useState<IExpandWord[]>([]);

  React.useEffect(() => {
    const fetchDataVocabSubject = async () => {
      const listWords: IExpandWord[] = await wordsAPI.getListWordsToReview({
        limit: "UNLIMIT",
      });
      setDataWords(listWords);
    };
    fetchDataVocabSubject().catch(console.error);
    return () => {};
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
  return (
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
            dataWordsLV1={dataWordsLV1}
            dataWordsLV2={dataWordsLV2}
            dataWordsLV3={dataWordsLV3}
            dataWordsLV4={dataWordsLV4}
          />
        </Box>
      </Grid>
      <Grid item lg={3} md={1} sm={1} xs={0} height={"100%"}>
        <Box height={"100%"} width={"100%"}></Box>
      </Grid>
    </Grid>
  );
}
NoteBook.Layout = LearningLayout;
