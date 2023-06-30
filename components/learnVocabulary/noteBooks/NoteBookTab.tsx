import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { IExpandWord } from "pages/learning/vocabulary/note-book";
import TableNoteBook from "./TableNoteBook";

interface INoteBookTab {
  dataWordsLV1: IExpandWord[];
  dataWordsLV2: IExpandWord[];
  dataWordsLV3: IExpandWord[];
  dataWordsLV4: IExpandWord[];
}
export default function NoteBookTab(props: INoteBookTab) {
  const [value, setValue] = React.useState("1");
  const { dataWordsLV1, dataWordsLV2, dataWordsLV3, dataWordsLV4 } = props;
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  const indicatorColor: { [key: string]: string } = {
    "1": "#ff0030",
    "2": "#ffcc00",
    "3": "#0093ff",
    "4": "#00cfd1",
  };
  return (
    <Box
      sx={{ width: "100%", typography: "body1", height: "calc(100% - 50px)" }}
    >
      <TabContext value={value}>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
          }}
        >
          <TabList
            onChange={handleChange}
            className="test"
            sx={{
              "&.MuiTabs-root .MuiTabs-indicator": {
                background: indicatorColor[value],
              },
            }}
          >
            <Tab
              sx={{
                width: "24%",
                fontWeight: "bold",
                backgroundColor: "#ff003030",
                borderTopLeftRadius: "10px",
                borderTopRightRadius: "10px",
                "&.Mui-selected": {
                  color: "#ff0030",
                },
              }}
              label="Level 1"
              value="1"
            />
            <Tab
              sx={{
                width: "24%",
                backgroundColor: "#ffcc0030",
                borderTopLeftRadius: "10px",
                borderTopRightRadius: "10px",
                "&.Mui-selected": {
                  color: "#ffcc00",
                },
                fontWeight: "bold",
              }}
              label="Level 2"
              value="2"
            />
            <Tab
              sx={{
                width: "24%",
                backgroundColor: "#0093ff30",
                borderTopLeftRadius: "10px",
                borderTopRightRadius: "10px",
                "&.Mui-selected": {
                  color: "#0093ff",
                },
                fontWeight: "bold",
              }}
              label="Level 3"
              value="3"
            />
            <Tab
              sx={{
                width: "24%",
                backgroundColor: "#00cfd130",
                borderTopLeftRadius: "10px",
                borderTopRightRadius: "10px",
                "&.Mui-selected": {
                  color: "#00cfd1",
                },
                fontWeight: "bold",
              }}
              label="Level 4"
              value="4"
            />
          </TabList>
        </Box>
        <TabPanel value="1" sx={{ height: "100%" }}>
          <TableNoteBook listWords={dataWordsLV1} />
        </TabPanel>
        <TabPanel value="2" sx={{ height: "100%" }}>
          <TableNoteBook listWords={dataWordsLV2} />
        </TabPanel>
        <TabPanel value="3" sx={{ height: "100%" }}>
          <TableNoteBook listWords={dataWordsLV3} />
        </TabPanel>
        <TabPanel value="4" sx={{ height: "100%" }}>
          <TableNoteBook listWords={dataWordsLV4} />
        </TabPanel>
      </TabContext>
    </Box>
  );
}
