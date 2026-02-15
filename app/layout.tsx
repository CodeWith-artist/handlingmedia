import Navbar from "@/components/Navbar";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#050505] min-h-screen`}>
        <Navbar />
        {/* Added some dummy content padding so you can scroll to test it */}
        
          {children}
      </body>
    </html>
  );
}