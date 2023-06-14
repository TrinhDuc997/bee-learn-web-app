import { Button, Grid } from "@mui/material";
import { useRouter } from "next/router";
import * as React from "react";
import { wordsAPI } from "@api-client";
import CustomizedProgressBars from "@components/common/loadingComponent/CircularLoading";
import { IVocabularySubjects } from "@interfaces";
import { DashboardLayout } from "@components/dashboard";
import { SubjectItem } from "@components/dashboard/learning/SubjectItem";

export interface IDashboardSubjectsProps {}

export default function DashboardSubjects(props: IDashboardSubjectsProps) {
  const router = useRouter();
  const [dataSubjects, setDataSubject] = React.useState<IVocabularySubjects[]>(
    []
  );
  const [isLoading, setLoading] = React.useState(false);
  const dataFetchedRef = React.useRef(false);
  // const [subjectOpen, setSubjectOpen] = React.useState<IVocabularySubjects>({});
  // const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  // const handleClick = (
  //   event: React.MouseEvent<HTMLElement>,
  //   subject: IVocabularySubjects
  // ) => {
  //   setAnchorEl(event.currentTarget);
  //   setSubjectOpen(subject);
  // };
  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

  React.useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    setLoading(true);
    const fetchDataVocabSubject = async () => {
      const dataVocabularySubjects: IVocabularySubjects[] =
        await wordsAPI.getListVocabularySubjects();
      setDataSubject(dataVocabularySubjects);
      setLoading(false);
    };
    fetchDataVocabSubject().catch(console.error);
  }, []);
  const updateSubjects = async () => {
    const dataVocabularySubjects: IVocabularySubjects[] =
      await wordsAPI.updateVocabularySubjects(dataSubjects);
    console.log(
      "🚀 ~ file: index.tsx:46 ~ updateSubjects ~ dataVocabularySubjects:",
      dataVocabularySubjects
    );
  };
  if (isLoading) return <CustomizedProgressBars />;
  return (
    <Grid container spacing={4}>
      <Grid item sm={12}>
        <Button variant="outlined" onClick={updateSubjects}>
          Update List Subject
        </Button>
      </Grid>
      <Grid
        item
        container
        rowSpacing={4}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        sx={{ pl: "1rem", pr: "1rem", pt: "1rem" }}
      >
        {dataSubjects.map((item) => {
          return <SubjectItem key={item._id} item={item} />;
        })}
      </Grid>
    </Grid>
  );
}

DashboardSubjects.Layout = DashboardLayout;
