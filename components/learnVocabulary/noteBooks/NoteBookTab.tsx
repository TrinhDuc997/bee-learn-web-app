import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { IExpandWord } from "pages/learning/vocabulary/note-book";
import TableNoteBook from "./TableNoteBook";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import { Button, Grid, InputBase } from "@mui/material";
import { NoteBookContext } from "contexts";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "#388e3c",
  border: "1px solid",
  borderColor: "#4caf50",
  borderRadius: "10px",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",

      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

interface INoteBookTab {
  handleSubmit: Function;
  quantityItemChanged: number;
  dataWordsLV1: IExpandWord[];
  dataWordsLV2: IExpandWord[];
  dataWordsLV3: IExpandWord[];
  dataWordsLV4: IExpandWord[];
}
export default function NoteBookTab(props: INoteBookTab) {
  const [value, setValue] = React.useState("1");
  const {
    handleSubmit,
    quantityItemChanged = 0,
    dataWordsLV1,
    dataWordsLV2,
    dataWordsLV3,
    dataWordsLV4,
  } = props;
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  const { handleFilterListWords } = React.useContext(NoteBookContext);
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const handleInputChange = (value: string) => {
    // Clear any previous timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Start a new timeout
    timeoutRef.current = setTimeout(() => {
      if (handleFilterListWords) {
        handleFilterListWords(value);
      }
    }, 1000);
  };

  React.useEffect(() => {
    return () => {
      // Cleanup on unmount or component re-render
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

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
              "&.MuiTabs-root .MuiTabs-flexContainer": {
                justifyContent: "space-between",
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
              label="Cấp 1"
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
              label="Cấp 2"
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
              label="Cấp 3"
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
              label="Cấp 4"
              value="4"
            />
          </TabList>
        </Box>
        <Grid
          container
          sx={{
            height: "60px",
            width: "100%",
            alignItems: "center",
            justifyContent: "space-between",
            pl: "1rem",
            pr: "1rem",
          }}
        >
          <Grid item>
            <Button
              variant="outlined"
              onClick={() => {
                handleSubmit();
              }}
            >
              Lưu thay đổi {`(${quantityItemChanged})`}
            </Button>
          </Grid>
          <Grid item>
            <Search>
              <SearchIconWrapper>
                <SearchIcon color="primary" />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Tìm kiếm..."
                inputProps={{ "aria-label": "Tìm kiếm..." }}
                onChange={(e) => {
                  handleInputChange(e.target.value);
                }}
              />
            </Search>
          </Grid>
        </Grid>
        <TabPanel
          value="1"
          sx={{ height: "calc(100% - 60px)", padding: "8px" }}
        >
          <TableNoteBook listWords={dataWordsLV1} />
        </TabPanel>
        <TabPanel
          value="2"
          sx={{ height: "calc(100% - 60px)", padding: "8px" }}
        >
          <TableNoteBook listWords={dataWordsLV2} />
        </TabPanel>
        <TabPanel
          value="3"
          sx={{ height: "calc(100% - 60px)", padding: "8px" }}
        >
          <TableNoteBook listWords={dataWordsLV3} />
        </TabPanel>
        <TabPanel
          value="4"
          sx={{ height: "calc(100% - 60px)", padding: "8px" }}
        >
          <TableNoteBook listWords={dataWordsLV4} />
        </TabPanel>
      </TabContext>
    </Box>
  );
}
