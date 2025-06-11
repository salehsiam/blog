import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  const p = await params;
  const blogCollection = dbConnect(collectionNameObj.blogCollection);
  const data = await blogCollection.findOne({ _id: new ObjectId(p.id) });
  return NextResponse.json(data);
};
export const DELETE = async (req, { params }) => {
  const blogCollection = await dbConnect(collectionNameObj.blogCollection);

  const result = await blogCollection.deleteOne({
    _id: new ObjectId(params.id),
  });

  if (result.deletedCount === 0) {
    return NextResponse.json(
      { message: "Blog not found or already deleted" },
      { status: 404 }
    );
  }

  return NextResponse.json({ message: "Blog deleted successfully" });
};

export const PUT = async (req, context) => {
  const { params } = await context;
  const body = await req.json();
  const blogCollection = await dbConnect(collectionNameObj.blogCollection);

  const result = await blogCollection.updateOne(
    { _id: new ObjectId(params.id) },
    { $set: body }
  );

  if (result.modifiedCount === 0) {
    return NextResponse.json({ message: "No changes made" }, { status: 400 });
  }
  revalidatePath(`/blogs`);
  return NextResponse.json({ message: "Blog updated successfully" });
};
