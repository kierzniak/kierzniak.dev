import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full">
      <div className="mx-8 border-b border-[#4a4a4a]">
        <div className="w-full max-w-7xl py-6 grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-24">
          <div>
            <Link href="/" className="text-lg">
              kierzniak.dev
            </Link>
          </div>
          <nav className="flex gap-6 text-sm">
            <Link href="/" className="hover:text-[#c4d600] transition-colors">
              <span className="text-[#7a7a7a]">00.</span> Home
            </Link>
            <Link href="/blog" className="hover:text-[#c4d600] transition-colors">
              <span className="text-[#7a7a7a]">01.</span> Blog
            </Link>
            <Link href="/about" className="hover:text-[#c4d600] transition-colors">
              <span className="text-[#7a7a7a]">02.</span> About
            </Link>
            <Link href="/contact" className="hover:text-[#c4d600] transition-colors">
              <span className="text-[#7a7a7a]">03.</span> Contact
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}