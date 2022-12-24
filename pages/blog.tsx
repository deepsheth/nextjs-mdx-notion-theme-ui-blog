import Link from "next/link";
import React from "react";
import { Box, Divider, Heading, Text } from "theme-ui";
import ItemTags from "../components/ItemTags";
import Layout from "../components/Layout";
import { databaseId, NOTION_SLUG } from "../constants/global";
import { getDate, getPosts, getTags } from "../utils/notion";
import { NotionTextBlock } from "./[id]";

const BlogListItem: React.FC<BlogListItemProps> = (props) => {
    const { post, showTags } = props;
    return (<Box as="article" sx={sxBlogPostItem} >
        {/* @ts-ignore */}
        <Link href={`${NOTION_SLUG}/${post.id}`} sx={sxBlogPostTitleLink} >
            <Text sx={sxBlogPostTitle}>{post.properties.Name.title[0].plain_text}</Text>
        </Link>

        <p sx={sxBlogPostDetails}>
            <time>{getDate(post)}</time>

            {post.properties.Tags.multi_select.length > 0 && showTags && (
                <React.Fragment>
                    {` — `}
                    <ItemTags tags={getTags(post)} />
                </React.Fragment>
            )}
        </p>
    </Box >
    );
};

const Blog: React.FC<BlogProps> = (props) => {
    const { posts } = props;
    return (
        <Layout>
            <Heading>Blog</Heading>
            <Divider />
            <section>
                {posts.map((post) => (
                    <BlogListItem key={post.slug} post={post} showTags={true} />
                ))}
            </section>
        </Layout>
    );
};
export default Blog;

/**
 * Styles
 */
const sxBlogPostItem: SystemStyleObject = {
    marginBottom: [4, null, null, null, 5, null, 6, 7, 8],
};

const sxBlogPostTitleLink: SystemStyleObject = {
    color: "inherit",
    textDecoration: "none",
    [":hover"]: {
        textDecoration: "underline",
    },
};

const sxBlogPostTitle: SystemStyleObject = {
    color: "inherit",
    lineHeight: "heading",
    fontWeight: "heading",
    fontSize: [1, null, null, 2, null, null, 3, null, 4], // Size up from SlideDescription fontSize
};

const sxBlogPostDetails: SystemStyleObject = {
    fontSize: [0, null, null, null, null, null, 1, null, 2],
    fontFamily: "monospace",
    marginY: [0, null, null, null, null, null, 1],
    color: "accent",
};

export const getStaticProps = async () => {
    const database = await getPosts(databaseId);

    return {
        props: {
            posts: database,
        },
        revalidate: 1,
    };
};