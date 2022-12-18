import React from "react";
import { jsx } from "theme-ui";
import { Post } from "../../types/post";
import Slide from "../Slide";
import Link from "next/link";
import { LatestPostSlide } from "./LatestPostSlide";
import { SlideTitle } from "../Slide/SlideTitle";
import { SlideDescription } from "../Slide/SlideDescription";
import { SlideButton } from "../Slide/SlideButton";
import { FooterLogo } from "../Footer/FooterLogo";
import { databaseId } from "../../constants/global";
import { PageObjectResponse, PartialPageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

export type SlidesProps = {
    posts: (PageObjectResponse | PartialPageObjectResponse)[];
};

/**
 * Shadow this file to add your own Slides to the homepage.
 * You can also split individual slides into their own file and import them here.
 */
export const HomePageSlides: React.FC<SlidesProps> = (props) => {
    const { posts } = props;

    return (
        <main>
            {/**
                * INTRO
            */}
            <Slide
                id="intro"
                title="Smile for the camera! And say hello to Polaroid."
                description={
                    <p>
                        Polaroid is a <em>photography-focused</em> React theme for building portfolio websites. The NextJS theme integration with Notion for blogging.
                        The Gatsby version supports an MDX blog with tags/categories, syntax-highlighted code blocks, Theme UI for dark mode, and Typescript.
                    </p>
                }
                imgSrc="/content/images/polaroid-bg.jpg"
                overlayColor="veronica.dark"
                highlightColor="primary"
                isColorful
                isBorderless
                hasScrollIndicator
            />

            {/**
                * PREVIEW
            */}
            <Slide
                id="preview"
                title="A picture is worth  a thousand words. A demo is a million more."
                description={
                    <React.Fragment>
                        <p>
                            You&apos;re looking at Polaroid&apos;s homepage. It&apos;s a great place to put together a{" "}
                            <em>photo-rich portfolio</em>. Take a look at the <Link href="/theme-preview">Theme Preview</Link> page to
                            see the other components that come with the theme.
                        </p>
                        <p sx={{ marginBottom: 0 }}>
                            If you like what you see, get started with the <Link href="/readme">Readme</Link>.
                        </p>
                    </React.Fragment>
                }
                // fluid={slideImages.imgPreview.childImageSharp.fluid}
                imgSrc="/content/images/kite-festival-1.jpg"
                overlayColor="primary"
                highlightColor="accent"
                isExpanded
                imagePosition="0% 0%"
                button={{ text: "Theme Preview", href: "/theme-preview" }}
            />

            {/**
                * WORK
            */}
            <Slide
                id="work"
                title="Savor the moment slowly, for it may slip away too soon."
                description={
                    <React.Fragment>
                        <p>I went down yesterday to the <a href="#!">Piraeus with Glaucon</a> the son of Ariston, that I might offer up
                            my prayers to the goddess (Bendis, the <Link href="#">Thracian Artemis.</Link>); and also because{" "}
                            <em>I wanted to see</em> in what manner they would celebrate the festival, which was a new thing.
                        </p>
                    </React.Fragment>
                }
                // fluid={slideImages.imgWork.childImageSharp.fluid}
                overlayColor="secondary"
                highlightColor="saffron.dark"
                isExpanded
                imagePosition="0% 0%"
                button={{ text: "Get started", href: "/readme" }}
            />

            {/**
             * PROJECT
            */}
            <Slide
                id="project"
                title="What if you replaced the noise of becoming with the silence of being?"
                description={
                    <React.Fragment>
                        <p>
                            Emma Woodhouse, handsome, clever, and rich, with a comfortable home and happy disposition, seemed to unite
                            some of the best <em>blessings of existence</em>; and had lived nearly{" "}
                            <a href="https://www.gutenberg.org/files/158/158-h/158-h.htm#link2HCH0001">twenty-one years</a> in the world
                            with very little to distress or vex her.
                        </p>
                    </React.Fragment>
                }
                overlayColor="mediumslateblue"
                highlightColor="mediumorchid"
                isColorful
                isExpanded
                hasDistinctBorder
            />

            {/**
            * BLOG
        */}
            <LatestPostSlide id="blog" backgroundColor="mediumblue" overlayColor="primary" posts={posts}>
                <SlideTitle>More</SlideTitle>
                <SlideDescription>
                    <p>
                        This is an example of a blog powered by Notion. Next.js fetches blog information from the Notion
                        API. The data comes from a table in{" "}
                        <a href={`https://www.notion.so/${databaseId}`}> this Notion page</a>.
                    </p>
                    <p>
                        Optionally, you can read about the details of the Notion API integration in{" "}
                        <a href="https://samuelkraft.com/blog/building-a-notion-blog-with-public-api">
                            this blogpost
                        </a>.{" "}
                    </p>
                </SlideDescription>
                <p>
                    <SlideButton
                        href="https://github.com/shetharp/gatsby-theme-polaroid"
                        sx={{ "&&&": { width: ["100%", null, "75%", "66.667%", "75%", null, "66.667%", null, "50%"] } }}
                    >
                        View on GitHub
                    </SlideButton>
                </p>
                <SlideDescription>
                    <p>
                        <br />
                        &mdash;
                    </p>
                    <p>
                        <FooterLogo />
                        <br />
                        Polaroid Theme
                        <br />
                        By <a href="https://arpitsheth.com/">Arpit Sheth</a>
                    </p>
                </SlideDescription>
            </LatestPostSlide>
        </main>
    );
};
