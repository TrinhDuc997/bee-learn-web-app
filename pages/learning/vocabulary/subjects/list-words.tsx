import { Box, Button, CircularProgress, Grid } from "@mui/material";
import { useRouter } from "next/router";
import * as React from "react";
import { wordsAPI } from "@api-client";
import CustomizedProgressBars from "@components/common/loadingComponent/CircularLoading";
import BasicPagination from "@components/common/navigate/Pagination";
import { LearningLayout } from "@components/layouts";
import { VocabularyCard } from "@components/learnVocabulary";
import _ from "@components/common";
// import axios from "axios";
import { IWords } from "@interfaces";
export interface IListWordsProps {}

export default function ListWords(props: IListWordsProps) {
  const router = useRouter();
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
        limit: 20,
        subject: query.subject || "",
        page: query.numberPack, // với trường hợp khóa học là từ vựng cơ bản thì sẽ giới hạn mỗi pack sẽ là 20 từ và gửi số pack lên để lấy dữ liệu
      });
      if (query.subject !== "BASIC") {
        const sizeCollection: number = await wordsAPI.getSizeCollection({
          subject: query.subject || "",
        });
        setSize(sizeCollection);
      }

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
      limit: 20,
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
    <Grid container>
      <Grid item xs={3}></Grid>
      <Grid item xs={6}>
        <Box
          sx={{
            boxShadow: "0px 30px 20px 20px #f0f0f0",
            pl: "0px",
            pr: "0px",
            overflow: "auto",
          }}
          height={"100vh"}
          paddingTop={"100px"}
          paddingBottom={"100px"}
        >
          <Grid
            sx={{ flexGrow: 1 }}
            justifyContent="center"
            container
            spacing={2}
          >
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
            {sizePagination > 1 && (
              <Grid item xs={12}>
                <BasicPagination
                  handleChangePage={handleChangePage}
                  count={sizePagination}
                  page={page}
                />
              </Grid>
            )}
          </Grid>
        </Box>
      </Grid>
      <Grid item xs={3}>
        <Box height={"100%"} width={"100%"}></Box>
      </Grid>
    </Grid>
  );
}

ListWords.Layout = LearningLayout;
