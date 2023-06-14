import { Grid, Paper, Typography } from "@mui/material";
import * as React from "react";
import { IWord } from "@interfaces";
import _ from "../../common";

export interface IVocabularyCardProps {
  detailWord: IWord;
}
type PartOfSpeech = "Danh từ" | "Động từ" | "Tính từ" | "Trạng từ";
const partOfSpeechMap: { [key: string]: PartOfSpeech } = {
  n: "Danh từ",
  v: "Động từ",
  adj: "Tính từ",
  adv: "Trạng từ",
};

export function VocabularyCard(props: IVocabularyCardProps) {
  const { detailWord } = props;
  const {
    word = "",
    // definitions = [],
    description = "",
    definition,
    pos = "",
  } = detailWord;
  const pronunciation = _.getIpaPronunciation(word);
  const type = description.split(":")[0];
  // const meaning = description.split(":")[1];
  return (
    <div>
      <Paper
        sx={{
          height: 280,
          width: 240,
          backgroundColor: "#f1f1f1",
        }}
      >
        <Grid
          container
          direction={"column"}
          spacing={2}
          sx={{ alignItems: "center" }}
        >
          <Grid item>
            <Typography variant="h5">{_.capitalizeWord(word)}</Typography>
          </Grid>
          {!!pronunciation && (
            <Grid item>
              <Typography variant="body1">/ {pronunciation} /</Typography>
            </Grid>
          )}
          {/* {definitions?.map((i, index) => {
            const { type, meaning } = i;
            return (
              <React.Fragment key={`${word}-definition-${index}`}>
                <Grid item>
                  <Typography variant="body1">{type}</Typography>
                </Grid>
                <Grid item textAlign={"center"}>
                  <Typography variant="body1">{meaning}</Typography>
                </Grid>
              </React.Fragment>
            );
          })} */}
          <Grid item>
            <Typography variant="body1">
              {partOfSpeechMap[pos] || type}
            </Typography>
          </Grid>
          <Grid item textAlign={"center"}>
            <Typography variant="body1">{definition}</Typography>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
