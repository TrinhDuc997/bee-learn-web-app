import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  IconButton,
  Popover,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import { authAPI } from "@api-client";
import { ITag } from "@interfaces";
import actionCommon from "@components/common";

interface IExpandTag extends ITag {
  edit?: boolean;
  checkMandatoryTitle?: boolean;
}
interface ITagsManager {}
function TagsManagerCpn(props: ITagsManager) {
  const { data: session, update } = useSession();
  const { user } = session || {};
  const [tags, setTags] = useState<IExpandTag[]>([]);
  const filterTags = tags.filter(
    (i) =>
      actionCommon.stringToSlug(i.title || "") !==
      actionCommon.stringToSlug("Mặc định")
  );
  const [tag, setTag] = useState<ITag>({});
  const [checkMandatory, setCheckMandatory] = useState(false);

  // Popover - start
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [itemDelete, setItemDelete] = useState<IExpandTag | undefined>(
    undefined
  );

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    item: IExpandTag
  ) => {
    setItemDelete(item);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setItemDelete(undefined);
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  // Popover - end
  const onChangeTag = (params: ITag) => {
    setTag((oldTag) => {
      return {
        ...oldTag,
        ...params,
      };
    });
  };
  const handleSubmit = async (tag: IExpandTag) => {
    const checkDuplicate = [...tags.map((i) => i.title)].includes(tag.title);
    if (!tag.title) {
      setCheckMandatory(true);
    } else if (checkDuplicate) {
      setCheckMandatory(true);
    } else {
      const newdata = await authAPI.updateUser({
        id: user?.id,
        tags: [...tags, tag],
      });
      const newSession = {
        ...session,
        user: {
          ...session?.user,
          ...newdata,
        },
      };
      await update(newSession);
      setTag({ title: "", description: "" });
      setCheckMandatory(false);
    }
  };
  const updateItem = async () => {
    const newdata = await authAPI.updateUser({
      id: user?.id,
      tags: tags,
    });
    const newSession = {
      ...session,
      user: {
        ...session?.user,
        ...newdata,
      },
    };
    await update(newSession);
    handleClose();
  };
  const removeItem = async (params?: IExpandTag) => {
    if (params?._id) {
      const newdata = await authAPI.updateUser({
        id: user?.id,
        tags: tags.filter((i) => i._id !== params._id),
      });
      const newSession = {
        ...session,
        user: {
          ...session?.user,
          ...newdata,
        },
      };
      await update(newSession);
      handleClose();
    }
  };
  const handleChangeItemTags = (params: IExpandTag) => {
    setTags((oldTags) => {
      return oldTags.map((item) => {
        if (item._id === params._id) {
          return {
            ...item,
            ...params,
          };
        } else {
          return {
            ...item,
            edit: false,
          };
        }
      });
    });
  };

  useEffect(() => {
    setTags(user?.tags as IExpandTag[]);
  }, [user]);
  return (
    <Grid container direction={"column"} padding={"8px"}>
      <Grid item mb={"1rem"}>
        <TextField
          sx={{ width: "100%", mb: "1rem" }}
          id="outlined-title"
          label="Tiêu Đề"
          required
          size="small"
          variant="outlined"
          focused
          aria-describedby="component-error-text"
          error={checkMandatory}
          value={tag.title}
          helperText={
            checkMandatory
              ? "Tiêu đề không được để trống và là duy nhất"
              : undefined
          }
          onChange={(e) => {
            onChangeTag({ title: e.target.value });
          }}
        />
        <TextField
          sx={{ width: "100%", mb: "8px" }}
          id="outlined-description"
          label="Mô tả"
          size="small"
          focused
          variant="outlined"
          multiline
          rows={2}
          value={tag.description}
          onChange={(e) => {
            onChangeTag({ description: e.target.value });
          }}
        />
        <Button
          variant="outlined"
          sx={{ width: "120px" }}
          onClick={() => handleSubmit(tag)}
        >
          Thêm
        </Button>
      </Grid>
      <Grid item container>
        {filterTags.map((item) => {
          const { edit = false } = item;
          return (
            <Grid key={item._id} item pr={"1rem"} pb={"1rem"}>
              <Card
                elevation={3}
                sx={{
                  borderRadius: "15px",
                }}
              >
                {edit ? (
                  <CardContent
                    sx={{
                      transition: "width 0.5s, height 0.5s",
                      width: 250,
                      height: 200,
                      padding: "8px",
                    }}
                  >
                    <TextField
                      sx={{
                        width: "100%",
                        mb: "1rem",
                      }}
                      id={`outlined-edit-title-${item._id}`}
                      label="Tiêu Đề"
                      required
                      rows={2}
                      multiline
                      size="small"
                      variant="outlined"
                      focused
                      aria-describedby="component-error-text"
                      value={item.title}
                      error={item.checkMandatoryTitle}
                      helperText={
                        item.checkMandatoryTitle
                          ? "Tiêu đề không được để trống và là duy nhất"
                          : undefined
                      }
                      onChange={(e) => {
                        handleChangeItemTags({
                          ...item,
                          title: e.target.value,
                        });
                      }}
                    />
                    <TextField
                      sx={{ width: "100%", mb: "8px" }}
                      id={`outlined-edit-description-${item._id}`}
                      label="Mô tả"
                      size="small"
                      variant="outlined"
                      multiline
                      focused
                      rows={4}
                      value={item.description}
                      onChange={(e) => {
                        handleChangeItemTags({
                          ...item,
                          description: e.target.value,
                        });
                      }}
                    />
                  </CardContent>
                ) : (
                  <CardContent
                    sx={{
                      transition: "width 0.5s, height 0.5s",
                      width: 170,
                      height: 120,
                      padding: "8px",
                    }}
                  >
                    <Typography variant="h6" fontSize={"1rem"}>
                      {(item.title || "").length <= 40
                        ? item.title
                        : (item.title || "").slice(0, 40) + "..."}
                    </Typography>
                    <Typography
                      sx={{ fontSize: 14 }}
                      color="text.secondary"
                      gutterBottom
                    >
                      {(item.description || "").length <= 40
                        ? item.description
                        : (item.description || "").slice(0, 40) + "..."}
                    </Typography>
                  </CardContent>
                )}
                <CardActions sx={{ justifyContent: "flex-end" }}>
                  <IconButton
                    size="small"
                    aria-describedby={id}
                    onClick={(e) => {
                      handleClick(e, item);
                    }}
                  >
                    <DeleteForeverIcon color="primary" />
                  </IconButton>
                  {edit ? (
                    <IconButton
                      size="small"
                      onClick={() => {
                        // check duplicate - start
                        let checkDuplicate = 0;
                        tags.forEach((tagItem) => {
                          if (tagItem.title === item.title) {
                            checkDuplicate++;
                          }
                        });
                        // check duplicate - end
                        // check changed - start
                        let checkChanged = false;
                        const tagsOrigin = user?.tags || [];
                        const itemOrigin = tagsOrigin.find(
                          (i) => i._id === item._id
                        );
                        checkChanged =
                          itemOrigin?.title !== item.title ||
                          itemOrigin?.description !== item.description;
                        // check changed - end
                        if (!item.title || checkDuplicate > 1) {
                          handleChangeItemTags({
                            ...item,
                            edit: true,
                            checkMandatoryTitle: true,
                          });
                        } else if (!checkChanged) {
                          // if don't have any the change, close mode edit and don't call API
                          handleChangeItemTags({
                            ...item,
                            edit: false,
                            checkMandatoryTitle: false,
                          });
                        } else {
                          handleChangeItemTags({
                            ...item,
                            edit: false,
                            checkMandatoryTitle: false,
                          });
                          updateItem();
                        }
                      }}
                    >
                      <SaveAsIcon color="primary" />
                    </IconButton>
                  ) : (
                    <IconButton
                      size="small"
                      onClick={() => {
                        handleChangeItemTags({ ...item, edit: true });
                      }}
                    >
                      <EditIcon color="primary" />
                    </IconButton>
                  )}
                  {edit && (
                    <Button
                      onClick={() => {
                        const tagsOrigin = user?.tags || [];
                        const itemOrigin = tagsOrigin.find(
                          (i) => i._id === item._id
                        );
                        handleChangeItemTags({ ...itemOrigin, edit: false });
                      }}
                      variant="outlined"
                      size="small"
                    >
                      Hủy
                    </Button>
                  )}
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        PaperProps={{
          elevation: 9,
          sx: {
            width: "280px",
            padding: "1rem",
            borderRadius: "15px",
            overflow: "hidden",
          },
        }}
      >
        <Grid container>
          <Grid item>
            <Typography variant="subtitle1" fontWeight={"700"}>
              Bạn có chắc muốn xóa tag này?
            </Typography>
          </Grid>
          <Grid item container justifyContent={"space-around"}>
            <Button variant="outlined" onClick={handleClose}>
              Hủy
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={() => {
                removeItem(itemDelete);
              }}
            >
              Xóa
            </Button>
          </Grid>
        </Grid>
      </Popover>
    </Grid>
  );
}

export default TagsManagerCpn;
