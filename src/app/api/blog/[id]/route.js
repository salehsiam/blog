import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  const p = await params;
  const blogCollection = dbConnect(collectionNameObj.blogCollection);
  const data = await blogCollection.findOne({ _id: new ObjectId(p.id) });
  return NextResponse.json(data);
};
