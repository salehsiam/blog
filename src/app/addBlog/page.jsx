import React from "react";
import AddBlogForm from "./components/AddBlogForm";

export default function AddBlog() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Add New Blog</h1>
      <AddBlogForm />
    </div>
  );
}
