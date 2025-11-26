import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug, getAllPosts } from "@/lib/blog";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { MDXRemote } from "next-mdx-remote/rsc";

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: `${post.title} - kierzniak.dev`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Main Content */}
      <main className="px-8 py-8 lg:py-16 max-w-4xl mx-auto flex-1">
        <Link
          href="/blog"
          className="inline-block text-sm text-[#a3a3a3] hover:text-[#00ffe2] transition-colors mb-8"
        >
          ← Back to blog
        </Link>

        <article>
          <header className="mb-12">
            <h1 className="text-4xl mb-4 font-light">{post.title}</h1>
            <div className="flex gap-4 text-sm text-[#666666]">
              <div className="flex-shrink-0">
                <time dateTime={post.date}>{post.date}</time>
              </div>
              {post.tags && (
                <>
                  <div>·</div>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span key={tag}>#{tag}</span>
                    ))}
                  </div>
                </>
              )}
            </div>
          </header>

          <div className="prose prose-invert max-w-none">
            <MDXRemote
              source={post.content}
              components={{
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
                strong: ({ children }) => (
                  <strong className="text-white font-semibold">{children}</strong>
                ),
              }}
            />
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}