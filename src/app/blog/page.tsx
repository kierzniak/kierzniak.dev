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
          <p className="text-[#7a7a7a]">
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
                className={`block transition-colors group ${index > 0 ? 'border-t border-[#4a4a4a] pt-6' : ''}`}
              >
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-xl font-normal group-hover:text-[#c4d600] transition-colors">
                    {post.title}
                  </h2>
                  <span className="text-sm text-[#7a7a7a] whitespace-nowrap ml-4">
                    {post.date}
                  </span>
                </div>
                <p className="text-[#7a7a7a] text-sm mb-3">
                  {post.excerpt}
                </p>
                {post.tags && (
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs text-[#7a7a7a] border border-[#4a4a4a] px-2 py-1"
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