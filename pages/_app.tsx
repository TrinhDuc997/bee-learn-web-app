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
// import { SWRConfig } from "swr";
import { SessionProvider } from "next-auth/react";

// import { SessionProvider } from "next-auth/react";
// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {}

export default function MyApp(props: AppPropsWithLayout<MyAppProps>) {
  const {
    Component,
    emotionCache = clientSideEmotionCache,
    pageProps,
    session,
  } = props;
  const Layout = Component.Layout ?? EmptyLayout;
  React.useEffect(() => {});
  return (
    <SessionProvider
      session={session}
      // Re-fetch session every 5 minutes
      refetchInterval={60 * 60}
      // Re-fetches session when window is focused
      refetchOnWindowFocus={false}
    >
      {/* <SWRConfig
      value={{
        shouldRetryOnError: false,
      }}
    > */}
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
      {/* </SWRConfig> */}
    </SessionProvider>
  );
}
