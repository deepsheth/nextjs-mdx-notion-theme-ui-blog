import { Frontmatter } from './../types/frontmatter';
import { MDX_SLUG } from '../constants/global';
import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'

/**
 * @see https://github.com/vercel/next.js/blob/canary/examples/blog-starter/lib/api.ts
 */

const postsDirectory = join(process.cwd(), "posts")

/**
 * @example ['theme-preview.mdx', 'hello-world.mdx']
 * @returns {string[]}
 */
export function getPostSlugs() {
  return fs.readdirSync(postsDirectory)
}

const getFrontmatter = (path: string) => {
  const fileContents = fs.readFileSync(path, 'utf8')
  return matter(fileContents)
}

type Fields = Array<keyof Frontmatter | keyof matter.GrayMatterFile<string>>;

export function getPostBySlug(slug: string, fields: Fields = []) {
  const realSlug = slug.replace(/\.mdx$/, '')
  const fullPath = join(postsDirectory, `${realSlug}.mdx`)
  const { data, content } = getFrontmatter(fullPath)
  const items: Partial<Frontmatter> = {};

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = realSlug
    }
    if (field === 'content') {
      items[field] = content
    }

    if (typeof data[field] !== 'undefined') {
      items[field] = data[field]
    }
  })

  return items
}

/**
 * 
 * @param fields Frontmatter fields to return
 * @returns 
 */
export function getAllPosts(fields: Fields = []) {
  const slugs = getPostSlugs()
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields))
  // sort posts by date in descending order
  // .sort((post1, post2) => (post1.date > post2.date ? -1 : 1))
  return posts
}