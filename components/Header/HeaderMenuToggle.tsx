
import { SystemStyleObject } from "@styled-system/css";
import React from "react";

export type HeaderMenuToggleProps = {
    isTextDark: boolean;
    isOpen: boolean;
    onToggle: () => void;
};

const iMenuDark = "/assets/i-menu-dark.svg";
const iMenuLight = "/assets/i-menu-light.svg";
const iCloseDark = "/assets/i-close-dark.svg";
const iCloseLight = "/assets/i-close-light.svg";


export const HeaderMenuToggle: React.FC<HeaderMenuToggleProps> = (props) => {
    const { isTextDark, isOpen } = props;

    return (
        <button
            onClick={props.onToggle}
            sx={sxButton}
            aria-label={isOpen ? "Close Menu (Esc)" : "Open Menu"}
            title={isOpen ? "Close Menu (Esc)" : "Open Menu"}
        >
            {isOpen ? (
                <img src={isTextDark ? iCloseDark : iCloseLight} alt="Toggle Menu" />
            ) : (
                <img src={isTextDark ? iMenuDark : iMenuLight} alt="Toggle Menu" />
            )}
        </button>
    );
};
export default HeaderMenuToggle;

/**
 * Styles
 */
const sxButton: SystemStyleObject = {
    cursor: "pointer",
    height: "100%",
    display: "flex",
    alignItems: "center",
    border: "none",
    outline: "none",
    background: "none",
    appearance: "none",
    paddingX: [2, null, null, null, 3, null, null, 4, null, 5],
    "& img": {
        width: ["16", null, null, null, "24"],
    },
};
