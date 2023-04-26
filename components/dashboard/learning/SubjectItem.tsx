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
import Image from "next/image";
import LoadingButton from "@mui/lab/LoadingButton";
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
  const [description, setDescription] = React.useState(item.title);
  const [createdPic, setCreatedPic] = React.useState<any>({});
  const filename = item.title?.replaceAll(" ", "") + ".png";
  const [imageUrl, setImageUrl] = React.useState(
    `/VocabSubjectsPic/${filename}?timestamp=${Date.now()}`
  );
  const [loadingCreatePic, setLoadingCreatePic] = React.useState(false);
  const [loadingSavePic, setLoadingSavePic] = React.useState(false);

  const createPicture = async (description: string) => {
    setLoadingCreatePic(true);
    const res = await generateText(description);
    setCreatedPic(res.data.data[0]);
    setLoadingCreatePic(false);
  };

  // Handle Save Picture import func --- START
  const inputFileRef = React.useRef<HTMLInputElement>(null);

  function handleButtonClick() {
    inputFileRef.current?.click();
  }

  async function handleFileChange(event: any) {
    const file = await event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      handleSubmit(reader.result);
    };
    reader.readAsDataURL(file);
  }
  async function handleSubmit(file: string | ArrayBuffer | null) {
    const filename = item.title?.replaceAll(" ", "") + ".png";
    const response = await fetch("/api/import-subject-picture", {
      method: "POST",
      body: JSON.stringify({ file, filename }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setImageUrl(`/VocabSubjectsPic/${filename}?timestamp=${Date.now()}`);
  }

  async function handleSubmitPicCreated(url: string) {
    const filename = item.title?.replaceAll(" ", "") + ".png";
    setLoadingSavePic(true);
    const response = await fetch("/api/download-image-and-import", {
      method: "POST",
      body: JSON.stringify({ imageUrl: url, filename }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setImageUrl(`/VocabSubjectsPic/${filename}?timestamp=${Date.now()}`);
    setLoadingSavePic(false);
  }
  // Handle Save Picture --- END
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
                border: "5px solid #fbc02d",
              }}
              onClick={(e) => {
                handleClick(e);
              }}
            >
              <Image
                src={imageUrl}
                alt="subject-vocab"
                width={90}
                height={90}
                layout="intrinsic"
                style={{
                  borderRadius: "50%",
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
              <MenuItem
                onClick={() => {
                  handleClose();
                  handleButtonClick();
                }}
              >
                Import file
              </MenuItem>
            </Menu>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              ref={inputFileRef}
              style={{ display: "none" }}
            />
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
                <Image
                  src={createdPic.url || ""}
                  alt="english-vocab2"
                  style={{
                    objectFit: "cover",
                    border: "1px solid #fbc02d",
                  }}
                  width={90}
                  height={90}
                  layout="intrinsic"
                />
              </Grid>
              <Grid item sm container justifyContent={"center"}>
                <TextField
                  id="outlined-multiline-static"
                  label="input explains to generate the picture"
                  placeholder="Placeholder"
                  multiline
                  value={description}
                  sx={{ width: "100%", mb: "1rem" }}
                  size="medium"
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />
                <LoadingButton
                  variant="outlined"
                  onClick={() => createPicture(description || "")}
                  loading={loadingCreatePic}
                >
                  Create Picure
                </LoadingButton>
              </Grid>
            </Grid>
            <Grid item textAlign={"center"}>
              <LoadingButton
                variant="outlined"
                onClick={() => {
                  handleSubmitPicCreated(createdPic.url || "");
                }}
                loading={loadingSavePic}
              >
                Save
              </LoadingButton>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </Grid>
  );
}
