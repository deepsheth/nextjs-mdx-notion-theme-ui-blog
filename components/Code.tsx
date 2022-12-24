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

export const Code = (props: CodeProps) => {
    const { className, children: code, title } = props;
    const hasLineNumbers = true;
    const getLanguageFromClassName = () => {
        return className?.split("language-")[1]?.split(" ")[0];
    }
    const { language = getLanguageFromClassName() } = props;
    let startEndRangesToHighlight: number[] = []
    let countHighlightCommentsRemoved: number = 0

    const isInRange = (start: number, end: number, num: number) => {
        if (num >= start && num <= end) {
            return true
        }
        return false
    }

    const checkRanges = (range: number[], num: number) => {
        for (let i = 0; i < range.length; i += 2) {
            if (isInRange(range[i], range[i + 1], num)) {
                return true
            }
        }
        return false
    }

    const isStartEndHighlighted = (index: number) => {
        return checkRanges(startEndRangesToHighlight, index)
    }

    const isInlineHighlighted = (line: Token[]) => {
        const regex = new RegExp('// highlight-line$')
        for (let token of line) {
            if (regex.test(token.content)) {
                token.content = token.content.replace(regex, '') // remove the highlight-line comment now that we've acted on it
                return true
            }
        }
        return false
    }

    const shouldHighlightLine = (line: Token[], index: number) => {
        return isStartEndHighlighted(index) || isInlineHighlighted(line)
    }

    const findStartAndEndHighlights = (tokens: Token[][]) => {
        const tokensWithoutHighlightComments = tokens.filter((item, index) => {
            const removeLine = item
                .map(({ content }) => {
                    if (content.trim() === '// highlight-start') {
                        /**
                         * Track highlighted lines, including countHighlightCommentsRemoved
                         * so we can keep track of multiple highlight-start and highlight-end blocks.
                         * */
                        startEndRangesToHighlight.push(
                            index - countHighlightCommentsRemoved
                        )
                        countHighlightCommentsRemoved += 1
                        return true
                    }
                    if (content.trim() === '// highlight-end') {
                        /**
                         * Subtract by (countHighlightCommentsRemoved + 1) to account for
                         * the current highlight-end block being removed.
                         * */
                        startEndRangesToHighlight.push(
                            index - (countHighlightCommentsRemoved + 1)
                        )
                        countHighlightCommentsRemoved += 1
                        return true
                    }
                })
                .filter(Boolean)[0]
            if (!removeLine) {
                return item
            }
        })
        return tokensWithoutHighlightComments
    }

    if (!language) {
        // Inline <code> block
        return (
            <code className={className}>{code}</code>
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
            {({ className, style, tokens, getLineProps, getTokenProps }) => {
                const tokensWithoutHighlightComments = findStartAndEndHighlights(tokens)

                return (
                    <React.Fragment>
                        {title && (
                            <div className="code-title">
                                <div>{title}</div>
                            </div>
                        )}
                        <div className="gatsby-highlight" data-language={language}>
                            <pre className={className} style={style} data-linenumber={hasLineNumbers}>
                                {tokensWithoutHighlightComments.map((line, i) => {
                                    const lineProps = getLineProps({ line, key: i });
                                    if (shouldHighlightLine(line, i)) {
                                        // theme-ui docs use 'highlight' not 'highlight-line'
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
                );
            }}
        </Highlight>
    );
};

export default Code;