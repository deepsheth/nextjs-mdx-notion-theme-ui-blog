import React from "react";
import { jsx } from "theme-ui";
import { SITE_TITLE } from "../../constants/global";

export type FooterBodyProps = {
    // empty
};

export const FooterBody: React.FC<FooterBodyProps> = () => {
    return (
        <div>
            <p>
                &copy; {new Date().getFullYear()} {SITE_TITLE}. All rights reserved.
            </p>
            <p>
                <small>
                    <a
                        aria-label="Link to the theme's GitHub repository"
                        href="https://github.com/shetharp/gatsby-theme-polaroid"
                    >
                        Theme
                    </a>{" "}
                    by{" "}
                    <a aria-label="Link to the theme author's website" href="https://www.arpitsheth.com">
                        Arpit Sheth
                    </a>
                </small>
            </p>
        </div>
    );
};
export default FooterBody;