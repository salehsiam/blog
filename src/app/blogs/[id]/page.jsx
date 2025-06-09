import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import React from "react";

export default async function BlogDetailsPage({ params }) {
  const p = await params;
  const blogCollection = dbConnect(collectionNameObj.blogCollection);
  const data = await blogCollection.findOne({ _id: new ObjectId(p.id) });
  return (
    <div>
      <p>{JSON.stringify(data)}</p>
    </div>
  );
}
