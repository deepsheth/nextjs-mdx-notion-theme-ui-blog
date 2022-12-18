// next.config.mjs
import remarkGfm from "remark-gfm";
import remarkPrism from "remark-prism";
import createMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
};

const withMDX = createMDX({
    extension: /\.mdx?$/,
    options: {
        // Support Github Flavored Markdown in .mdx files
        remarkPlugins: [remarkGfm, remarkPrism],
        rehypePlugins: [],
        providerImportSource: '@mdx-js/react',
    },
});

export default withMDX(nextConfig);