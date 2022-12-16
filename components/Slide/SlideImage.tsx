import Image, { ImageProps } from "next/image";
import React from "react";
import { useThemeUI } from "theme-ui";

export type SlideImageProps = Partial<ImageProps> & {
    imgSrc: string;
    fluid: boolean; // @TODO use this prop
    imagePosition?: string;
};

/**
 * Applies default styles to the Gatsby Image component to make it behave like a background image
 * https://github.com/gatsbyjs/gatsby/issues/2470#issuecomment-338394370
 *
 * Set loading prop to "eager" for the first Slide image to make it render on the critical path.
 */
export const SlideImage: React.FC<SlideImageProps> = (props) => {
    const { fluid, imagePosition,
        imgSrc,
        styles,
        imgStyle,
        ...otherProps } = props;
    const { colorMode } = useThemeUI();
    const isDarkMode = colorMode === "dark";

    const styleWithDefaults = {
        objectPosition: imagePosition,
        ...(isDarkMode && { filter: "brightness(50%)" }),
        ...styles
    };

    return <Image
        src={imgSrc}
        alt=""
        fill
        style={styleWithDefaults}
        {...otherProps}
    />;
};