import React from "react";
import { Post } from "../types/post";
import { ThemeUICSSObject } from "theme-ui"
import { Box, Text } from "@theme-ui/components";
import { NotionTextBlock } from "../pages/[slug]";
import Link from "next/link";
import { PageObjectResponse, PartialPageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { NOTION_SLUG } from "../constants/global";

export type BlogListItemProps = {
    className?: string; // Pass down className to allow overriding styles
    post: (PageObjectResponse | PartialPageObjectResponse)
    showTags?: boolean;
};

export const BlogListItem: React.FC<BlogListItemProps> = (props) => {
    const { className, post, showTags = true } = props;

    const date = new Date(post.last_edited_time).toLocaleString(
        "en-US",
        {
            month: "short",
            day: "2-digit",
            year: "numeric",
        }
    );

    return (
        <Box as="article" className={className} sx={sxBlogPostItem}>
            {/* @ts-ignore */}
            <Link href={`${NOTION_SLUG}/${post.id}`} sx={sxBlogPostTitleLink}>
                <Text sx={sxBlogPostTitle}><NotionTextBlock text={post.properties.Name.title} /></Text>
            </Link>

            <p sx={sxBlogPostDetails}>
                <time>{date}</time>

                {post.properties.Tags && showTags && (
                    <React.Fragment>
                        {` — `}
                        <ItemTags tags={post.properties.Tags.multi_select} />
                    </React.Fragment>
                )}
            </p>
        </Box>
    );
};

/**
 * Styles
 */
const sxBlogPostItem: ThemeUICSSObject = {
    marginBottom: [4, null, null, null, 5, null, 6, 7, 8],
};

const sxBlogPostTitleLink: ThemeUICSSObject = {
    color: "inherit",
    textDecoration: "none",
    [":hover"]: {
        textDecoration: "underline",
    },
};

const sxBlogPostTitle: ThemeUICSSObject = {
    color: "inherit",
    lineHeight: "heading",
    fontWeight: "heading",
    fontSize: [1, null, null, 2, null, null, 3, null, 4], // Size up from SlideDescription fontSize
};

const sxBlogPostDetails: ThemeUICSSObject = {
    fontSize: [0, null, null, null, null, null, 1, null, 2],
    fontFamily: "monospace",
    marginY: [0, null, null, null, null, null, 1],
    color: "accent",
};

export type BlogListProps = {
    posts: (PageObjectResponse | PartialPageObjectResponse)[];
    className?: string; // Pass down className to allow overriding styles
    showTags?: boolean;
};

export const BlogList: React.FC<BlogListProps> = ({ posts, className = ``, showTags = true }) => (
    <section className={className}>
        {posts.map((post) => (
            <BlogListItem key={post.id} post={post} showTags={showTags} />
        ))}
    </section>
);

export default BlogList;