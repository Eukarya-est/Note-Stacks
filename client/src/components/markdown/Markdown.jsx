import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css'; // Import KaTeX styles
import remarkGfm from 'remark-gfm';

function MarkdownWithKatex({ markdownContent }) {
  return (
    <ReactMarkdown
      children={markdownContent}
      remarkPlugins={[remarkMath, remarkGfm]}
      rehypePlugins={[rehypeKatex]}
    />
  );
}

export default MarkdownWithKatex;