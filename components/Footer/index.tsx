import React from "react";
import { jsx, Container, Flex } from "theme-ui";
// import { SystemStyleObject } from "@styled-system/css";

import FooterBody from "./FooterBody";
import { FooterLogo } from "./FooterLogo";
import { ABOUT_PAGE_SLUG } from "../../constants/global";

export const Footer: React.FC<FooterProps> = () => {
    return (
        <footer sx={sxFooter}>
            <Container>
                <Flex sx={sxFooterInner}>
                    <FooterLogo slug={ABOUT_PAGE_SLUG} />
                    <FooterBody />
                </Flex>
            </Container>
        </footer>
    );
};
export default Footer;

/**
 * Styles
 */
// const sxFooter: SystemStyleObject = {
const sxFooter: any = {
    mt: [6, null, null, null, 7, 8, 9, 10],
};

// const sxFooterInner: SystemStyleObject = {
const sxFooterInner: any = {
    flexDirection: "column",
    alignItems: "center",
    color: "accent",
    textAlign: "center",
};