"use client";

import { useRouter, useSearchParams } from "next/navigation";

interface CategoryListProps {
  categories: {
    id: string;
    slug: string;
    name: string;
  }[];
}

export default  function CategoryList({ categories }: CategoryListProps ) {
  const router = useRouter();
  const searchParams = useSearchParams();
  

  const selected = searchParams.get("category");

  const handleClick = (categoryName: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (selected === categoryName) {
      params.delete("category"); // toggle off
    } else {
      params.set("category", categoryName);
    }

    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex flex-wrap gap-3">
      {categories.map((cat) => (
        <span
          key={cat.id}
          onClick={() => handleClick(cat.name)}
          className={`px-4 py-2 rounded-full cursor-pointer transition
            ${
              selected === cat.name
                ? "bg-black text-white"
                : "bg-gray-200 dark:bg-gray-800 hover:opacity-80"
            }`}
        >
          {cat.name}
        </span>
      ))}
    </div>
  );
}