import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useColorMode } from "theme-ui";
import { BASE_PATH, SITE_TITLE } from "../../constants/global";

export type FooterLogoProps = {
    slug?: string;
};

export const FooterLogo: React.FC<FooterLogoProps> = (props) => {
    const { slug = "" } = props;
    const [colorMode] = useColorMode();
    const isDarkMode = colorMode === `dark`;
    const isTextDark = !isDarkMode;
    const iconTitleText = `© ${new Date().getFullYear()} ${SITE_TITLE}`;
    const imgLogoIconDark = "/assets/logo-icon-dark.svg";
    const imgLogoIconLight = "/assets/logo-icon-light.svg"


    const imgFooterLogo = (
        <Image src={isTextDark ? imgLogoIconDark : imgLogoIconLight} title={iconTitleText} alt={iconTitleText} width="48" height="32" />
    );
    return slug ? <Link href={slug}> {imgFooterLogo}</Link > : imgFooterLogo;
};