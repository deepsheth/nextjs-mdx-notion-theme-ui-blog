import { Client } from "@notionhq/client";
import { PageObjectResponse, PartialPageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

type Post = (PageObjectResponse | PartialPageObjectResponse);

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

export const getDatabase = async (databaseId) => {
  const response = await notion.databases.query({
    database_id: databaseId,
  });
  return response.results;
};

export const getPage = async (pageId) => {
  const response = await notion.pages.retrieve({ page_id: pageId });
  return response;
};

export const getBlocks = async (blockId) => {
  const blocks = [];
  let cursor;
  while (true) {
    const { results, next_cursor } = await notion.blocks.children.list({
      start_cursor: cursor,
      block_id: blockId,
    });
    blocks.push(...results);
    if (!next_cursor) {
      break;
    }
    cursor = next_cursor;
  }
  return blocks;
};

export const getPosts = async (databaseId) => {
  const pages = await getDatabase(databaseId);
  return pages.filter((page) => isPublished(page));
};

const isPublished = (page) => {
  return page.properties.Status.status.name === "Published";
};

export const getTags = (page) => {
  return page.properties.Tags.multi_select.map((tag) => tag.name);
}

export const getReadTime = (page) => {
  return page.properties["Read Time"].rich_text[0].plain_text;
}

export const getDate = (page) => {
  return new Date(page.last_edited_time).toLocaleString(
    "en-US",
    {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }
  );
}