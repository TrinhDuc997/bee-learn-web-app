import { Container, Grid } from "@mui/material";
import { Box } from "@mui/system";
import { HeroSectionMobile } from "@components/home/HeroSectionMobile";
import { ListPostsSection } from "@components/home/ListPostsSection";
import { MainLayout } from "@components/layouts";
import { NextPageWithLayout } from "@interfaces";
import { HeroSection } from "@components/home";
import { useEffect } from "react";
// const soundPH = new Audio("/soundIPA/∫.mp3");

export interface IHomePageProps {
  listPosts: Array<any>;
}

const Home: NextPageWithLayout<IHomePageProps> = (props: IHomePageProps) => {
  const { listPosts = [1, 2, 3, 4] } = props;
  return (
    <Box>
      <HeroSection />
      <HeroSectionMobile />
      {/* <ListPostsSection data={listPosts} /> */}
    </Box>
  );
};
Home.Layout = MainLayout;

export async function getServerSideProps() {
  return {
    props: {
      listPosts: [1, 2, 3, 4, 5],
    },
  };
}

export default Home;
