import * as React from "react";
import { FooterDesktop } from "./footerDesktop";
import { FooterMobile } from "./footerMobile";

export interface FooterProps {}

export default function Footer(props: FooterProps) {
  return (
    <>
      <FooterDesktop />
      <FooterMobile />
    </>
  );
}
