import { Grid, Paper, Typography } from "@mui/material";
import * as React from "react";
import { IWord } from "@interfaces";
import _ from "../../common";
import { dataPOSMap } from "utils/dataCommon";

export interface IVocabularyCardProps {
  detailWord: IWord;
}

export function VocabularyCard(props: IVocabularyCardProps) {
  const { detailWord } = props;
  const { word = "", examples = [] } = detailWord;
  const { translation, type = "" } = examples[0] || {};
  const pos = dataPOSMap[type];
  const pronunciation = _.getIpaPronunciation(word);
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
            <Typography variant="body1">{pos}</Typography>
          </Grid>
          <Grid item textAlign={"center"}>
            <Typography variant="body1">{translation}</Typography>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
