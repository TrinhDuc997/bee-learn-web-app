import { LayoutProps } from "@interfaces";
import { Box, Popper, Slide } from "@mui/material";
import * as React from "react";

export interface IInformFlashCardProps extends LayoutProps {
  open: boolean;
  locateRefElement: any;
}

export default function InformFlashCard(props: IInformFlashCardProps) {
  const { open, locateRefElement, children } = props;
  return (
    <Popper
      open={open}
      anchorEl={locateRefElement.current}
      placement="bottom"
      sx={{
        paddingTop: "30px",
        width: { xs: "80%", sm: "60%", md: "45%" },
        animationName: "shake",
        animationDuration: "0.5s",
        animationTimingFunction: "ease-in-out",
        animationIterationCount: "1",
        animationDelay: "0.4s",
      }}
      transition
    >
      {({ TransitionProps }) => (
        <Slide direction="up" {...TransitionProps} timeout={350}>
          <Box>{children}</Box>
        </Slide>
      )}
    </Popper>
  );
}
