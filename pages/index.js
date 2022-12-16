import Head from "next/head";
import Link from "next/link";
import { getDatabase } from "../utils/notion";
import { NotionTextBlock } from "./[id].js";
import styles from "./index.module.css";
import { HomePageSlides } from "../components/content/HomePageSlides";
import { Layout } from "../components/Layout";
import { databaseId } from "../constants/global";


export default function Home({ posts }) {

  return (
    <div>
      <Head>
        <title>Notion Next.js blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout hasTransparentHeader hasFullWidthContainer hasFooter={false}>
        <HomePageSlides posts={posts} />
      </Layout>
    </div>
  );
}

export const getStaticProps = async () => {
  const database = await getDatabase(databaseId);

  return {
    props: {
      posts: database,
    },
    revalidate: 1,
  };
};
