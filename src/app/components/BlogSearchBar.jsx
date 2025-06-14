"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";

export default function BlogSearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [title, setTitle] = useState(searchParams.get("title") || "");
  const category = searchParams.get("category") || "";

  // Handle title input change
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      const params = new URLSearchParams(searchParams);
      if (title.trim()) {
        params.set("title", title);
      } else {
        params.delete("title");
      }
      router.push(`/blogs?${params.toString()}`);
    }, 400); // Debounce delay

    return () => clearTimeout(delayDebounce);
  }, [title]);

  // Handle category change
  const handleCategoryChange = (e) => {
    const newCategory = e.target.value;
    const params = new URLSearchParams(searchParams);

    if (newCategory) {
      params.set("category", newCategory);
    } else {
      params.delete("category");
    }

    router.push(`/blogs?${params.toString()}`);
  };

  return (
    <div className="mb-6 flex flex-col sm:flex-row gap-4">
      <div className="relative flex-1">
        <FiSearch
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          size={20}
        />
        <input
          type="text"
          placeholder="Search blogs by title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
        />
      </div>

      <select
        name="category"
        value={category}
        onChange={handleCategoryChange}
        className="select select-bordered w-full sm:w-1/3"
      >
        <option value="">All Categories</option>
        <option value="Featured">Featured</option>
        <option value="Technology">Technology</option>
        <option value="Sports">Sports</option>
        <option value="Health">Health</option>
        <option value="Education">Education</option>
        <option value="Lifestyle">Lifestyle</option>
        <option value="Entertainment">Entertainment</option>
        <option value="Business">Business</option>
        <option value="Travel">Travel</option>
        <option value="Food">Food</option>
        <option value="Others">Others</option>
      </select>
    </div>
  );
}
