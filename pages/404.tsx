import React from "react";
import { Heading } from "theme-ui";
import { MarkdownPostTemplate } from "../components/PostTemplate";

export default function Custom404() {
    return <MarkdownPostTemplate
        frontmatter={{
            title: "🚨 Error 404 🚨",
            date: "",
            slug: "404"
        }}
    >
        <Heading>Page does not exist</Heading>
    </MarkdownPostTemplate>
}