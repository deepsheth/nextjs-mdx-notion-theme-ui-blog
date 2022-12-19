import Highlight, { defaultProps } from "prism-react-renderer";
import React from "react";
// import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live";
import theme from "prism-react-renderer/themes/nightOwl";
// import { Language } from "../types/code";

export type CodeProps = {
    codeString: string;
    language: Language;
    noLineNumbers?: boolean;
    metastring?: string;
    [key: string]: any;
};

const RE = /{([\d,-]+)}/;

const calculateLinesToHighlight = (meta: string) => {
    if (!RE.test(meta)) {
        return () => false;
    }
    const lineNumbers = RE.exec(meta)![1]
        .split(`,`)
        .map((v) => v.split(`-`).map((x) => parseInt(x, 10)));
    return (index: number) => {
        const lineNumber = index + 1;
        const inRange = lineNumbers.some(([start, end]) =>
            end ? lineNumber >= start && lineNumber <= end : lineNumber === start
        );
        return inRange;
    };
};

export const Code = ({
    codeString,
    noLineNumbers = false,
    className: blockClassName, // blockClassName can be in the format 'language-<language> <themeui injected css class>'
    metastring = ``,
    hasLineNumbers = true,
    title,
    children: code,
    ...props
}: CodeProps) => {
    const shouldHighlightLine = calculateLinesToHighlight(metastring);
    const getLanguageFromClassName = () => {
        return blockClassName?.split("language-")[1]?.split(" ")[0];
    }
    const { language = getLanguageFromClassName() } = props;

    if (!language) {
        // Inline <code> block
        return (
            <code className={blockClassName}>{code}</code>
        )
    }
    if (props[`react-live`]) {
        return null;
        // (
        // <LiveProvider code={codeString} noInline theme={theme}>
        //     <LiveEditor data-name="live-editor" />
        //     <LiveError />
        //     <LivePreview data-name="live-preview" />
        // </LiveProvider>
        // );
    }
    return (
        <Highlight {...defaultProps} code={code} language={language} theme={theme}>
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
                <React.Fragment>
                    {title && (
                        <div className="code-title">
                            <div>{title}</div>
                        </div>
                    )}
                    <div className="gatsby-highlight" data-language={language}>
                        <pre className={className} style={style} data-linenumber={hasLineNumbers}>
                            {tokens.map((line, i) => {
                                const lineProps = getLineProps({ line, key: i });

                                if (shouldHighlightLine(i)) {
                                    lineProps.className = `${lineProps.className} highlight-line`;
                                }

                                return (
                                    // eslint-disable-next-line react/jsx-key
                                    <div {...lineProps}>
                                        {hasLineNumbers && <span className="line-number-style">{i + 1}</span>}
                                        {line.map((token, key) => (
                                            // eslint-disable-next-line react/jsx-key
                                            <span {...getTokenProps({ token, key })} />
                                        ))}
                                    </div>
                                );
                            })}
                        </pre>
                    </div>
                </React.Fragment>
            )}
        </Highlight>
    );
};

export default Code;