import { HeaderNavItem } from "./HeaderNav";
import { HeaderMenuItem } from "./HeaderMenu";
export const headerNavItems: HeaderNavItem[] = [
    {
        label: "Blog",
        slug: "/blog",
        isVisibleMobile: true,
        isVisibleTablet: true,
    },
    {
        label: "About",
        slug: "/about",
    },
    {
        label: "Theme Preview",
        slug: "/theme-preview",
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
        slug: "/blog",
        isVisibleTablet: false,
    },
    {
        label: "Tags",
        slug: "/tags",
    },
    {
        label: "About",
        slug: "/about",
    },
    {
        label: "Theme Preview",
        slug: "/theme-preview",
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