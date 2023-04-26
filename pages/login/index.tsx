import { useAuth } from "@hooks";
import { user } from "@interfaces";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { authAPI } from "api-client";
import Cookies from "js-cookie";
// import Cookies from "js-cookie";
import Image from "next/image";
import { useRouter } from "next/router";
import * as React from "react";
export interface ILoginProps {}

export default function Login(props: ILoginProps) {
  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [checkLogin, setCheckLogin] = React.useState(false);

  const [user, setUser] = React.useState<user>({});
  const { username = "", password = "" } = user;
  const handleChangeUser = (params: user) => {
    setUser((user) => {
      return { ...user, ...params };
    });
  };
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
  };
  const router = useRouter();
  const { login } = useAuth({
    revalidateOnMount: false,
  });
  const handleSubmit = async (username: string, password: string) => {
    try {
      setLoading(true);
      const resData = await login(username, password);
      // convert to token to cookies
      const { token } = resData;
      Cookies.set("access_token", token, { expires: 7 });
      setLoading(false);
      setCheckLogin(false);
      // router.back();

      if (
        typeof window !== "undefined" &&
        (window.history.state === null || window.history.state.as === "/login")
      ) {
        router.push("/");
      } else {
        router.back();
      }
    } catch (error) {
      console.log("failed to login", error);
      setCheckLogin(true);
      setLoading(false);
    }
  };
  // async function handleSubmit(username: string, password: string) {
  //   setLoading(true);
  //   const loginData = await authAPI.login({ username, password });
  //   const { token = "", message = "" } = loginData || {};
  //   setLoading(false);
  //   if (!!token) {
  //     setCheckLogin(false);
  //     return router.push("/");
  //   }
  //   if (!!message) {
  //     setCheckLogin(true);
  //   }
  // }
  return (
    <Box textAlign={"center"}>
      <Stack
        justifyContent={"center"}
        alignItems={"center"}
        spacing={2}
        minHeight={"100vh"}
      >
        <Box
          component={"header"}
          minHeight={"10vh"}
          paddingTop={"40px"}
          paddingBottom={"20px"}
        >
          <Grid container>
            <Grid item>
              <Image
                style={{ borderRadius: "10px" }}
                width={260}
                height={90}
                layout="intrinsic"
                alt="logo"
                src="/logo.png"
              />
            </Grid>
          </Grid>
        </Box>
        <Container
          sx={{
            minHeight: "75vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          <Paper sx={{ width: "400px", height: "500px", bgcolor: "#ffffff" }}>
            <Grid
              container
              direction={"column"}
              spacing={2}
              justifyContent={"center"}
            >
              <Grid item mt={2}>
                <Typography
                  variant="h6"
                  color={"primary.dark"}
                  fontWeight={"800"}
                >
                  Đăng Nhập
                </Typography>
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
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
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
                >
                  Đăng Nhập
                </LoadingButton>
              </Grid>
              {checkLogin && (
                <Grid item>
                  <Typography variant="subtitle2" color={"error.main"}>
                    Tài Khoản Hoặc Mật Khẩu Không Chính Xác!
                  </Typography>
                </Grid>
              )}
              <Grid item>
                <Button sx={{ mt: "2rem" }} variant="text">
                  Quên Mật Khẩu
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Container>

        <Box
          component={"footer"}
          minHeight={"10vh"}
          width={"100%"}
          position={"absolute"}
          bottom={0}
          zIndex={"-999"}
          display={{ xs: "none", md: "block" }}
        >
          <Grid container alignItems={"flex-end"}>
            <Grid xs={4} item>
              {/* <img
                src="/images/section1.jpg"
                alt="section"
                style={{ width: "100%", height: "auto" }}
              /> */}
            </Grid>
            <Grid xs={4} item></Grid>
            <Grid xs={4} item>
              {/* <img
                src="/images/section2.png"
                alt="section"
                style={{ width: "100%", height: "auto" }}
              /> */}
            </Grid>
          </Grid>
        </Box>
      </Stack>
    </Box>
  );
}
