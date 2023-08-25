import actionCommon from "@components/common";
import { ITag, IWord } from "@interfaces";
import { LoadingButton } from "@mui/lab";
import {
  Autocomplete,
  Button,
  Grid,
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
} from "@mui/material";
import { useSession } from "next-auth/react";
import React, { useState } from "react";

interface IImportVocabularyFromExcel {
  handleSubmitImportVocab: Function;
  handleCloseDialog: Function;
}

function ImportVocabularyFromExcel(props: IImportVocabularyFromExcel) {
  const { handleSubmitImportVocab, handleCloseDialog } = props;
  const { data: session } = useSession();
  const { user } = session || {};
  const { tags = [] } = user || {};
  const cloneTags = tags.map((item) => {
    return {
      ...item,
    };
  });
  const tagDefault = cloneTags[0] || null;
  const [tag, setTag] = useState<ITag | null>(tagDefault);
  const [listVocabulary, setListVocabulary] = useState<IWord[]>([]);
  const [page, setPage] = React.useState(0);
  const [isLoading, setLoading] = React.useState(false);
  const rowsPerPage = 50;
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const uploadFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!!e.target.files?.length) {
      const file = e.target.files[0];
      const data = (await actionCommon.readFileExcel(file)) || ([] as any[]);
      let newListVocab: IWord[] = [];
      data.forEach((item, index) => {
        if (!!item[2] && index > 0) {
          const newWord = {
            word: item[1],
            pos: item[2],
            definition: item[3],
            tagIds: [tag?._id],
            examples: [
              {
                word: item[1],
                type: item[2],
                translation: item[3],
                example: item[4],
                translateExample: item[5],
              },
            ],
          };
          newListVocab = [...newListVocab, newWord];
        }
      });
      setListVocabulary(newListVocab);
    }
  };
  const handleSubmit = async () => {
    setLoading(true);
    await handleSubmitImportVocab(listVocabulary);
    setLoading(false);
    handleCloseDialog();
  };
  return (
    <Grid container height={"100%"} width={"100%"}>
      <Grid
        container
        item
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Link href="/template-import-vocabulary.xlsx">
          Tải xuống template import vocabulary
        </Link>
        <Button variant="outlined" component="label">
          Tải lên file
          <input
            type="file"
            hidden
            onChange={(e) => {
              uploadFile(e);
            }}
          />
        </Button>
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
      </Grid>
      <Grid item height={"calc(100% - 90px)"} width={"100%"}>
        <TableContainer
          sx={{
            height: "calc(100% - 55px)",
            width: "100%",
            overflow: "hidden",
            borderTopLeftRadius: "15px",
            borderTopRightRadius: "15px",
            border: "1px solid",
            borderColor: "#ccc",
          }}
        >
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell
                  align={"center"}
                  style={{ minWidth: 100 }}
                  sx={{
                    fontWeight: "bold",
                  }}
                >
                  Từ*
                </TableCell>
                <TableCell
                  align={"center"}
                  style={{ minWidth: 90 }}
                  sx={{
                    fontWeight: "bold",
                  }}
                >
                  Loại
                </TableCell>
                <TableCell
                  align={"center"}
                  style={{ minWidth: 140 }}
                  sx={{
                    fontWeight: "bold",
                  }}
                >
                  Nghĩa
                </TableCell>
                <TableCell
                  style={{ minWidth: 150 }}
                  sx={{
                    fontWeight: "bold",
                  }}
                >
                  Ví dụ
                </TableCell>
                <TableCell
                  style={{ minWidth: 150 }}
                  sx={{
                    fontWeight: "bold",
                  }}
                >
                  Nghĩa ví dụ
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {listVocabulary.map((item) => {
                const { examples = [] } = item;
                const { example, translateExample } = examples[0] || {};
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={item.word}>
                    <TableCell align={"center"}>{item.word}</TableCell>
                    <TableCell align={"center"}>{item.pos}</TableCell>
                    <TableCell align={"center"}>{item.definition}</TableCell>
                    <TableCell>{example}</TableCell>
                    <TableCell>{translateExample}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[rowsPerPage]}
          component="div"
          count={listVocabulary.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          sx={{
            height: "55px",
            borderBottom: "1px solid",
            borderLeft: "1px solid",
            borderRight: "1px solid",
            borderColor: "#ccc",
            borderBottomLeftRadius: "15px",
            borderBottomRightRadius: "15px",
          }}
        />
      </Grid>
      <Grid item width={"100%"} textAlign={"end"}>
        <LoadingButton
          disabled={listVocabulary.length === 0}
          loading={isLoading}
          variant="outlined"
          onClick={() => {
            handleSubmit();
          }}
        >
          Lưu
        </LoadingButton>
      </Grid>
    </Grid>
  );
}

export default ImportVocabularyFromExcel;
