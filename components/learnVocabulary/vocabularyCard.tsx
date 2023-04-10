import { Grid, Paper, Typography } from "@mui/material";
import * as React from "react";
import { Propperties } from "../../models";
import { IWord } from "../../models/word";
import actionCommon from "../common/action/actionCommon";

export interface IVocabularyCardProps {
  detailWord: IWord;
}

export function VocabularyCard(props: IVocabularyCardProps) {
  const { detailWord } = props;
  const {
    word = "",
    pronounce = "",
    definitions = [],
    description,
  } = detailWord;
  const type = description.split(":")[0];
  const meaning = description.split(":")[1];
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
            <Typography variant="h5">
              {actionCommon.capitalizeWord(word)}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body1">/{pronounce}/</Typography>
          </Grid>
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
            <Typography variant="body1">{type}</Typography>
          </Grid>
          <Grid item textAlign={"center"}>
            <Typography variant="body1">{meaning}</Typography>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
