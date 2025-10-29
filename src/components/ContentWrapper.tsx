import { ReactNode } from "react";

interface ContentWrapperProps {
  children: ReactNode;
}

export default function ContentWrapper({ children }: ContentWrapperProps) {
  return (
    <main className="flex-1 mx-8">
      <div className="w-full max-w-7xl py-16 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        {children}
      </div>
    </main>
  );
}