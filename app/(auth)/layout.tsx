import "@/app/(public)/globals.css";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    
      <div className="bg-[#050505] text-white">
        {children}
      </div>
    
  );
}