import { Container } from "@mui/material";
import { Box } from "@mui/system";
import * as React from "react";
import { MainLayout } from "../../components/layouts";
import InfoIcon from "@mui/icons-material/Info";

export interface PhoneticChartIPAProps {}

export interface PhoneticItemProps {
  index: number;
  urlSoundIPA: string;
  nameIconSoundIPA: string;
  exampleWord: string[];
  pronunciationGuide: string;
}

const ItemPhonetic = (props: PhoneticItemProps) => {
  const { index, urlSoundIPA } = props;
  return (
    <Box>
      <Box className="top">
        <Box>{index}</Box>
        <Box>
          {" "}
          <InfoIcon />{" "}
        </Box>
      </Box>
      <Box className="mid"></Box>
      <Box className="bot"></Box>
    </Box>
  );
};

export default function PhoneticChartIPA(props: PhoneticChartIPAProps) {
  return (
    <Box>
      Phonetic Chart IPA
      <Container></Container>
    </Box>
  );
}

PhoneticChartIPA.Layout = MainLayout;
