"use client";

import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

// Dynamically import JoditEditor to avoid SSR issues
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

export default function EditBlog() {
  const { id } = useParams();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [post, setPost] = useState(false);

  const editor = useRef(null);

  // Fetch blog data
  useEffect(() => {
    const fetchBlog = async () => {
      const res = await axios.get(`/api/blog/${id}`);
      const blog = res.data;

      setTitle(blog.title);
      setContent(blog.content);
      setThumbnailUrl(blog.image);
      setCategory(blog.category || "");
      setTags(blog.tags?.join(", ") || "");
    };

    fetchBlog();
  }, [id]);

  // Upload image to ImageBB (you must replace YOUR_API_KEY)
  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    const res = await axios.post(
      `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_KEY}`,
      formData
    );

    return res.data.data.url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPost(true);

    try {
      let imageURL = thumbnailUrl;

      if (thumbnail) {
        imageURL = await uploadImage(thumbnail);
      }

      const updatedBlog = {
        title,
        content,
        image: imageURL,
        category,
        tags: tags.split(",").map((tag) => tag.trim()),
      };
      await axios.put(`/api/blog/${id}`, updatedBlog);
      router.push("/myBlog");
    } catch (error) {
      console.error("Error updating blog:", error);
    } finally {
      setPost(false);
    }
  };

  const config = {
    readonly: false,
    placeholder: "Start typing...",
    height: 300,
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Blog</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md p-6 rounded-lg"
      >
        <div className="mb-4">
          <label className="block font-semibold mb-2">Blog Title</label>
          <input
            type="text"
            className="input input-bordered w-full"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="mb-4 flex-1">
            <label className="block font-semibold mb-2">Thumbnail Image</label>
            {thumbnailUrl && (
              <img
                src={thumbnailUrl}
                alt="Current Thumbnail"
                className="w-full h-32 object-cover mb-2 rounded"
              />
            )}
            <input
              type="file"
              className="file-input w-full"
              onChange={(e) => setThumbnail(e.target.files[0])}
              accept="image/*"
            />
          </div>

          <div className="mb-4 flex-1">
            <label className="block font-semibold mb-2">Category</label>
            <select
              className="select select-bordered w-full"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="" disabled>
                Select Category
              </option>
              <option value="Featured">Featured</option>
              <option value="Technology">Technology</option>
              <option value="Sports">Sports</option>
              <option value="Health">Health</option>
              <option value="Education">Education</option>
              <option value="Lifestyle">Lifestyle</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Business">Business</option>
              <option value="Travel">Travel</option>
              <option value="Food">Food</option>
              <option value="Others">Others</option>
            </select>
          </div>
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-2">
            Tags (comma-separated)
          </label>
          <input
            type="text"
            className="input input-bordered w-full"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="e.g., react, javascript"
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-2">Blog Content</label>
          <JoditEditor
            ref={editor}
            value={content}
            config={config}
            onBlur={(newContent) => setContent(newContent)}
            onChange={() => {}}
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={post}>
          {post ? "Updating..." : "Update Blog"}
        </button>
      </form>
    </div>
  );
}
