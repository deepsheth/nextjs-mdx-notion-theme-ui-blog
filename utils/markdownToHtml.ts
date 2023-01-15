import fs from 'node:fs/promises'
import { compile } from '@mdx-js/mdx'
import remarkGfm from 'remark-gfm'

/**
 * @see https://github.com/vercel/next.js/blob/canary/examples/blog-starter/lib/markdownToHtml.ts
 * @see https://mdxjs.com/guides/gfm/
 * @param markdown 
 * @returns jsx/html
 */
export default async function markdownToHtml(markdown: string) {
    const result = await compile(markdown, { remarkPlugins: [remarkGfm] })
    return result.toString()
}