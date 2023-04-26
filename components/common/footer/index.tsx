import * as React from "react";
import FooterDesktop from "./FooterDesktop";
import FooterMobile from "./FooterMobile";

export interface FooterProps {}

export default function Footer(props: FooterProps) {
  return (
    <>
      <FooterDesktop />
      <FooterMobile />
    </>
  );
}
