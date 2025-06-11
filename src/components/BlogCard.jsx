import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaCommentDots } from "react-icons/fa";
import { IoPersonSharp } from "react-icons/io5";

export default function BlogCard({ item }) {
  return (
    <div>
      <Link
        href={`/blogs/${item._id}`}
        className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300"
      >
        <div className="relative w-full h-48">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="p-4 space-y-2">
          <h3 className="text-xl font-semibold line-clamp-2">{item.title}</h3>
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
    </div>
  );
}
