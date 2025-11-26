import type { MDXComponents } from 'mdx/types'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="text-3xl font-light mb-6 text-white">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-light mb-4 mt-8 text-white">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-light mb-3 mt-6 text-white">{children}</h3>
    ),
    p: ({ children }) => (
      <p className="text-[#a3a3a3] mb-4 leading-relaxed">{children}</p>
    ),
    ul: ({ children }) => (
      <ul className="list-disc list-inside text-[#a3a3a3] mb-4 space-y-2">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal list-inside text-[#a3a3a3] mb-4 space-y-2">{children}</ol>
    ),
    li: ({ children }) => (
      <li className="text-[#a3a3a3]">{children}</li>
    ),
    a: ({ href, children }) => (
      <a href={href} className="text-[#00ffe2] hover:underline" target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ),
    code: ({ children }) => (
      <code className="bg-[#0a0a0a] border border-[#333333] px-2 py-1 text-sm text-[#00ffe2]">
        {children}
      </code>
    ),
    pre: ({ children }) => (
      <pre className="bg-[#0a0a0a] border border-[#333333] p-4 mb-4 overflow-x-auto">
        {children}
      </pre>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-[#333333] pl-4 italic text-[#a3a3a3] mb-4">
        {children}
      </blockquote>
    ),
    ...components,
  }
}