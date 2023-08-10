import { LoadingButton } from "@mui/lab";
import {
  Button,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IUser } from "@interfaces";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import { signIn } from "next-auth/react";

interface ILogin {
  notify: string;
}

function LoginCpn(props: ILogin) {
  const { notify } = props;
  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [checkLogin, setCheckLogin] = React.useState(false);

  const [user, setUser] = React.useState<IUser>({});
  const { username = "", password = "" } = user;
  const handleChangeUser = (params: IUser) => {
    setUser((user) => {
      return { ...user, ...params };
    });
  };
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
  };

  const handleSubmit = async (username: string, password: string) => {
    setLoading(true);
    const res = await signIn(
      "credentials",
      { redirect: false },
      { username, password }
    );
    if (res?.status === 401) {
      setCheckLogin(true);
    }
    setLoading(false);
  };
  const handleClick = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      const btnLogin = document.getElementById("btn-login");
      if (!!btnLogin) {
        btnLogin.click();
      }
    }
  };

  const openPopup = (provider: string) => {
    const width = 500;
    const height = 600;
    const left = window.innerWidth / 2 - width / 2;
    const top = window.innerHeight / 2 - height / 2;

    window.open(
      `/${provider}`,
      "_blank",
      `width=${width}, height=${height}, left=${left}, top=${top}`
    );
  };

  React.useEffect(() => {
    addEventListener("keydown", handleClick);
    return () => {
      removeEventListener("keydown", handleClick);
    };
  }, []);
  // React.useEffect(() => {
  //   if (!!profile) {
  //     console.log(
  //       "🚀 ~ file: LoginCpn.tsx:87 ~ React.useEffect ~ profile:",
  //       profile
  //     );
  //   }
  // }, [profile]);
  return (
    <Grid container direction={"column"} spacing={2} justifyContent={"center"}>
      <Grid item>
        {!!notify && (
          <Typography
            variant="subtitle1"
            whiteSpace={"pre-line"}
            color={"success.light"}
          >
            {notify}
          </Typography>
        )}
      </Grid>
      <Grid item>
        <TextField
          sx={{ width: "35ch" }}
          id="outlined-basic"
          label="Tên Đăng Nhập"
          variant="outlined"
          value={username}
          onChange={(e) => {
            handleChangeUser({ username: e.target.value });
          }}
        />
      </Grid>
      <Grid item>
        <FormControl sx={{ m: 1, width: "35ch" }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            Mật Khẩu
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            value={password}
            onKeyDown={(e) => {
              if (e.code === "Enter") {
              }
            }}
            onChange={(e) => {
              handleChangeUser({ password: e.target.value });
            }}
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => handleClickShowPassword()}
                  onMouseDown={(e) => handleMouseDownPassword(e)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
      </Grid>
      <Grid item>
        <LoadingButton
          loading={loading}
          onClick={() => {
            handleSubmit(username, password);
          }}
          loadingIndicator="Loading…"
          variant="outlined"
          id="btn-login"
        >
          Đăng Nhập
        </LoadingButton>
      </Grid>
      <Grid item>
        <IconButton
          color="primary"
          aria-label="add to shopping cart"
          onClick={() => openPopup("google-login")}
        >
          <GoogleIcon fontSize="large" />
        </IconButton>
        <IconButton
          color="primary"
          aria-label="add to shopping cart"
          onClick={() => openPopup("facebook-login")}
        >
          <FacebookIcon fontSize="large" />
        </IconButton>
      </Grid>
      {checkLogin && (
        <Grid item>
          <Typography variant="subtitle2" color={"error.main"}>
            Tài Khoản Hoặc Mật Khẩu Không Chính Xác!
          </Typography>
        </Grid>
      )}
      <Grid item>
        <Button variant="text">Quên Mật Khẩu</Button>
      </Grid>
    </Grid>
  );
}

export default LoginCpn;
