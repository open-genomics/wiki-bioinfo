/**
 * 把 Sätteri 解析出的 math/inlineMath 节点渲染为 KaTeX HTML。
 *
 * Sätteri 在 MDX 解析表达式之前识别数学语法，因此公式中的 `{...}`、
 * `\begin{cases}` 等不会再被 MDX 当作 JSX 表达式。插件返回 raw HTML，
 * 并关闭 MDX 表达式重解析，避免 KaTeX 输出中的花括号被误判。
 */
import katex from 'katex';
import { defineMdastPlugin } from 'satteri';

const ESCAPES = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
};

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (character) => ESCAPES[character] ?? character);
}

function preserveBackslashes(html) {
  return html.replace(/\\/g, '\\\\');
}

export function satteriKatex(options = {}) {
  const katexOptions = {
    output: 'htmlAndMathml',
    throwOnError: true,
    ...options,
  };

  const render = (tex, displayMode) => {
    try {
      const rendered = katex.renderToString(tex, { ...katexOptions, displayMode });
      return { raw: preserveBackslashes(rendered), mdxExpressions: false };
    } catch (error) {
      return { raw: preserveBackslashes(escapeHtml(String(error))), mdxExpressions: false };
    }
  };

  return defineMdastPlugin({
    name: 'satteri-katex',
    math(node) {
      return render(node.value, true);
    },
    inlineMath(node) {
      return render(node.value, false);
    },
  });
}
