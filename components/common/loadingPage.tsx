import { Box } from "@mui/material";
import Image from "next/image";
import * as React from "react";

export default function Loading() {
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100%",
        bgcolor: "white",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box>
        <Image
          layout="intrinsic"
          height={400}
          width={400}
          priority={true}
          src={"/loadingBee.gif"}
        />
      </Box>
    </Box>
  );
}
