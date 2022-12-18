import {
  MDXProvider,
  useMDXComponents
} from '@mdx-js/react';
import { useThemedStylesWithMdx } from '@theme-ui/mdx';
import React from "react";
import { ThemeProvider } from 'theme-ui';
import "../styles/globals.css";
import themePolaroid from "../styles/theme";

function MyApp({ Component, pageProps }) {
  const componentsWithStyles = useThemedStylesWithMdx(
    useMDXComponents()
  );


  return (
    <ThemeProvider theme={themePolaroid}>
      <MDXProvider components={componentsWithStyles}>
        <Component {...pageProps} />
      </MDXProvider>
    </ThemeProvider>
  )
}

export default MyApp;
