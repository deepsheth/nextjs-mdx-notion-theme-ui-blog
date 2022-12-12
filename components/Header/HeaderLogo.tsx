import { jsx } from "theme-ui";
import { SystemStyleObject } from "@styled-system/css";
import { BASE_PATH, SITE_TITLE } from "../../constants/global";
import Link from "next/link";

export type HeaderLogoProps = {
    isTextDark: boolean;
};

const LOGO_DARK_SRC = "/assets/logo-dark.svg";
const LOGO_LIGHT_SRC = "/assets/logo-light.svg";

export const HeaderLogo: React.FC<HeaderLogoProps> = (props) => {
    const { isTextDark } = props;
    console.log({ isTextDark })
    return (
        <Link
            href={BASE_PATH}
            aria-label={`${SITE_TITLE} - Back to home`}
            sx={{ color: `heading`, textDecoration: `none`, height: "100%" }}
        >
            <h1 sx={sxH1}>
                <img src={isTextDark ? LOGO_DARK_SRC : LOGO_LIGHT_SRC} alt={SITE_TITLE} />
            </h1>
        </Link>
    );
};
export default HeaderLogo;

/**
 * Styles
 */

const sxH1: SystemStyleObject = {
    flex: "0 0 auto",
    display: "flex",
    alignItems: "center",
    margin: 0,
    paddingX: [2, null, null, null, 3, null, null, 4, null, 5],
    height: "100%",
    "& img": {
        height: ["24", null, null, null, "32"],
    },
};
