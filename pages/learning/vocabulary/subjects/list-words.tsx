import { Button, CircularProgress, Grid } from "@mui/material";
import { useRouter } from "next/router";
import * as React from "react";
import { wordsAPI } from "@api-client";
import CustomizedProgressBars from "@components/common/loadingComponent/CircularLoading";
import BasicPagination from "@components/common/navigate/Pagination";
import { LearnVocabLayouts } from "@components/layouts";
import { VocabularyCard } from "@components/learnVocabulary";
import _ from "@components/common";
// import axios from "axios";
import { IWords } from "@interfaces";
export interface IListWordsProps {}

export default function ListWords(props: IListWordsProps) {
  const router = useRouter();
  console.log("🚀 ~ file: listWords.tsx:17 ~ ListWords ~ router:", router);
  const { query } = router;
  const [dataWords, setDataWords] = React.useState<IWords>([]);
  const [size, setSize] = React.useState(0);
  const [page, setPage] = React.useState(1);
  // const [dataVocabs, setDataVocabs] = React.useState({});
  const [isLoading, setLoading] = React.useState(false);
  const dataFetchedRef = React.useRef(false);
  // const [topics, setTopics] = React.useState<any[]>([]);
  // Read file PDF --- START
  // async function handleFileChange(file: File) {
  //   const { name = "" } = file;
  //   const data = (await _.readFileExcel(file)) || [];
  //   let formatData: any[] = [];
  //   let listTopics: any[] = [];
  //   let type = "";
  //   data.forEach((element: any, index: number) => {
  //     if (index > 0) {
  //       formatData.push({
  //         word: element[1],
  //         type: element[2],
  //         phonetic: element[3],
  //         meaning: element[4],
  //         topics: ["BASIC"],
  //       });
  //     }
  //   });
  //   console.log(
  //     "🚀 ~ file: listWords.tsx:30 ~ handleFileChange ~ data:",
  //     formatData
  //   );
  //   const newData = await wordsAPI.updateListWords(formatData);
  //   console.log(
  //     "🚀 ~ file: listWords.tsx:49 ~ handleFileChange ~ newData:",
  //     newData
  //   );
  // }
  // Read file PDF --- END
  //ComponentDidMount run first times --- start
  React.useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    setLoading(true);
    const fetchDataVocabSubject = async () => {
      const listWords: IWords = await wordsAPI.getListVocabulary({
        limit: 12,
        subject: query.subject || "",
      });
      const sizeCollection: number = await wordsAPI.getSizeCollection({
        subject: query.subject || "",
      });
      setSize(sizeCollection);
      setDataWords(listWords);
      setLoading(false);
    };
    fetchDataVocabSubject().catch(console.error);
  }, []);
  //ComponentDidMount run first times --- end

  // func handle change page to get data --- start
  async function handleChangePage(page: number) {
    setLoading(true);
    const listWords: IWords = await wordsAPI.getListVocabulary({
      limit: 12,
      page: page - 1,
      subject: query.subject || "",
    });
    setDataWords(listWords);
    setPage(page);
    setLoading(false);
  }

  const sizePagination = Math.floor(size / 20);
  if (isLoading) return <CustomizedProgressBars />;
  return (
    <Grid sx={{ flexGrow: 1 }} justifyContent="center" container spacing={2}>
      <Grid item xs={12}>
        <Grid container justifyContent="center" spacing={4}>
          {dataWords.map((value, index) => {
            return (
              <Grid key={index} item>
                <VocabularyCard detailWord={value} />
              </Grid>
            );
          })}
        </Grid>
      </Grid>
      {sizePagination > 0 && (
        <Grid item xs={12}>
          <BasicPagination
            handleChangePage={handleChangePage}
            count={sizePagination}
            page={page}
          />
        </Grid>
      )}
    </Grid>
  );
}

ListWords.Layout = LearnVocabLayouts;
