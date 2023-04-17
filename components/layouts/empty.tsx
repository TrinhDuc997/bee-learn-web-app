import * as React from "react";
import { LayoutProps } from "@interfaces";

export interface EmptyLayoutProps {}

export function EmptyLayout({ children }: LayoutProps) {
  return <>{children}</>;
}
