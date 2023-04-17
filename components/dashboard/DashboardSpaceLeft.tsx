import {
  Collapse,
  Divider,
  Grid,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
} from "@mui/material";
import React from "react";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import ArticleIcon from "@mui/icons-material/Article";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import SubjectIcon from "@mui/icons-material/Subject";
import QuizIcon from "@mui/icons-material/Quiz";
import AbcIcon from "@mui/icons-material/Abc";
import { useRouter } from "next/router";
import { styled } from "@mui/material/styles";

const CustomizedListItemIcon = styled(ListItemIcon)`
  min-width: 40px;
  color: currentColor;
`;

function DashboardSpaceLeft() {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };
  const router = useRouter();
  const pathnameSelected = router.pathname.split("/").pop();
  return (
    <Grid
      sx={{ backgroundColor: "background.second", borderRadius: "10px" }}
      height={"100%"}
      container
      direction={"column"}
    >
      <Grid
        item
        sx={{
          pl: "1rem",
          pt: "1rem",
          height: "90px",
          width: "100%",
        }}
      >
        <img style={{ width: "160px", height: "50px" }} src="/Logo.png" />
      </Grid>
      <Divider sx={{ width: "80%", margin: "auto" }} />
      <Grid item height={"calc(100% - 110px)"}>
        <List sx={{ ml: "1rem", mr: "1rem", borderRadius: "10px" }}>
          <ListItemButton
            sx={{
              color: pathnameSelected === "learning" ? "secondary.main" : "",
            }}
            onClick={handleClick}
          >
            <CustomizedListItemIcon>
              <LocalLibraryIcon />
            </CustomizedListItemIcon>
            <ListItemText primary="Learning" />
          </ListItemButton>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton
                sx={{
                  pl: 4,
                  color:
                    pathnameSelected === "vocabulary" ? "secondary.main" : "",
                }}
              >
                <CustomizedListItemIcon>
                  <AbcIcon />
                </CustomizedListItemIcon>
                <ListItemText primary="Vocabulary" />
              </ListItemButton>
              <ListItemButton
                sx={{
                  pl: 4,
                  color:
                    pathnameSelected === "subjects" ? "secondary.main" : "",
                }}
                onClick={() => {
                  router.push({
                    pathname: router.asPath + "/learning/subjects",
                    query: {},
                  });
                }}
                selected={pathnameSelected === "subjects"}
              >
                <CustomizedListItemIcon>
                  <SubjectIcon />
                </CustomizedListItemIcon>
                <ListItemText primary="Subject" />
              </ListItemButton>
              <ListItemButton
                sx={{
                  pl: 4,
                  color: pathnameSelected === "examing" ? "secondary.main" : "",
                }}
              >
                <CustomizedListItemIcon>
                  <QuizIcon />
                </CustomizedListItemIcon>
                <ListItemText primary="Examing" />
              </ListItemButton>
            </List>
          </Collapse>
          <ListItemButton
            sx={{
              color: pathnameSelected === "posts" ? "secondary.main" : "",
            }}
          >
            <CustomizedListItemIcon>
              <ArticleIcon />
            </CustomizedListItemIcon>
            <ListItemText primary="Posts" />
          </ListItemButton>
          <ListItemButton
            sx={{
              color:
                pathnameSelected === "account-manager" ? "secondary.main" : "",
            }}
          >
            <CustomizedListItemIcon>
              <ManageAccountsIcon />
            </CustomizedListItemIcon>
            <ListItemText primary="Account Manager" />
          </ListItemButton>
        </List>
      </Grid>
    </Grid>
  );
}

export default DashboardSpaceLeft;
