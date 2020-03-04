import React, { useEffect, useRef } from 'react';
import hljs from 'highlight.js/lib/highlight';

type CodeBlockProps = {
  value: string;
  language?: string;
};

// Code Highlight with React Hooks
// references:
// https://itiskj.hatenablog.com/entry/2019/02/25/205247
// https://ja.reactjs.org/docs/hooks-effect.html
const CodeBlock: React.FC<CodeBlockProps> = ({ value, language }) => {
  const codeEl = useRef<HTMLHtmlElement>(null);

  useEffect(() => {
    hljs.highlightBlock(codeEl.current);
  });

  return (
    <pre>
      <code ref={codeEl} className={language ? `language-${language}` : ''}>
        {value}
      </code>
    </pre>
  );
};

export default CodeBlock;
