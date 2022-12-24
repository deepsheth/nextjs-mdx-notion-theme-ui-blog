import { useTheme } from "@emotion/react";
import Head from "next/head";
import { HomePageSlides } from "../components/content/HomePageSlides";
import { Layout } from "../components/Layout";
import { databaseId, FAVICON_PATH } from "../constants/global";
// import { getAllPosts } from "../utils/blog";
import { getPosts } from "../utils/notion";


export default function Home({ posts }) {
  const theme = useTheme();

  return (
    <div>
      <Head>
        <title>Notion Next.js blog</title>
        <link rel="icon" href={FAVICON_PATH} />
      </Head>

      <Layout hasTransparentHeader hasFullWidthContainer hasFooter={false}>
        <HomePageSlides posts={posts} />
      </Layout>
    </div>
  );
}

export const getStaticProps = async () => {
  const database = await getPosts(databaseId);

  return {
    props: {
      posts: database,
    },
    revalidate: 1,
  };
};
