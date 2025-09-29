import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContentWrapper from "@/components/ContentWrapper";

export const metadata = {
  title: "Blog - kierzniak.dev",
  description: "Thoughts on web development, programming, and technology",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <ContentWrapper>
        {/* Left Column - Header */}
        <section>
          <h1 className="text-4xl mb-6 font-light">Blog</h1>
          <p className="text-[#a3a3a3]">
            Thoughts on web development, programming, and technology.
          </p>
        </section>

        {/* Right Column - Blog Posts */}
        <section>
          <div className="space-y-8">
            {posts.map((post, index) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className={`block transition-colors group ${index > 0 ? 'border-t border-[#333333] pt-6' : ''}`}
              >
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-xl font-normal group-hover:text-[#E1F748] transition-colors">
                    {post.title}
                  </h2>
                  <span className="text-sm text-[#666666] whitespace-nowrap ml-4">
                    {post.date}
                  </span>
                </div>
                <p className="text-[#a3a3a3] text-sm mb-3">
                  {post.excerpt}
                </p>
                {post.tags && (
                  <div className="flex gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs text-[#666666] border border-[#333333] px-2 py-1"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </Link>
            ))}
          </div>
        </section>
      </ContentWrapper>

      <Footer />
    </div>
  );
}