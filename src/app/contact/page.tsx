import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContentWrapper from "@/components/ContentWrapper";

export const metadata = {
  title: "Contact - kierzniak.dev",
  description: "Get in touch with me for projects, collaborations, or questions",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <ContentWrapper>
        {/* Left Column */}
        <section>
            <h1 className="text-4xl mb-6 font-light">Contact</h1>
            <p className="text-[#7a7a7a]">
              Feel free to reach out for projects, collaborations, or just to say hi.
            </p>
          </section>

          {/* Right Column */}
          <div className="space-y-12">
            <section className="border-t border-[#4a4a4a] pt-8">
              <h2 className="text-2xl mb-6 font-light">Email</h2>
              <a
                href="mailto:hello@kierzniak.dev"
                className="text-[#7a7a7a] hover:text-[#c4d600] transition-colors text-lg"
              >
                hello@kierzniak.dev
              </a>
            </section>

            <section className="border-t border-[#4a4a4a] pt-8">
              <h2 className="text-2xl mb-6 font-light">Social Media</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm text-[#7a7a7a] mb-1">GitHub</h3>
                  <a
                    href="https://github.com/kierzniak"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#7a7a7a] hover:text-[#c4d600] transition-colors"
                  >
                    github.com/kierzniak
                  </a>
                </div>

                <div>
                  <h3 className="text-sm text-[#7a7a7a] mb-1">LinkedIn</h3>
                  <a
                    href="https://linkedin.com/in/kierzniak"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#7a7a7a] hover:text-[#c4d600] transition-colors"
                  >
                    linkedin.com/in/kierzniak
                  </a>
                </div>

                <div>
                  <h3 className="text-sm text-[#7a7a7a] mb-1">X</h3>
                  <a
                    href="https://x.com/kierzniak"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#7a7a7a] hover:text-[#c4d600] transition-colors"
                  >
                    x.com/kierzniak
                  </a>
                </div>
              </div>
            </section>

            <section className="border-t border-[#4a4a4a] pt-8">
              <h2 className="text-2xl mb-6 font-light">Location</h2>
              <p className="text-[#7a7a7a]">Remote</p>
            </section>

            <section className="border-t border-[#4a4a4a] pt-8">
              <h2 className="text-2xl mb-6 font-light">Availability</h2>
              <p className="text-[#7a7a7a]">
                Currently available for freelance projects and consulting work.
              </p>
            </section>
          </div>
        </ContentWrapper>

      <Footer />
    </div>
  );
}