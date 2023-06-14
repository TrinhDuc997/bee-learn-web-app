import * as React from "react";
import Box from "@mui/material/Box";
import Slider, { SliderThumb } from "@mui/material/Slider";
import Image from "next/image";

interface ISliderBee {
  min?: number;
  max?: number;
  value?: number;
}
interface ThumbComponentProps extends React.HTMLAttributes<unknown> {}

function ThumbComponent(props: ThumbComponentProps) {
  const { children, ...other } = props;
  return (
    <SliderThumb {...{ ...other }}>
      {children}
      <Image
        width={160}
        height={160}
        layout="intrinsic"
        src="/BeeHoldEarth.png"
      />
    </SliderThumb>
  );
}
export default function SliderBee(props: ISliderBee) {
  const { min = 0, max = 20, value = 0 } = props;
  return (
    <Box sx={{ width: "100%" }}>
      <Slider
        value={value}
        color="secondary"
        disabled
        min={min}
        max={max}
        slots={{ thumb: ThumbComponent }}
        sx={{
          height: "15px",
          "& .MuiSlider-thumb": {
            width: "40px",
            height: "40px",
          },
          "& .MuiSlider-thumb > span": {
            height: "100% !important",
          },
          "&.Mui-disabled": {
            color: "secondary.main",
          },
        }}
      />
    </Box>
  );
}
