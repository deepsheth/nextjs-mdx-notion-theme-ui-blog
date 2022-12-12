import React from "react";
import PropTypes from "prop-types";
import { jsx, Box, NavLink, Link } from "theme-ui";
import { SystemStyleObject } from "@styled-system/css";
import { headerMenuItems } from "./constants";
import { BASE_PATH } from "../../constants/global";

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
                    const navLinkProps = {
                        ...(isExternalLink
                            ? { href: menuItem.href }
                            : { as: Link, to: `/${BASE_PATH}/${menuItem.slug}` }),
                    };
                    return (
                        <NavLink
                            key={`${index}-${menuItem.label}`}
                            sx={sxNavLink(isVisibleMobile, isVisibleTablet, isVisibleLaptop)}
                            {...navLinkProps}
                        >
                            {menuItem.label}
                        </NavLink>
                    );
                })}
            </nav>
        </Box>
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
const sxBox = (isOpen: boolean): SystemStyleObject => ({
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

const sxNav: SystemStyleObject = {
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
): SystemStyleObject => {
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
    };
};
