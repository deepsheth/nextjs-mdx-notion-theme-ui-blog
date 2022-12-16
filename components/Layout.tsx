import React from "react";
import { Box, Container, jsx } from "theme-ui";
import { Header } from "./Header"
import Footer from "./Footer";
import CodeStyles from "../styles/code";
import SkipNavLink from "./SkipNavLink";

export type LayoutProps = {
    className?: string;
    hasTransparentHeader?: boolean;
    hasFullWidthContainer?: boolean;
    hasFooter?: boolean;
    children: React.ReactNode;
};

/**
 * The Layout component is used as the default layout for all pages/posts on the site.
 * It applies the global styles to the page using the ThemeProvider.
 */
export const Layout: React.FC<LayoutProps> = (props) => {
    const {
        children,
        className = ``,
        hasTransparentHeader = false,
        hasFullWidthContainer = false,
        hasFooter = true,
    } = props;
    return (
        <React.Fragment>
            {/* <SEO /> */}
            <SkipNavLink>Skip to content</SkipNavLink>
            <Header isTransparent={hasTransparentHeader} />
            <Container variant={hasFullWidthContainer ? "containerFull" : "container"}>
                <Box as="main" id="skip-nav" sx={{ ...CodeStyles }} className={className}>
                    {children}
                </Box>
            </Container>
            {hasFooter && <Footer />}
        </React.Fragment>
    );
};
export default Layout;