import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import * as React from "react";
import { theme } from "@utils";

export function BannerTitle(props: { title: string }) {
  const { title } = props;
  return (
    <Box width={"100%"}>
      <Box width={"90%"} display={"flex"} margin={"auto"} marginBottom={"2px"}>
        <Box
          sx={{
            height: "3px",
            width: "40%",
            background: theme.palette.secondary.gradient,
          }}
        ></Box>
        <Box width={"20%"}></Box>
        <Box
          sx={{
            height: "3px",
            width: "40%",
            background: theme.palette.secondary.gradient,
          }}
        ></Box>
      </Box>
      <Box
        width={"100%"}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          background: theme.palette.secondary.gradient,
        }}
      >
        <Box
          width={"20%"}
          className="triangle-right"
          sx={{
            width: 0,
            height: 0,
            borderTop: "25px solid transparent",
            borderLeft: "50px solid #fff",
            borderBottom: "25px solid transparent",
          }}
        ></Box>
        <Box
          width={"60%"}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h5">{title}</Typography>
        </Box>
        <Box
          width={"20%"}
          className="triangle-left"
          sx={{
            width: 0,
            height: 0,
            borderTop: "25px solid transparent",
            borderRight: "50px solid #fff",
            borderBottom: "25px solid transparent",
          }}
        ></Box>
      </Box>
      <Box
        width={"90%"}
        sx={{
          height: "3px",
          background: theme.palette.secondary.gradient,
          margin: "auto",
          marginTop: "2px",
        }}
      ></Box>
    </Box>
  );
}
