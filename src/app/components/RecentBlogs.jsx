import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function RecentBlogs() {
  const blogCollection = dbConnect(collectionNameObj.blogCollection);
  const data = await blogCollection.find({}).toArray();

  return (
    <div className="grid grid-cols-12">
      {data.map((item) => (
        <Link
          href={`/blogs/${item._id}`}
          key={item._id}
          className="col-span-12 md:col-span-6 lg:col-span-4"
        >
          {" "}
          <Image width={250} height={250} src={item.image} alt={item.title} />
          <h2 className="text-xl">{item.title}</h2>
          <div className="flex gap-6">
            <button>{item.comments.length} Comments</button>
            <button>{item.author}</button>
          </div>
        </Link>
      ))}
    </div>
  );
}
