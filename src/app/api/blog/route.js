import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  const body = await req.json();
  const blogCollection = await dbConnect(collectionNameObj.blogCollection);
  const result = await blogCollection.insertOne(body);

  return NextResponse.json(result);
};

export const GET = async (req) => {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");

  const blogCollection = await dbConnect(collectionNameObj.blogCollection);

  const query = category ? { category } : {};

  const blogs = await blogCollection.find(query).toArray();

  return NextResponse.json(blogs);
};
