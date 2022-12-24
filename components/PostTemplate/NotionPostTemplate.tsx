import Head from "next/head";
import Link from "next/link";
import React, { Fragment } from "react";
import { Divider, Heading, Text } from "theme-ui";
import { BASE_PATH, FAVICON_PATH } from "../../constants/global";
import { NotionTextBlock } from "../../pages/[id]";
import { getReadTime, getTags } from "../../utils/notion";
import { renderBlock } from "../../utils/renderBlock";
import ItemTags from "../ItemTags";
import Layout from "../Layout";

const PostTemplate: React.FC<PostTemplateProps> = ({ page, blocks, date }) => (
    <Layout>
        <Head>
            <title>{page.properties.Name.title[0].plain_text}</title>
            <link rel="icon" href={FAVICON_PATH} />
        </Head>

        <article>
            <Heading>
                <NotionTextBlock text={page.properties.Name.title} />
            </Heading>

            <p sx={{ color: "accent" }}>
                <Text variant="mono">
                    <time>{date}</time>
                </Text>
                {page.properties.Tags.multi_select.length > 0 && (
                    <React.Fragment>
                        {` — `}
                        <ItemTags tags={getTags(page)} />
                    </React.Fragment>
                )}
                {page.properties["Read Time"].rich_text.length > 0 && (
                    <React.Fragment>
                        <br />
                        <span>{getReadTime(page)} read</span>
                    </React.Fragment>
                )}
            </p>

            <Divider variant="dividers.pageHeading" />

            <section>
                {blocks.map((block) => (
                    <Fragment key={block.id}>{renderBlock(block)}</Fragment>
                ))}
                <Link href={BASE_PATH}>
                    ← Go home
                </Link>
            </section>
        </article>
    </Layout>
)

export default PostTemplate;