import React, { forwardRef, Ref, useImperativeHandle, useState } from "react";
import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { AnimatePresence, motion } from "framer-motion";
import { IWords } from "@interfaces";
import _ from "../common";
import TouchAppOutlinedIcon from "@mui/icons-material/TouchAppOutlined";
import DurationCircle from "@components/common/DurationCircle";
const StyledCard = styled(Card)`
  width: 300px;
  height: 200px;
  cursor: pointer;
  perspective: 1000px;
`;

const Front = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #eeeeee;
`;

const Back = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #eeeeee;
  transform: rotateY(180deg);
`;

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      display: "none",
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
};

interface word {
  pageWord: number;
  direction: number;
  dataWords: IWords;
  paginate?: Function;
  handleNextStep?: Function;
}
export interface IRefFlascard {
  doSomething: () => boolean;
  handleClick: Function;
  setDefaultFlashcard: Function;
}
function Flascard(props: word, ref: Ref<IRefFlascard>) {
  const { pageWord, direction, dataWords, handleNextStep } = props;
  const {
    word = "",
    definition = "",
    pos = "",
    description = "",
    definitions = [],
  } = dataWords[pageWord] || {};
  const [isFlipped, setIsFlipped] = useState(false);

  const type = description.split(":")[0];
  const pronunciation = _.getIpaPronunciation(word);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  type PartOfSpeech = "Danh từ" | "Động từ" | "Tính từ" | "Trạng từ";

  const partOfSpeechMap: { [key: string]: PartOfSpeech } = {
    n: "Danh từ",
    v: "Động từ",
    adj: "Tính từ",
    adv: "Trạng từ",
  };

  const { examples = [], meaning } = definitions.find(
    (i) =>
      i.type?.toUpperCase() === (partOfSpeechMap[pos] || "").toUpperCase() &&
      (i.examples || []).length > 0
  ) || { examples: [{ meaning: "", example: "" }] };
  const { example, meaning: meaningEx } = examples[0];

  useImperativeHandle(ref, () => ({
    doSomething() {
      return isFlipped;
    },
    handleClick,
    setDefaultFlashcard: () => setIsFlipped(false),
  }));

  return (
    <AnimatePresence initial={true} custom={direction}>
      <motion.div
        key={pageWord}
        custom={direction}
        variants={variants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{
          x: {
            type: "spring",
            stiffness: 100,
            damping: 20,
          },
          opacity: { duration: 0.2 },
        }}
        // drag="x"
        // dragConstraints={{ left: 0, right: 0 }}
        // dragElastic={1}
        // onDragEnd={(e, { offset, velocity }) => {
        //   const swipe = swipePower(offset.x, velocity.x);
        //   if (swipe < -swipeConfidenceThreshold) {
        //     paginate(1);
        //   } else if (swipe > swipeConfidenceThreshold) {
        //     paginate(-1);
        //   }
        // }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            borderRadius: "15px",
            position: "relative",
          }}
        >
          <StyledCard
            onClick={handleClick}
            sx={{
              backgroundColor: "unset",
              boxShadow: "none",
              width: "450px",
              height: "300px",
              borderRadius: "10px",
            }}
          >
            <Front
              animate={{ rotateY: isFlipped ? -180 : 0 }}
              transition={{ duration: 0.6 }}
              // drag="x"
              // dragConstraints={{ left: 0, right: 0 }}
              // dragElastic={1}
              // onDragEnd={(e, { offset, velocity }) => {
              //   const swipe = swipePower(offset.x, velocity.x);
              //   if (swipe < -swipeConfidenceThreshold) {
              //     paginate(1);
              //   } else if (swipe > swipeConfidenceThreshold) {
              //     paginate(-1);
              //   }
              // }}
            >
              <CardContent sx={{ width: "100%", height: "100%" }}>
                <Grid
                  container
                  direction={"column"}
                  spacing={2}
                  sx={{ alignItems: "center" }}
                >
                  <Grid item width={"100%"}>
                    {!isFlipped && (
                      <DurationCircle
                        sx={{ zIndex: 98 }}
                        duration={30}
                        actionTimeout={() => {
                          console.log("check actiontimeout");
                          handleClick();
                        }}
                      />
                    )}
                  </Grid>
                  <Grid item>
                    <Typography variant="h5" color={"primary.dark"}>
                      {_.capitalizeWord(word)}
                    </Typography>
                  </Grid>
                  {!!pronunciation && (
                    <Grid item>
                      <Typography variant="body1">
                        / {pronunciation} /
                      </Typography>
                    </Grid>
                  )}
                  <Grid item>
                    <Typography variant="body1">
                      {partOfSpeechMap[pos] || type}
                    </Typography>
                  </Grid>
                  {example && (
                    <Grid item>
                      <Typography variant="body1">EX: {example}</Typography>
                    </Grid>
                  )}
                </Grid>
              </CardContent>
            </Front>
            <Back
              animate={{ rotateY: isFlipped ? 0 : 180 }}
              transition={{ duration: 0.6 }}
              // drag="x"
              // dragConstraints={{ left: 0, right: 0 }}
              // dragElastic={1}
              // onDragEnd={(e, { offset, velocity }) => {
              //   const swipe = swipePower(offset.x, velocity.x);
              //   if (swipe < -swipeConfidenceThreshold) {
              //     paginate(1);
              //   } else if (swipe > swipeConfidenceThreshold) {
              //     paginate(-1);
              //   }
              // }}
            >
              <CardContent sx={{ width: "100%", height: "100%" }}>
                <Grid
                  container
                  direction={"column"}
                  spacing={2}
                  sx={{ alignItems: "center" }}
                >
                  <Grid item width={"100%"}>
                    {isFlipped && (
                      <DurationCircle
                        sx={{ zIndex: 98 }}
                        duration={30}
                        actionTimeout={() => {
                          handleClick();
                          if (!!handleNextStep) {
                            handleNextStep();
                          }
                        }}
                      />
                    )}
                  </Grid>

                  <Grid item>
                    <Typography variant="h5" component="div">
                      {meaning || definition}
                    </Typography>
                  </Grid>
                  {meaningEx && (
                    <Grid item>
                      <Typography variant="body1">VD: {meaningEx}</Typography>
                    </Grid>
                  )}
                </Grid>
              </CardContent>
            </Back>
          </StyledCard>
          <TouchAppOutlinedIcon
            sx={{
              position: "absolute",
              bottom: "-10px",
              right: "-10px",
              rotate: "315deg",
              fontSize: "35px",
              color: "secondary.main",
            }}
          />
        </Box>
      </motion.div>
    </AnimatePresence>
  );
}

export default forwardRef(Flascard);
