import "@/app/(public)/globals.css";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#050505] text-white">
        {children}
      </body>
    </html>
  );
}