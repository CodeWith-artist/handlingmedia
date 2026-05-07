'use server';

import CategoryList from "./Category";
import { getCategories } from "@/server/blog";

export default async function Banner() {
  const text = "Breaking Down Tech, Media & Ideas";
  const categories = await getCategories();

  return (
    <div className="relative w-full h-[40vh] md:h-[60vh] flex flex-col gap-8 items-center justify-center overflow-hidden bg-black">
      
      {/* Background Gradient Glow */}

      {/* Content */}
      <div className="relative z-10 text-center px-6">
        
        {/* Main Heading */}
        <h1 className="text-2xl md:text-6xl font-extrabold text-white leading-tight tracking-tight">
          {text}
        </h1>

        {/* Highlight Line */}
        <p className="mt-4 text-l md:text-xl text-gray-300">
          One Post at a Time.
        </p>

        {/* Subtle Divider */}
        <div className="mt-6 w-20 h-1 bg-linear-to-r from-purple-500 to-blue-500 mx-auto rounded-full"></div>
      </div>
      <CategoryList categories={categories } />
    </div>
  );
}