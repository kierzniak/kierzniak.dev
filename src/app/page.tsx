import Link from "next/link";
import { getRecentPosts } from "@/lib/blog";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContentWrapper from "@/components/ContentWrapper";

export default function Home() {
  const recentPosts = getRecentPosts(3);
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <ContentWrapper>
        {/* Left Column - Hero Section */}
        <section>
          <h1 className="text-4xl mb-6 font-light">
            Full Stack Web Developer
          </h1>
          <div className="text-[#a3a3a3] space-y-4">
            <p>
              Building scalable web applications with modern technologies.
              Passionate about clean code, user experience, and continuous learning.
            </p>
            <p>
              Specialized in React, Node.js, TypeScript, and cloud infrastructure.
              Always exploring new tools and best practices to deliver high-quality solutions.
            </p>
          </div>
        </section>

        {/* Right Column - Recent Posts Section */}
        <section>
          <h2 className="text-2xl mb-8 font-light">Recent Posts</h2>
          <div className="space-y-8">
            {recentPosts.map((post, index) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className={`block transition-colors group ${index > 0 ? 'border-t border-[#333333] pt-6' : ''}`}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-normal group-hover:text-[#00ffe2] transition-colors">
                    {post.title}
                  </h3>
                  <span className="text-sm text-[#666666] whitespace-nowrap ml-4">
                    {post.date}
                  </span>
                </div>
                <p className="text-[#a3a3a3] text-sm">
                  {post.excerpt}
                </p>
              </Link>
            ))}
          </div>

          <Link
            href="/blog"
            className="inline-block mt-12 text-sm hover:text-[#00ffe2] transition-colors"
          >
            View all posts →
          </Link>
        </section>
      </ContentWrapper>

      <Footer />
    </div>
  );
}
