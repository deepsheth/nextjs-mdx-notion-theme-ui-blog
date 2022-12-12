
import React from "react";
import { jsx, useThemeUI, Flex } from "theme-ui";
import { SystemStyleObject } from "@styled-system/css";
import ColorModeToggle from "../ColorModeToggle";

export type HeaderColorModeToggleProps = {
    isTextDark: boolean;
};

export const HeaderColorModeToggle: React.FC<HeaderColorModeToggleProps> = (props) => {
    const { isTextDark } = props;
    const { theme, colorMode, setColorMode } = useThemeUI();
    const isDarkMode = colorMode === `dark`;
    const fillColor = isTextDark ? (theme.colors?.film100 as string) : (theme.colors?.flash100 as string);

    const toggleColorMode = (e: React.MouseEvent) => {
        e.preventDefault();
        setColorMode(isDarkMode ? `light` : `dark`);
    };

    return (
        <Flex sx={sxFlex}>
            <ColorModeToggle isDark={isDarkMode} fillColor={fillColor} toggle={toggleColorMode} />
        </Flex>
    );
};
export default HeaderColorModeToggle;

/**
 * Styles
 */

const sxFlex: SystemStyleObject = {
    marginLeft: [2, null, null, null, 3, null, null, 4, null, 5],
};
