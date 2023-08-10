import LoginCpn from "@components/authentication/LoginCpn";
import RegisterCpn from "@components/authentication/RegisterCpn";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Container, Grid, Paper, Stack, Tab } from "@mui/material";
import { authAPI } from "api-client";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import * as React from "react";
export interface ILoginProps {}
import { useSession } from "next-auth/react";

export default function Login(props: ILoginProps) {
  const [value, setValue] = React.useState("1");
  const [notify, setNotify] = React.useState("");
  const { data: session, status } = useSession();
  const router = useRouter();

  console.log(
    "🚀 ~ file: index.tsx:17 ~ Login ~ session, status:",
    session,
    status
  );

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setNotify("");
    setValue(newValue);
  };
  const handleRegisterSuccess = () => {
    setValue("1");
    setNotify("Đăng ký thành công \n Chào mừng bạn đến với BeeLearning!");
  };
  React.useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status]);

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
                src="/Logo.png"
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
          <Paper
            sx={{
              width: "400px",
              height: "500px",
              bgcolor: "#ffffff",
              borderRadius: "15px",
              overflow: "hidden",
            }}
          >
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                  sx={{
                    justifyContent: "space-between",
                  }}
                >
                  <Tab sx={{ width: "50%" }} label="Đăng Nhập" value="1" />
                  <Tab sx={{ width: "50%" }} label="Đăng Ký" value="2" />
                </TabList>
              </Box>
              <TabPanel value="1">
                <LoginCpn notify={notify} />
              </TabPanel>
              <TabPanel value="2">
                <RegisterCpn handleRegisterSuccess={handleRegisterSuccess} />
              </TabPanel>
            </TabContext>
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
