import React, {
  forwardRef,
  Ref,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import {
  Box,
  ButtonBase,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import { AnimatePresence, motion } from "framer-motion";
import { IWords } from "@interfaces";
import _ from "../common";
import TouchAppOutlinedIcon from "@mui/icons-material/TouchAppOutlined";
import DurationCircle from "@components/common/DurationCircle";
import Image from "next/image";
import responsiveVoice from "utils/responsiveVoice";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import { dataPOSMap } from "utils/dataCommon";

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
  const { word = "", examples = [] } = dataWords[pageWord] || {};
  const {
    translation,
    type = "",
    example,
    translateExample,
  } = examples[0] || {};
  const pos = dataPOSMap[type];
  const [isFlipped, setIsFlipped] = useState(false);

  const pronunciation = _.getIpaPronunciation(word);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };
  useImperativeHandle(ref, () => ({
    doSomething() {
      return isFlipped;
    },
    handleClick,
    setDefaultFlashcard: () => setIsFlipped(false),
  }));
  function readWord(e: any, word: string, rate?: number) {
    e.preventDefault();
    if (!!rate) {
      responsiveVoice(word, rate);
    } else {
      responsiveVoice(word);
    }
  }
  useEffect(() => {
    setTimeout(() => {
      responsiveVoice(word);
    }, 500);
  }, []);
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
            flexDirection: "column",
          }}
        >
          <Box display={"flex"} justifyContent={"center"} mb={"10px"}>
            <ButtonBase
              sx={{
                padding: "10px",
                border: "2px solid",
                borderColor: "primary.main",
                borderRadius: "50%",
                width: "55px",
                height: "55px",
                mr: "20px",
              }}
              onClick={(e) => readWord(e, word)}
            >
              <VolumeUpIcon fontSize="large" sx={{ color: "#009500" }} />
            </ButtonBase>
            <ButtonBase
              sx={{
                padding: "10px",
                border: "2px solid",
                borderColor: "primary.main",
                borderRadius: "50%",
                width: "55px",
                height: "55px",
                ml: "20px",
              }}
            >
              <Image
                src={"/snail-icon.svg"}
                width={45}
                height={45}
                color="red"
                style={{
                  filter:
                    "brightness(0) saturate(100%) invert(20%) sepia(100%) saturate(5037%) hue-rotate(98deg) brightness(119%) contrast(103%)",
                }}
                onClick={(e) => readWord(e, word, 0.5)}
              />
            </ButtonBase>
          </Box>
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
                    <Typography variant="body1">{pos}</Typography>
                  </Grid>

                  <Grid item textAlign={"center"}>
                    <Typography variant="body1">Ex: {example}</Typography>
                    <Typography variant="body2">{translateExample}</Typography>
                  </Grid>
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
                      {translation}
                    </Typography>
                  </Grid>
                  <Grid item textAlign={"center"}>
                    <Typography variant="body1">Ex: {example}</Typography>
                    <Typography variant="body2">{translateExample}</Typography>
                  </Grid>
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
