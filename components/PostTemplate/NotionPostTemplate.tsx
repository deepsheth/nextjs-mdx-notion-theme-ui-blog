import { Heading, Divider, Text } from "theme-ui";
import React, { Fragment } from "react";
import Layout from "../Layout";
import Head from "next/head";
import Link from "next/link";
import { renderBlock } from "../../utils/renderBlock";
import { NotionTextBlock } from "../../pages/[id]";
// import ItemTags from "./item-tags";

const PostTemplate: React.FC<PostTemplateProps> = ({ page, blocks, date }) => (
    <Layout>
        <Head>
            <title>{page.properties.Name.title[0].plain_text}</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <article>
            <Heading>
                <NotionTextBlock text={page.properties.Name.title} />
            </Heading>

            <p sx={{ color: "accent" }}>
                <Text variant="mono">
                    <time>{date}</time>
                </Text>
                {/* {post.tags && (
          <React.Fragment>
            {` — `}
            <ItemTags tags={post.tags} />
          </React.Fragment>
        )} */}
                {/* {post.timeToRead && (
          <React.Fragment>
            <br />
            <span>{post.timeToRead} min read</span>
          </React.Fragment>
        )} */}
            </p>

            <Divider variant="dividers.pageHeading" />

            <section>
                {blocks.map((block) => (
                    <Fragment key={block.id}>{renderBlock(block)}</Fragment>
                ))}
                <Link href="/">
                    ← Go home
                </Link>
            </section>
        </article>
    </Layout>
)

export default PostTemplate;