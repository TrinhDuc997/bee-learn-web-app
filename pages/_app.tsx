import * as React from "react";
import Head from "next/head";
import "../styles/globals.css";
// import { AppProps } from "next/app";
import {
  ThemeProvider,
  Experimental_CssVarsProvider as CssVarsProvider,
} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";
import { theme, createEmotionCache } from "../utils/index";
import { EmptyLayout } from "@components/layouts";
import { AppPropsWithLayout } from "../interfaces";
import { AppProps } from "next/app";
import { SWRConfig } from "swr";
import axiosClient from "api-client/general-api";
import Cookies from "js-cookie";

// import { SessionProvider } from "next-auth/react";
// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {}

export default function MyApp(props: AppPropsWithLayout<MyAppProps>) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const Layout = Component.Layout ?? EmptyLayout;
  React.useEffect(() => {});
  return (
    // <SessionProvider session={session}>
    <SWRConfig
      value={{
        fetcher: (url, init) => {
          console.log("🚀 ~ file: _app.tsx:34 ~ MyApp ~ url:", url);
          return axiosClient.get(url);
        },
        shouldRetryOnError: true,
        errorRetryCount: 2000,
      }}
    >
      <CacheProvider value={emotionCache}>
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </CacheProvider>
    </SWRConfig>

    // </SessionProvider>
  );
}
