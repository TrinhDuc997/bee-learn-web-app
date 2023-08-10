import { NextPage } from "next";
import { AppProps } from "next/app";
import { ReactElement, ReactNode } from "react";
import { EmotionCache } from "@emotion/react";
import { Session } from "next-auth";
export interface LayoutProps {
  children: ReactNode;
}

export type NextPageWithLayout<props> = NextPage<props> & {
  Layout?: (Props: LayoutProps) => ReactElement;
};
export type AppPropsWithLayout<props> = AppProps<props> & {
  Component: NextPageWithLayout<props>;
  emotionCache?: EmotionCache;
  session: Session;
};
export interface ImageData {
  id: number;
  width: number;
  height: number;
  url: string;
  photographer: string;
  photographer_url: string;
  photographer_id: number;
  avg_color: string;
  src: {
    original: string;
    large2x: string;
    large: string;
    medium: string;
    small: string;
    portrait: string;
    landscape: string;
    tiny: string;
  };
  liked: boolean;
  alt: string;
}
