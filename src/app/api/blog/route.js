import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { revalidatePath } from "next/cache";
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
  const email = searchParams.get("email");

  const blogCollection = await dbConnect(collectionNameObj.blogCollection);

  const query = {};
  if (category) query.category = category;
  if (email) query.email = email;

  const blogs = await blogCollection.find(query).toArray();
  revalidatePath("/blogs");
  return NextResponse.json(blogs);
};
