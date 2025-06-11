import BlogCard from "@/components/BlogCard";
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";

import React from "react";

export default async function RecentBlogs() {
  const blogCollection = dbConnect(collectionNameObj.blogCollection);
  const data = await blogCollection
    .find({})
    .sort({ publishedAt: -1 })
    .limit(6)
    .toArray();

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-6">Recent Blogs</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((item) => (
          <BlogCard key={item._id} item={item} />
        ))}
      </div>
    </section>
  );
}
