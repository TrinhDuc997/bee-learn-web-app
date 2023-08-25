import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import {
  IExpandWord,
  INoteBooksContext,
} from "pages/learning/vocabulary/note-book";
import TableNoteBook from "./TableNoteBook";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { NoteBookContext } from "contexts";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchComponent from "@components/common/SearchComponent";
import AddNewVocabulary from "./AddNewVocabulary";
import TagsManagerCpn from "./TagsManagerCpn";
import ImportVocabularyFromExcel from "./ImportVocabularyFromExcel";
import CloseIcon from "@mui/icons-material/Close";

interface IIndicatorColor {
  [key: string]: string;
}

interface INoteBookTab {
  // handleSubmit: Function;
  // quantityItemChanged: number;
  dataWords: IExpandWord[];
  dataWordsLV1: IExpandWord[];
  dataWordsLV2: IExpandWord[];
  dataWordsLV3: IExpandWord[];
  dataWordsLV4: IExpandWord[];
}

enum DialogTypes {
  ADDNEWWORD,
  IMPORTWORDFROMEXCEL,
  ADDTAGS,
}

export default function NoteBookTab(props: INoteBookTab) {
  const [value, setValue] = React.useState("1");
  const {
    // handleSubmit,
    // quantityItemChanged = 0,
    dataWords,
    dataWordsLV1,
    dataWordsLV2,
    dataWordsLV3,
    dataWordsLV4,
  } = props;
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  const { handleFilterListWords, handleSubmitImportVocab } = React.useContext(
    NoteBookContext
  ) as INoteBooksContext;
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

  const indicatorColor: IIndicatorColor = {
    "1": "#ff0030",
    "2": "#ffcc00",
    "3": "#0093ff",
    "4": "#00cfd1",
  };

  // popover - start
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  // popover - end

  // Dialog - start
  const [typeOpenDialog, setTypeOpenDialog] = React.useState("NONE");

  const handleClickOpenDialog = (type: string) => {
    setTypeOpenDialog(type);
  };

  const handleCloseDialog = () => {
    setTypeOpenDialog("NONE");
  };
  // Dialog - end
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
            flexWrap: "nowrap",
          }}
        >
          <Grid item>
            <SearchComponent
              onChange={(e) => {
                handleInputChange(e.target.value);
              }}
            />
          </Grid>
          <Grid>
            <IconButton aria-describedby={id} onClick={handleClick}>
              <MoreVertIcon fontSize="large" color="primary" />
            </IconButton>
            <Menu
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              elevation={2}
              PaperProps={{
                sx: {
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: "15px",
                },
              }}
              MenuListProps={{
                sx: {
                  padding: "0px",
                  "& .MuiMenuItem-root:hover": {
                    backgroundColor: "primary.light",
                  },
                },
              }}
            >
              <MenuItem
                onClick={() => {
                  handleClickOpenDialog("ADDNEWWORD");
                }}
              >
                Thêm từ vựng
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleClickOpenDialog("IMPORTWORDFROMEXCEL");
                }}
              >
                Thêm từ vựng bằng file excel
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleClickOpenDialog("ADDTAGS");
                }}
              >
                Thêm tags
              </MenuItem>
            </Menu>
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
      <Dialog
        open={typeOpenDialog in DialogTypes}
        onClose={handleCloseDialog}
        aria-labelledby="dialog-title"
        PaperProps={{
          sx: {
            borderRadius: "15px",
            height: "80%",
            width: "80%",
            maxWidth: "800px",
            padding: "1rem",
          },
        }}
      >
        <DialogTitle sx={{}} id="customized-dialog-title">
          <IconButton
            aria-label="close"
            onClick={handleCloseDialog}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <Divider sx={{ mb: "8px" }} />
        <DialogContent sx={{ padding: "8px 0px 0px 0px", width: "100%" }}>
          {typeOpenDialog === "ADDNEWWORD" && (
            <AddNewVocabulary dataWords={dataWords} />
          )}
          {typeOpenDialog === "IMPORTWORDFROMEXCEL" && (
            <ImportVocabularyFromExcel
              handleSubmitImportVocab={handleSubmitImportVocab}
              handleCloseDialog={handleCloseDialog}
            />
          )}
          {typeOpenDialog === "ADDTAGS" && <TagsManagerCpn />}
        </DialogContent>
      </Dialog>
    </Box>
  );
}
