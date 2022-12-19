import {
  MDXProvider,
  useMDXComponents
} from '@mdx-js/react';
import { useThemedStylesWithMdx } from '@theme-ui/mdx';
import React from "react";
import { ThemeProvider } from 'theme-ui';
import "../styles/globals.css";
import themePolaroid from "../styles/theme";
import Prism from '@theme-ui/prism'
import Code from '../components/Code';

function MyApp({ Component, pageProps }) {
  const components = {
    pre: ({ children }) => <>{children}</>,
    code: ({ children, ...props }) => <Code {...props}>{children}</Code>
  }
  /**
   * @see https://mdxjs.com/table-of-components/
   * 
   */
  const componentsWithStyles = useThemedStylesWithMdx(
    useMDXComponents(components)
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
