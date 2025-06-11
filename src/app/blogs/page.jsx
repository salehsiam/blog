import BlogCard from "@/components/BlogCard";
import React from "react";

export default async function Blogs() {
  const res = await fetch("http://localhost:3000/api/blog", {
    cache: "force-cache",
  });
  const data = await res.json();
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-6">All Blogs</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((item) => (
          <BlogCard key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
}
