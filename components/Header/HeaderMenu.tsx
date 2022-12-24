import React from "react";
import PropTypes from "prop-types";
import { Box } from "theme-ui";
import { ThemeUICSSObject } from "theme-ui";
import { headerMenuItems } from "../../constants/constants";
import { BASE_PATH } from "../../constants/global";
import Link from "next/link";

export type HeaderMenuProps = {
    isOpen: boolean;
};

export const HeaderMenu: React.FC<HeaderMenuProps> = (props) => {

    return (
        <Box sx={sxBox(props.isOpen)}>
            <nav sx={sxNav}>
                {headerMenuItems.map((menuItem, index) => {
                    const { isVisibleMobile, isVisibleTablet, isVisibleLaptop } = menuItem;
                    const isExternalLink = !!menuItem.href;
                    return (
                        <Link
                            key={`${index}-${menuItem.label}`}
                            sx={sxNavLink(isVisibleMobile, isVisibleTablet, isVisibleLaptop)}
                            href={isExternalLink ? menuItem.href : menuItem.slug}
                        >
                            {menuItem.label}
                        </Link>
                    );
                })}
            </nav>
        </Box >
    );
};
export default HeaderMenu;

HeaderMenu.propTypes = {
    isOpen: PropTypes.bool.isRequired,
};

/**
 * Types
 */
export type HeaderMenuItem = {
    label: string;
    slug?: string;
    href?: string;
    isVisibleMobile?: boolean;
    isVisibleTablet?: boolean;
    isVisibleLaptop?: boolean;
};

/**
 * Styles
 */
const sxBox = (isOpen: boolean): ThemeUICSSObject => ({
    paddingTop: [6, null, null, null, 7, null, null, 8], // Offset by height of header
    backgroundColor: "muted",
    height: "100vh",
    width: ["100vw", null, null, null, "66vw", null, "50vw", null, "33vw"],
    position: "fixed",
    top: 0,
    right: 0,
    zIndex: "headerMenu",
    transform: isOpen ? "translateX(0)" : "translateX(100%)",
    transition: "all 300ms ease-in-out",
});

const sxNav: ThemeUICSSObject = {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    textAlign: "center",
    overflowY: "scroll",
};

const sxNavLink = (
    isVisibleMobile?: boolean,
    isVisibleTablet?: boolean,
    isVisibleLaptop?: boolean
): ThemeUICSSObject => {
    const displayStyles = [
        isVisibleMobile !== false ? "block" : "none",
        null,
        null,
        null,
        isVisibleTablet !== false ? "block" : "none",
        null,
        null,
        isVisibleLaptop !== false ? "block" : "none",
    ];
    return {
        display: displayStyles,
        padding: [2, null, null, null, 3, null, null, 4, null, 5],
        textTransform: "uppercase",
        letterSpacing: "0.2ch",
        textDecoration: "none",
        ':hover': {
            color: "primary",
        },
    };
};
