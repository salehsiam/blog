import Image from "next/image";
import React from "react";
import { FaCommentDots } from "react-icons/fa";
import { IoPersonSharp } from "react-icons/io5";

export default async function BlogDetailsPage({ params }) {
  const p = await params;
  const res = await fetch(`http://localhost:3000/api/blog/${p.id}`);
  const data = await res.json();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Main Content */}
      <div className="lg:col-span-8 space-y-6">
        <Image
          src={data.image}
          width={800}
          height={500}
          alt={data.title}
          className="rounded-xl w-full h-60 md:h-80 lg:h-96 object-cover"
        />

        <h1 className="text-3xl font-bold">{data.title}</h1>

        <div className="flex flex-wrap items-center gap-6 text-gray-600 text-sm">
          <p className="flex items-center gap-2">
            <FaCommentDots className="text-lg" />
            {data.comments?.length || 0} Comments
          </p>
          <p className="flex items-center gap-2">
            <IoPersonSharp className="text-lg" />
            {data.author}
          </p>
        </div>

        <div
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: data.content }}
        />
      </div>

      {/* Sidebar */}
      <aside className="lg:col-span-4 space-y-4">
        <h2 className="text-2xl font-semibold border-b pb-2">Popular Blogs</h2>
        {/* Placeholder for blog list */}
        <div className="text-gray-500">Coming soon...</div>
      </aside>
    </div>
  );
}
