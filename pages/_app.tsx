import React from "react";
import "../styles/globals.css";
import type { Theme } from 'theme-ui'
import { ThemeProvider } from 'theme-ui'
import themePolaroid from "../styles/theme";

export const theme: Theme = {
  fonts: {
    body: 'system-ui, sans-serif',
    heading: '"Avenir Next", sans-serif',
    monospace: 'Menlo, monospace',
  },
  colors: {
    text: '#000',
    background: '#fff',
    primary: '#33e',
  },
}

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={themePolaroid}>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp;
