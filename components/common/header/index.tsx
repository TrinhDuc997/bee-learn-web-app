import * as React from "react";
import { HeaderDesktop } from "./headerDesktop";
import { HeaderMobile } from "./headerMobile";

export interface HeaderProps {}

export default function Header(props: HeaderProps) {
  return (
    <>
      <HeaderDesktop />
      <HeaderMobile />
    </>
  );
}
