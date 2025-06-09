import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import Image from "next/image";
import React from "react";
import { FaCommentDots } from "react-icons/fa";
import { IoPersonSharp } from "react-icons/io5";

export default async function BlogDetailsPage({ params }) {
  const p = await params;
  const blogCollection = dbConnect(collectionNameObj.blogCollection);
  const data = await blogCollection.findOne({ _id: new ObjectId(p.id) });
  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-8 p-4">
        <Image src={data.image} width={800} height={500} alt={data.title} />
        <div className="flex items-center gap-6">
          <p className="flex items-center gap-2">
            <FaCommentDots />
            {data.comments.length} Comments
          </p>
          <p className="flex items-center gap-2">
            <IoPersonSharp />
            {data.author}
          </p>
        </div>
        <p>{data.content}</p>
      </div>
      <div className="col-span-4 p-4">
        <p className="text-xl ">Popular Blogs</p>
      </div>
    </div>
  );
}
