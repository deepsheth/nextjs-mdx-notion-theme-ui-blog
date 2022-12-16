import { Heading, Divider, Text } from "theme-ui";
import React, { Fragment } from "react";
import Layout from "../Layout";
import Head from "next/head";
import Link from "next/link";
import { Frontmatter } from "../../types/frontmatter";

type MarkdownPostTemplateProps = {
    frontmatter: Frontmatter
    children: React.ReactNode
}

const MarkdownPostTemplate: React.FC<MarkdownPostTemplateProps> = ({ frontmatter, children }) => {

    const { title, date, slug } = frontmatter;
    return (<Layout>
        <Head>
            <title>{title}</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <article>
            <Heading>
                {title}
            </Heading>

            <p sx={{ color: "accent" }}>
                <Text variant="mono">
                    <time>{date}</time>
                </Text>
            </p>

            <Divider variant="dividers.pageHeading" />

            <section>
                {children}
            </section>
        </article>
    </Layout>
    );
}

export default MarkdownPostTemplate;