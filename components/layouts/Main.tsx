import { Box, Container } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import { LayoutProps } from "@interfaces";
import Footer from "../common/footer";
import Header from "../common/header";
import { NextBreadcrumbs } from "../common/NextBreadcrumbs";

export const MainLayout = (props: LayoutProps) => {
  const { children } = props;
  return (
    <Stack minHeight="100vh">
      <Header></Header>
      <Box
        sx={{
          flexGrow: 1,
        }}
        component="main"
      >
        <Container maxWidth="lg">
          <NextBreadcrumbs />
          {children}
        </Container>
      </Box>
      <Footer></Footer>
    </Stack>
  );
};
