import { MDX_SLUG, BLOG_PAGE_SLUG, ABOUT_PAGE_SLUG } from './global';
import { HeaderNavItem } from "../components/Header/HeaderNav";
import { HeaderMenuItem } from "../components/Header/HeaderMenu";
export const headerNavItems: HeaderNavItem[] = [
    {
        label: "Blog",
        slug: BLOG_PAGE_SLUG,
        isVisibleMobile: true,
        isVisibleTablet: true,
    },
    {
        label: "About",
        slug: ABOUT_PAGE_SLUG,
    },
    {
        label: "Theme Preview",
        slug: `${MDX_SLUG}/theme-preview`,
        isVisibleTablet: true,
    },
    {
        label: "GitHub",
        href: "https://github.com/shetharp/gatsby-theme-polaroid",
    },
];

export const headerMenuItems: HeaderMenuItem[] = [
    {
        label: "Home",
        slug: "/",
    },
    {
        label: "Blog",
        slug: BLOG_PAGE_SLUG,
        isVisibleTablet: false,
    },
    {
        label: "Tags",
        slug: "/tags",
    },
    {
        label: "About",
        slug: ABOUT_PAGE_SLUG,
    },
    {
        label: "Theme Preview",
        slug: `${MDX_SLUG}/theme-preview`,
        isVisibleLaptop: false,
    },
    {
        label: "Readme",
        slug: "/readme",
    },
    {
        label: "GitHub",
        href: "https://github.com/shetharp/gatsby-theme-polaroid",
    },
    {
        label: "Twitter",
        href: "https://twitter.com/shetharp",
    },
    {
        label: "Instagram",
        href: "https://instagram.com/shetharp",
    },
    {
        label: "Contact",
        href: "https://arpitsheth.com",
    },
];