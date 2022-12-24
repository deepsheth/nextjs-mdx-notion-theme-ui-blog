import {
    MDXProvider,
    useMDXComponents
} from '@mdx-js/react';
import { useThemedStylesWithMdx } from '@theme-ui/mdx';
import Head from "next/head";
import React from "react";
import { Divider, Heading, Text, ThemeProvider } from "theme-ui";
import { FAVICON_PATH } from '../../constants/global';
import themePolaroid from '../../styles/theme';
import { Frontmatter } from "../../types/frontmatter";
import Layout from "../Layout";


type MarkdownPostTemplateProps = {
    frontmatter: Frontmatter
    children: React.ReactNode
}

const MarkdownPostTemplate: React.FC<MarkdownPostTemplateProps> = ({ frontmatter, children }) => {
    const { title, date, slug } = frontmatter;
    const componentsWithStyles = useThemedStylesWithMdx(
        useMDXComponents()
    );

    return (
        <ThemeProvider theme={themePolaroid}>
            <MDXProvider components={componentsWithStyles}>
                <Layout>
                    <Head>
                        <title>{title}</title>
                        <link rel="icon" href={FAVICON_PATH} />
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
            </MDXProvider>
        </ThemeProvider>
    );
}

export default MarkdownPostTemplate;