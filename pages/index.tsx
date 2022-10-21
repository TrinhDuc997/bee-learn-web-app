import { Box } from "@mui/system";
import { MainLayout } from "../components/layouts";
import { NextPageWithLayout } from "../models";
// const soundPH = new Audio("/soundIPA/∫.mp3");
const Home: NextPageWithLayout = () => {
  const playSound = () => {
    // soundPH.play();
  };
  return <Box>Home Page</Box>;
};
Home.Layout = MainLayout;

export default Home;
