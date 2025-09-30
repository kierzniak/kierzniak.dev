export default function Footer() {
  return (
    <footer className="w-full mt-auto">
      <div className="mx-8 border-t border-[#333333]">
        <div className="w-full max-w-7xl px-8 py-8 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <div className="text-sm text-[#666666]">
            © 2025 kierzniak.dev
          </div>
          <nav className="flex gap-6 text-sm">
            <a
              href="mailto:hello@kierzniak.dev"
              className="text-[#a3a3a3] hover:text-[#E1F748] transition-colors"
            >
              <span className="text-[#666666]">00.</span> Email
            </a>
            <a
              href="https://github.com/kierzniak"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#a3a3a3] hover:text-[#E1F748] transition-colors"
            >
              <span className="text-[#666666]">01.</span> GitHub
            </a>
            <a
              href="https://linkedin.com/in/kierzniak"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#a3a3a3] hover:text-[#E1F748] transition-colors"
            >
              <span className="text-[#666666]">02.</span> LinkedIn
            </a>
            <a
              href="https://x.com/kierzniak"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#a3a3a3] hover:text-[#E1F748] transition-colors"
            >
              <span className="text-[#666666]">03.</span> X
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}