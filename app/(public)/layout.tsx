import Navbar from "@/components/navbar/Navbar";
import { Inter } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/home/Footer";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#050505] text-white`}>
        <Navbar />
        {/* Added some dummy content padding so you can scroll to test it */}
        
        {children}
        <Footer />
      </body>
    </html>                                  
  );
}