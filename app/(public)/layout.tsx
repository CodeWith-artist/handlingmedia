// app/(public)/layout.tsx

import Navbar from "@/components/navbar/Navbar";
import { Footer, CtaBanner } from "@/components/home/Footer";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    
    <div className="bg-black text-white">
      <Navbar />
      {children}
      <CtaBanner />
      <Footer />
      </div>
  );
}