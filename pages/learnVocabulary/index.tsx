import { Box } from "@mui/material";
import * as React from "react";
import { LearnVocabLayouts } from "../../components/layouts";
export interface ILearningVocabularyProps {}

export default function LearningVocabulary(props: ILearningVocabularyProps) {
  return <Box height={"100%"}></Box>;
}
LearningVocabulary.Layout = LearnVocabLayouts;
