import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContentWrapper from "@/components/ContentWrapper";

export const metadata = {
  title: "About - kierzniak.dev",
  description: "Full Stack Web Developer specializing in modern web technologies",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <ContentWrapper>
        {/* Left Column */}
        <div className="space-y-16">
            <section>
              <h1 className="text-4xl mb-6 font-light">About</h1>
              <h2 className="text-2xl mb-6 font-light">Background</h2>
              <div className="text-[#a3a3a3] space-y-4">
                <p>
                  I&apos;m a full stack web developer with a passion for building clean,
                  efficient, and scalable applications. I specialize in modern web
                  technologies and enjoy working on both frontend and backend challenges.
                </p>
                <p>
                  My approach to development focuses on writing maintainable code,
                  following best practices, and continuously learning new technologies
                  to stay current in the rapidly evolving web development landscape.
                </p>
              </div>
            </section>

            <section className="border-t border-[#333333] pt-16">
              <h2 className="text-2xl mb-6 font-light">Tech Stack</h2>

              <div className="space-y-8">
                <div>
                  <h3 className="text-lg mb-3 text-white">Frontend</h3>
                  <div className="flex flex-wrap gap-2">
                    {["React", "Next.js", "TypeScript", "Tailwind CSS", "Vue.js"].map((tech) => (
                      <span
                        key={tech}
                        className="text-sm text-[#a3a3a3] border border-[#333333] px-3 py-1"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg mb-3 text-white">Backend</h3>
                  <div className="flex flex-wrap gap-2">
                    {["Node.js", "Express", "NestJS", "PostgreSQL", "MongoDB", "Redis"].map((tech) => (
                      <span
                        key={tech}
                        className="text-sm text-[#a3a3a3] border border-[#333333] px-3 py-1"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg mb-3 text-white">DevOps & Tools</h3>
                  <div className="flex flex-wrap gap-2">
                    {["Docker", "AWS", "GitHub Actions", "Git", "Linux"].map((tech) => (
                      <span
                        key={tech}
                        className="text-sm text-[#a3a3a3] border border-[#333333] px-3 py-1"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column */}
          <section>
            <h2 className="text-2xl mb-8 font-light">What I Do</h2>
            <div className="space-y-8">
              <div className="border-t border-[#333333] pt-6">
                <h3 className="text-lg mb-2 text-white">Web Application Development</h3>
                <p className="text-[#a3a3a3] text-sm">
                  Building modern, responsive web applications using the latest
                  frameworks and best practices.
                </p>
              </div>

              <div className="border-t border-[#333333] pt-6">
                <h3 className="text-lg mb-2 text-white">API Design & Development</h3>
                <p className="text-[#a3a3a3] text-sm">
                  Creating RESTful and GraphQL APIs that are scalable, secure,
                  and well-documented.
                </p>
              </div>

              <div className="border-t border-[#333333] pt-6">
                <h3 className="text-lg mb-2 text-white">System Architecture</h3>
                <p className="text-[#a3a3a3] text-sm">
                  Designing and implementing system architectures that support
                  business growth and technical requirements.
                </p>
              </div>

              <div className="border-t border-[#333333] pt-6">
                <h3 className="text-lg mb-2 text-white">Performance Optimization</h3>
                <p className="text-[#a3a3a3] text-sm">
                  Analyzing and improving application performance for better
                  user experience and resource efficiency.
                </p>
              </div>
            </div>
          </section>
        </ContentWrapper>

      <Footer />
    </div>
  );
}