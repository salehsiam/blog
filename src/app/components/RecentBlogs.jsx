import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaCommentDots } from "react-icons/fa";
import { IoPersonSharp } from "react-icons/io5";

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
          <Link
            href={`/blogs/${item._id}`}
            key={item._id}
            className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <div className="relative w-full h-48">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4 space-y-2">
              <h3 className="text-xl font-semibold line-clamp-2">
                {item.title}
              </h3>
              <div className="flex justify-between text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <FaCommentDots className="text-base" />
                  {item.comments?.length || 0} Comments
                </span>
                <span className="flex items-center gap-1">
                  <IoPersonSharp className="text-base" />
                  {item.author}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
