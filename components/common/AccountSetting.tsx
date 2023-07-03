import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useAuth } from "@hooks";
import _ from "../common";
import { Button, Typography } from "@mui/material";
import LoadingDots from "./loadingComponent/LoadingDot";

export default function AccountMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { logout, profile = {}, isLoading } = useAuth();
  const { name = "" } = profile;
  const router = useRouter();
  const HandleLogout = () => {
    logout();
    Cookies.set("access_token", "");
  };
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <React.Fragment>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          textAlign: "center",
          height: "100%",
        }}
      >
        {!profile.id ? (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Button
              variant="outlined"
              sx={{
                backgroundColor: "background.default",
                color: "secondary.main",
                borderColor: "secondary.main",
                fontWeight: "bold",
                "&:hover": {
                  borderColor: "secondary.main",
                },
                ml: "1rem",
                mr: "1rem",
              }}
              onClick={() => {
                router.push("/login");
              }}
            >
              Đăng Nhập
            </Button>
            <Button
              variant="outlined"
              sx={{
                backgroundColor: "background.default",
                color: "secondary.main",
                borderColor: "secondary.main",
                fontWeight: "bold",
                "&:hover": {
                  borderColor: "secondary.main",
                },
                ml: "1rem",
                mr: "1rem",
              }}
            >
              Đăng Ký
            </Button>
          </Box>
        ) : (
          <Tooltip title="Account settings">
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <Avatar
                sx={{
                  width: 45,
                  height: 45,
                  bgcolor: isLoading
                    ? "secondary.light"
                    : _.stringToColor(name),
                  color: _.invertColor(_.stringToColor(name)),
                }}
              >
                {isLoading ? (
                  <Avatar sx={{ bgcolor: "primary.main" }} />
                ) : (
                  _.stringAvatar(name)
                )}
              </Avatar>
            </IconButton>
          </Tooltip>
        )}
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {isLoading ? (
          <MenuItem sx={{ alignItems: "flex-end" }}>
            <Typography variant="body1">Đang lấy dữ liệu</Typography>
            <LoadingDots sx={{ paddingBottom: "7px" }} />
          </MenuItem>
        ) : (
          <MenuItem>
            <Avatar /> {name}
          </MenuItem>
        )}
        <Divider />
        {profile.role && (
          <MenuItem
            onClick={() => {
              router.push("/dashboard");
            }}
          >
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            Dashboard
          </MenuItem>
        )}
        <MenuItem
          onClick={() => {
            HandleLogout();
          }}
        >
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
