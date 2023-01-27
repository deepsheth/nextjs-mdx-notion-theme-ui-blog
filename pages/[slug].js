import { useRouter } from 'next/router';
import { Link, Spinner } from "theme-ui";
import { MarkdownPostTemplate, NotionPostTemplate } from "../components/PostTemplate";
import { databaseId } from "../constants/global";
import { getPostBySlug, getPostSlugs } from "../utils/blog";
import markdownToHtml from "../utils/markdownToHtml";
import { getBlocks, getDatabase, getDate, getPage } from "../utils/notion";
import { renderBlock } from "../utils/renderBlock";
import styles from "./post.module.css";
import Head from 'next/head'
import Error from 'next/error'

export const NotionTextBlock = ({ text }) => {
  if (!text) {
    return null;
  }
  return text.map((value) => {
    const {
      annotations: { bold, code, color, italic, strikethrough, underline },
      text,
    } = value;

    if (code) {
      return (
        <code>
          {text.link ? <Link href={text.link.url}>{text.content}</Link> : text.content}
        </code>
      )
    }
    return (
      <span
        className={[
          bold ? styles.bold : "",
          code ? styles.code : "",
          italic ? styles.italic : "",
          strikethrough ? styles.strikethrough : "",
          underline ? styles.underline : "",
        ].join(" ")}
        style={color !== "default" ? { color } : {}}
      >
        {text.link ? <Link href={text.link.url}>{text.content}</Link> : text.content}
      </span>
    );
  });
};

export const renderNestedList = (block) => {
  const { type } = block;
  const value = block[type];
  if (!value) return null;

  const isNumberedList = value.children[0].type === "numbered_list_item";

  if (isNumberedList) {
    return <ol>{value.children.map((block) => renderBlock(block))}</ol>;
  }
  return <ul>{value.children.map((block) => renderBlock(block))}</ul>;
};

export default function Post({ isNotionPage, page, blocks, children }) {
  const router = useRouter()

  if (router.isFallback) {
    return <Spinner />;
  }

  // if (!router.isFallback && !page?.slug) {
  //   return <Error statusCode={404} />
  // }
  if (!isNotionPage) {
    const frontmatter = {
      title: page.title,
      slug: page.slug,
      date: page.date,
    }
    return (
      <>
        <Head>
          <title>
            {page.title}
          </title>
          {/* <meta property="og:image" content={post.ogImage.url} /> */}
        </Head>
        <MarkdownPostTemplate frontmatter={frontmatter}>
          {page.content}
        </MarkdownPostTemplate>
      </>
    )
  }


  return (
    <NotionPostTemplate page={page} blocks={blocks} date={getDate(page)}></NotionPostTemplate>
  );
}

export const getStaticPaths = async () => {
  const database = await getDatabase(databaseId);

  const notionSlugs = database.map((page) => {
    const slug = page.properties["Slug"].rich_text[0]?.plain_text;
    return { params: { slug: slug || page.id, id: page.id, isNotionPage: true } };
  });
  const mdxSlugs = getPostSlugs().map((slug) => ({ params: { slug: slug, isNotionPage: false } }))
  return {
    paths: [...notionSlugs, ...mdxSlugs],
    fallback: true,
  };
};

export const getStaticProps = async (context) => {
  const { slug } = context.params;
  const database = await getDatabase(databaseId);
  // If a notion id is provided, use that to get the page
  // If a notion slug is provided, get the id from the database and use that to get the page
  // If a mdx slug is provided, get the page from the mdx file
  const notionPages = database.map((page) => {
    const slug = page.properties["Slug"].rich_text[0]?.plain_text;
    return { slug: slug || page.id, id: page.id, isNotionPage: true };
  });

  // See if the slug belongs to a notion page
  const notionPage = notionPages.find((pageData) => pageData.id === slug || pageData.slug === slug)
  const isNotionPage = notionPage?.isNotionPage;


  if (isNotionPage) {
    const page = await getPage(notionPage ? notionPage.id : slug);
    const blocks = await getBlocks(notionPage.id);
    // Retrieve block children for nested blocks (one level deep), for example toggle blocks
    // https://developers.notion.com/docs/working-with-page-content#reading-nested-blocks
    const childBlocks = await Promise.all(
      blocks
        .filter((block) => block.has_children)
        .map(async (block) => {
          return {
            id: block.id,
            children: await getBlocks(block.id),
          };
        })
    );
    const blocksWithChildren = blocks.map((block) => {
      // Add child blocks if the block should contain children but none exists
      if (block.has_children && !block[block.type].children) {
        block[block.type]["children"] = childBlocks.find(
          (x) => x.id === block.id
        )?.children;
      }
      return block;
    });
    return {
      props: {
        ...notionPage,
        page,
        blocks: blocksWithChildren,
      },
      revalidate: 1,
    };
  } else {
    /**
     * @see https://github.com/vercel/next.js/blob/canary/examples/blog-starter/pages/posts/[slug].tsx#L62
     */
    const post = getPostBySlug(slug, ["title", "slug", "content"])
    const content = await markdownToHtml(post.content || '')

    return {
      props: {
        isNotionPage: false,
        page: post,
        content,
      },
      revalidate: 1,
    };
  }

};