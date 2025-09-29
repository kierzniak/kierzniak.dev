import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full">
      <div className="mx-8 border-b border-[#333333]">
        <div className="w-full max-w-7xl py-6 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <div>
            <Link href="/" className="text-lg">
              kierzniak.dev
            </Link>
          </div>
          <nav className="flex gap-6 text-sm">
            <Link href="/" className="hover:text-[#E1F748] transition-colors">
              <span className="text-[#666666]">00.</span> Home
            </Link>
            <Link href="/blog" className="hover:text-[#E1F748] transition-colors">
              <span className="text-[#666666]">01.</span> Blog
            </Link>
            <Link href="/about" className="hover:text-[#E1F748] transition-colors">
              <span className="text-[#666666]">02.</span> About
            </Link>
            <Link href="/contact" className="hover:text-[#E1F748] transition-colors">
              <span className="text-[#666666]">03.</span> Contact
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}