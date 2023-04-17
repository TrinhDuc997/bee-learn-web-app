import * as React from "react";
import { HeaderDesktop } from "./HeaderDesktop";
import { HeaderMobile } from "./HeaderMobile";

export interface HeaderProps {}

export default function Header(props: HeaderProps) {
  return (
    <>
      <HeaderDesktop />
      <HeaderMobile />
    </>
  );
}
