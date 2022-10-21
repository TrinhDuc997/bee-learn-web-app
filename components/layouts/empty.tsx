import * as React from "react";
import { LayoutProps } from "../../models";

export interface EmptyLayoutProps {}

export function EmptyLayout({ children }: LayoutProps) {
  return <>{children}</>;
}
