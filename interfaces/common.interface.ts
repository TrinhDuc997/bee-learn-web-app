import { NextPage } from "next";
import { AppProps } from "next/app";
import { ReactElement, ReactNode } from "react";
import { EmotionCache } from "@emotion/react";

export interface LayoutProps {
  children: ReactNode;
}

export type NextPageWithLayout<props> = NextPage<props> & {
  Layout?: (Props: LayoutProps) => ReactElement;
};

export type AppPropsWithLayout<props> = AppProps<props> & {
  Component: NextPageWithLayout<props>;
  emotionCache?: EmotionCache;
};
