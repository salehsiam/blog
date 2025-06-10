"use client";

import dynamic from "next/dynamic";
import React, { useRef, useState } from "react";
import { useSession } from "next-auth/react";

const JoditEditor = dynamic(() => import("jodit-react"), {
  ssr: false,
});

export default function AddBlogForm() {
  const editor = useRef(null);
  const { data: session } = useSession(); // 👈 Get session info

  const [title, setTitle] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [content, setContent] = useState("");
  const [post, setPost] = useState(false);

  const config = {
    readonly: false,
    placeholder: "Start writing your blog...",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPost(true);

    try {
      if (!session?.user?.name) {
        alert("You must be logged in to post a blog.");
        return;
      }

      // Upload image
      let thumbnailUrl = "";
      if (thumbnail) {
        const formData = new FormData();
        formData.append("image", thumbnail);

        try {
          const res = await fetch(
            `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_KEY}`,
            {
              method: "POST",
              body: formData,
            }
          );

          const data = await res.json();
          console.log("Image upload response:", data); // 👈 Add this

          if (!data.success) {
            throw new Error(data.error?.message || "Image upload failed");
          }

          thumbnailUrl = data.data.url;
        } catch (error) {
          console.error("Image upload failed:", error.message);
          alert(
            "Image upload failed. Please check your API key and try again."
          );
          setPost(false);
          return; // stop form submission
        }
      }
      // Construct blog data
      const blogData = {
        title,
        image: thumbnailUrl,
        author: session.user.name,
        email: session.user.email,
        content,
        tags: tags.split(",").map((tag) => tag.trim()),
        category,
        publishedAt: new Date().toISOString(),
        comments: [],
      };

      await fetch("/api/blog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(blogData),
      });

      // Reset
      setTitle("");
      setThumbnail(null);
      setCategory("");
      setTags("");
      setContent("");
      alert("Blog created successfully!");
    } catch (err) {
      console.error("Error creating blog:", err);
    } finally {
      setPost(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md p-6 rounded-lg">
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
        {post ? "Creating..." : "Create Blog"}
      </button>
    </form>
  );
}
