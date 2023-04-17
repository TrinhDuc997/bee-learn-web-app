import { IVocabularySubjects } from "@interfaces";
import {
  Box,
  Button,
  ButtonBase,
  Grid,
  Menu,
  MenuItem,
  Modal,
  Paper,
  TextField,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import { generateText } from "api-client/common-api";
import { useRouter } from "next/router";
import * as React from "react";

export interface ISubjectItemProps {
  item: IVocabularySubjects;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid",
  borderColor: "divider",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};

export function SubjectItem(props: ISubjectItemProps) {
  const { item } = props;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [openModel, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleCloseModel = () => setOpen(false);
  const [description, setDescription] = React.useState("");
  const [createdPic, setCreatedPic] = React.useState<any>({});

  const createPicture = async (description: string) => {
    const res = await generateText(description);
    setCreatedPic(res.data.data[0]);
  };
  return (
    <Grid key={item.title} item xs={4} marginBottom={"2rem"}>
      <Paper
        sx={{
          background: "#f3f3f3",
          width: "100%",
          // boxShadow: "-3px 5px 1px -1px rgb(0 0 0 / 20%)",
          borderRadius: "15px",
        }}
      >
        <Grid container spacing={3}>
          <Grid
            item
            sx={{
              width: 128,
              height: 128,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              pt: "10px !important",
            }}
          >
            <ButtonBase
              style={{
                objectFit: "cover",
                borderRadius: "50%",
              }}
              onClick={(e) => {
                handleClick(e);
              }}
            >
              <img
                src={item.src}
                alt="english-vocab2"
                width={90}
                height={90}
                style={{
                  objectFit: "cover",
                  borderRadius: "50%",
                  border: "5px solid #fbc02d",
                }}
              />
            </ButtonBase>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem
                onClick={() => {
                  handleClose();
                  handleOpen();
                }}
              >
                Create picture
              </MenuItem>
              <MenuItem>Import file</MenuItem>
            </Menu>
          </Grid>
          <Grid item xs={12} sm container sx={{ textAlign: "left" }}>
            <Grid item container direction={"column"}>
              <Grid item>
                <Typography variant="h5" sx={{ color: "primary.dark" }}>
                  {item.title}
                </Typography>
                <Typography variant="body1" pl={"1rem"}>
                  {item.subTitle}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
      <Modal
        open={openModel}
        onClose={handleCloseModel}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Grid container direction={"column"} spacing={2}>
            <Grid item>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                {item.title}
              </Typography>
            </Grid>
            <Grid item>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                {item.subTitle}
              </Typography>
            </Grid>
            <Grid
              item
              container
              direction={"row"}
              alignItems={"center"}
              spacing={2}
            >
              <Grid item>
                <img
                  src={createdPic.url || ""}
                  alt="english-vocab2"
                  style={{
                    objectFit: "cover",
                    border: "1px solid #fbc02d",
                    maxWidth: "90px",
                    minHeight: "90px",
                  }}
                />
              </Grid>
              <Grid item sm container justifyContent={"center"}>
                <TextField
                  id="outlined-multiline-static"
                  label="Thêm mô tả để tạo ảnh"
                  multiline
                  rows={3}
                  maxRows={10}
                  sx={{ width: "100%", pb: "1rem" }}
                  size="small"
                  InputProps={{ inputComponent: TextareaAutosize }}
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />
                <Button
                  variant="outlined"
                  onClick={() => createPicture(description)}
                >
                  Create Picure
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </Grid>
  );
}
