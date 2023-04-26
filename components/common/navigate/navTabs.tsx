import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { SxProps } from "@mui/material";
import { Theme } from "@mui/system";
import { green } from "@mui/material/colors";
import { useRouter } from "next/router";

enum HrefTab {
  "/learning/vocabulary/review",
  "/learning/vocabulary/subjects",
  "/learning/vocabulary/note-book",
}

interface LinkTabProps {
  label?: string;
  href?: string;
  sx?: SxProps<Theme>;
}

function LinkTab(props: LinkTabProps) {
  return (
    <Tab
      component="a"
      onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

function getDefaultTabHighlight(href: string) {
  let defaultTabHighlight = 0;
  if (href.search(HrefTab[1]) > -1) {
    defaultTabHighlight = 1;
  } else if (href.search(HrefTab[2]) > -1) {
    defaultTabHighlight = 2;
  }
  return defaultTabHighlight;
}

export default function NavTabs() {
  const router = useRouter();

  const [tabHighlight, setTabhighlightTab] = React.useState(
    getDefaultTabHighlight(router.pathname)
  );
  const handleChange = (event: React.SyntheticEvent, tabHighlight: number) => {
    setTabhighlightTab(tabHighlight);
    router.push(HrefTab[tabHighlight]);
  };
  const widthLinkTab = 100 / 3;
  return (
    <Box width={"100%"} sx={{ mb: "1px" }}>
      <Tabs
        value={tabHighlight}
        onChange={handleChange}
        sx={{
          width: "100%",
          justifyContent: "space-evenly",
          "& .Mui-selected": {
            color: green[800],
            backgroundColor: green[100],
          },
        }}
      >
        <LinkTab
          sx={{
            width: `${widthLinkTab}%`,
            maxWidth: "none",
          }}
          label="Ôn Tập"
          href="/index"
        />
        <LinkTab
          sx={{ width: `${widthLinkTab}%`, maxWidth: "none" }}
          label="Học Từ Mới"
          href="/learnNewWords"
        />
        <LinkTab
          sx={{ width: `${widthLinkTab}%`, maxWidth: "none" }}
          label="Sổ Tay"
          href="/noteBook"
        />
      </Tabs>
    </Box>
  );
}
