import React from "react";
import { Grid, Box, ThemeUICSSObject } from "theme-ui";
// import { ThemeUICSSObject } from "@styled-system/css";
import { sxSlideBase } from "../Slide";
import { SlideContainerBase } from "../Slide/SlideContainer";
import { SlideTitle } from "../Slide/SlideTitle";
// import BlogList from "./blog-list";
// import { Post } from "../types/post";
import { SlideDescription } from "../Slide/SlideDescription";
import { BASE_PATH, BLOG_PAGE_SLUG, databaseId } from "../../constants/global";
import Link from "next/link";
import { SlideOverlay } from "../Slide/SlideOverlay";
import { getDatabase } from "../../lib/notion";
import BlogList from "../BlogList";

export type LatestPostSlideProps = {
    id: string;
    className?: string;
    backgroundColor?: string;
    overlayColor?: string | null;
    isColorful?: boolean;
    isBorderless?: boolean;
    hasDistinctBorder?: boolean;
    posts: any;
    children?: React.ReactNode;
};

export const LatestPostSlide: React.FC<LatestPostSlideProps> = (props) => {
    const {
        id,
        className,
        backgroundColor = "background",
        overlayColor = "primary",
        isColorful = false,
        isBorderless = false,
        hasDistinctBorder = false,
        posts,
    } = props;

    return (
        <Box as="section" id={id} className={className} sx={sxSlideBlog(isBorderless, hasDistinctBorder, backgroundColor)}>
            {!!overlayColor && <SlideOverlay overlayColor={overlayColor} isColorful={isColorful} />}

            <SlideContainerBase>
                <Grid columns={[1, null, null, null, 2]} gap={[4, null, null, null, 6, null, null, 7, null, 8]}>
                    <Box>
                        <SlideTitle>Latest Posts</SlideTitle>
                        <Box sx={sxSectionDetails}>
                            <BlogList posts={posts} showTags={false} />
                            <SlideDescription>
                                <Link href={(`/${BASE_PATH}/${BLOG_PAGE_SLUG}`)}>Read all posts</Link>
                            </SlideDescription>
                        </Box>
                    </Box>
                    <Box>{props.children}</Box>
                </Grid>
            </SlideContainerBase>
        </Box>
    );
};

/**
 * Styles
 */
const sxSlideBlog = (isBorderless: boolean, hasDistinctBorder: boolean, backgroundColor: string): ThemeUICSSObject => {
    return {
        ...sxSlideBase(isBorderless, hasDistinctBorder),
        backgroundColor: backgroundColor,
    };
};

const sxSectionDetails: ThemeUICSSObject = {
    marginTop: [2, null, null, null, 3, null, null, 4, null, 5], // Match with SlideDescription marginTop
};