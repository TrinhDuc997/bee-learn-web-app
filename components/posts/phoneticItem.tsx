import { Box } from "@mui/system";
import InfoIcon from "@mui/icons-material/Info";
import { IPhoneticIPA } from "../../models";
import {
  Button,
  IconButton,
  Paper,
  Popover,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";

export interface PhoneticItemProps {
  // index: number;
  data: IPhoneticIPA;
}
export const PhoneticItem = (props: PhoneticItemProps) => {
  // Handle popup info - START
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log("check btn");
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  // ---- END

  const pronounceIPA = (character: string) => {
    let formatCharacter = character.replaceAll("/", "");
    const soundPH = new Audio(decodeURI(`/soundIPA/${formatCharacter}.mp3`));
    soundPH.play();
  };

  const { data } = props;
  const { exampleWords = [] } = data;
  return (
    <Stack sx={{ mx: "2px" }} spacing={1} direction={"column"}>
      <Paper sx={{ padding: "4px", border: "lightgreen", boxShadow: "none" }}>
        <Stack justifyContent={"space-between"} direction={"row"}>
          <Box color={"GrayText"}>{data.ordinalNumber}</Box>
          <Box>
            {" "}
            <IconButton
              aria-describedby={id}
              sx={{ padding: "0px" }}
              onClick={handleClick}
            >
              <InfoIcon
                sx={{
                  "&:hover": {
                    color: "primary.dark",
                  },
                  color: "primary.main",
                }}
              />
            </IconButton>{" "}
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
            >
              <Typography sx={{ p: 2 }}>{data.pronunciationGuide}</Typography>
            </Popover>
          </Box>
        </Stack>
        <Box textAlign={"center"} className="mid">
          <Button
            onClick={() => pronounceIPA(data.character)}
            sx={{ textTransform: "none" }}
            variant="text"
          >
            <Typography variant="h6" color="black">
              {data.character}
            </Typography>
          </Button>
        </Box>
        <Box textAlign={"center"} className="bot">
          <Typography fontSize={11} fontWeight={800} variant="subtitle1">
            {exampleWords[0].word}: {exampleWords[0].phonetic}
          </Typography>
        </Box>
      </Paper>
    </Stack>
  );
};
