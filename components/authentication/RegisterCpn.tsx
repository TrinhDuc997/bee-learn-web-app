import { LoadingButton } from "@mui/lab";
import {
  Button,
  FormControl,
  FormHelperText,
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
import { IUserRegistration } from "@interfaces";
import { authAPI } from "@api-client";

interface IRegister {
  handleRegisterSuccess: Function;
}
interface ICheckMandatory {
  isShowMandatory?: boolean;
  isUserNameEmpty?: boolean;
  isFullNameEmpty?: boolean;
  isPassEmpty?: boolean;
  isRePassEmpty?: boolean;
  isPassMismatch?: boolean;
}

function RegisterCpn(props: IRegister) {
  const { handleRegisterSuccess } = props;
  const [user, setUser] = React.useState<IUserRegistration>({});
  const [mandaroty, setMandatory] = React.useState<ICheckMandatory>({});
  const [messageAPI, setMessageAPI] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
  };

  const handleChangeUser = (params: IUserRegistration) => {
    setUser((user) => {
      return { ...user, ...params };
    });
  };
  const handleClick = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      const btnLogin = document.getElementById("btn-register");
      if (!!btnLogin) {
        btnLogin.click();
      }
    }
  };
  const handleSubmit = async (user: IUserRegistration) => {
    const checkMandatory = {
      isShowMandatory: true,
      isUserNameEmpty: !user.username,
      isFullNameEmpty: !user.fullName,
      isPassEmpty: !user.password,
      isRePassEmpty: !user.reInputPass,
      isPassMismatch: user.password !== user.reInputPass,
    };
    if (
      checkMandatory.isUserNameEmpty ||
      checkMandatory.isFullNameEmpty ||
      checkMandatory.isPassEmpty ||
      checkMandatory.isRePassEmpty ||
      checkMandatory.isPassMismatch
    ) {
      setMandatory(checkMandatory);
    } else {
      setMandatory((oldMandatory) => {
        return {
          ...oldMandatory,
          isShowMandatory: false,
        };
      });
      setLoading(true);
      const newUser: any = await authAPI.userRegistration({
        name: user.fullName,
        username: user.username,
        password: user.password,
      });
      setLoading(false);
      if (!!newUser._id) {
        handleRegisterSuccess();
      } else {
        if (newUser.err.code === 11000) {
          // duplicate key error collection
          const { keyValue = {} } = newUser.err;
          const titleKeys: { [key: string]: string } = {
            username: "Tên Đăng Nhập",
          };
          setMessageAPI(
            `${Object.keys(keyValue).map((i) => titleKeys[i] || i)} đã tồn tại!`
          );
        }
      }
    }
  };
  React.useEffect(() => {
    addEventListener("keydown", handleClick);
    return () => {
      removeEventListener("keydown", handleClick);
    };
  }, []);
  return (
    <Grid container direction={"column"} spacing={2} justifyContent={"center"}>
      <Grid item>
        {/* <Typography variant="h6" color={"primary.dark"} fontWeight={"800"}>
          Đăng Nhập
        </Typography> */}
      </Grid>
      <Grid item>
        <TextField
          sx={{ width: "35ch" }}
          label="Tên Đăng Nhập"
          size="small"
          variant="outlined"
          value={user.username}
          error={mandaroty.isShowMandatory && mandaroty.isUserNameEmpty}
          helperText={
            mandaroty.isShowMandatory && mandaroty.isUserNameEmpty
              ? "Tên đăng nhập không được để trống!"
              : undefined
          }
          onChange={(e) => {
            handleChangeUser({ username: e.target.value });
          }}
        />
      </Grid>
      <Grid item>
        <TextField
          sx={{ width: "35ch" }}
          label="Họ và Tên"
          size="small"
          error={mandaroty.isShowMandatory && mandaroty.isFullNameEmpty}
          helperText={
            mandaroty.isShowMandatory && mandaroty.isFullNameEmpty
              ? "Họ và Tên không được để trống!"
              : undefined
          }
          variant="outlined"
          value={user.fullName}
          onChange={(e) => {
            handleChangeUser({ fullName: e.target.value });
          }}
        />
      </Grid>
      <Grid item>
        <FormControl sx={{ width: "35ch" }} variant="outlined">
          <InputLabel size="small" htmlFor="outlined-adornment-lablepassword">
            Mật khẩu
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            value={user.password}
            error={mandaroty.isShowMandatory && mandaroty.isPassEmpty}
            onChange={(e) => {
              handleChangeUser({ password: e.target.value });
            }}
            type={showPassword ? "text" : "password"}
            size="small"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  size="small"
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Mật khẩu"
          />
          {mandaroty.isShowMandatory && mandaroty.isPassEmpty && (
            <FormHelperText
              error={mandaroty.isShowMandatory && mandaroty.isPassEmpty}
              id="my-helper-text"
            >
              Mật khẩu không được để trống!
            </FormHelperText>
          )}
        </FormControl>
      </Grid>
      <Grid item>
        <FormControl sx={{ width: "35ch" }} variant="outlined">
          <InputLabel size="small" htmlFor="outlined-adornment-labelrepassword">
            Nhập lại mật khẩu
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-repassword"
            value={user.reInputPass}
            error={
              mandaroty.isShowMandatory &&
              (mandaroty.isRePassEmpty || mandaroty.isPassMismatch)
            }
            size="small"
            onKeyDown={(e) => {
              if (e.code === "Enter") {
              }
            }}
            onChange={(e) => {
              handleChangeUser({ reInputPass: e.target.value });
            }}
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  size="small"
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Nhập lại mật khẩu"
          />
          {mandaroty.isShowMandatory && mandaroty.isPassMismatch && (
            <FormHelperText
              error={mandaroty.isShowMandatory && mandaroty.isPassMismatch}
              id="my-helper-text"
            >
              Nhập lại mật khẩu không khớp!
            </FormHelperText>
          )}
        </FormControl>
      </Grid>
      {!!messageAPI && (
        <Grid item>
          <Typography variant="body1" color={"error"} id="helper-message">
            {messageAPI}
          </Typography>
        </Grid>
      )}
      <Grid item>
        <LoadingButton
          loading={loading}
          onClick={() => {
            handleSubmit(user);
          }}
          loadingIndicator="Loading…"
          variant="outlined"
          id="btn-register"
        >
          Đăng Ký
        </LoadingButton>
      </Grid>
    </Grid>
  );
}

export default RegisterCpn;
