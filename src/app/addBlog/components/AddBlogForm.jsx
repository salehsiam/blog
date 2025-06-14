"use client";

import dynamic from "next/dynamic";
import React, { useEffect, useRef, useState } from "react";
import { useSession, signIn } from "next-auth/react";
import { generateBlogContent, generateTags } from "@/lib/gemini"; // Adjust path as needed
import { useRouter, usePathname, useSearchParams } from "next/navigation";

const JoditEditor = dynamic(() => import("jodit-react"), {
  ssr: false,
});

export default function AddBlogForm({ callbackUrlParams }) {
  const editor = useRef(null);
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  const [title, setTitle] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [content, setContent] = useState("");
  const [post, setPost] = useState(false);
  const [loadingAI, setLoadingAI] = useState(false);

  const callbackUrl =
    pathname +
    (callbackUrlParams
      ? "?" + new URLSearchParams(callbackUrlParams).toString()
      : "");

  // Auth check
  useEffect(() => {
    if (status === "loading") return;

    if (!session) {
      signIn("credentials", {
        callbackUrl: `/login?callbackUrl=${encodeURIComponent(callbackUrl)}`,
      });
    }
  }, [session, status, callbackUrl]);

  if (!session) return <div>Redirecting to login...</div>;

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
        setPost(false);
        return;
      }

      // Upload image if selected
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
          return;
        }
      }

      // Construct blog data
      const blogData = {
        title,
        image: thumbnailUrl,
        author: session.user.name,
        email: session.user.email,
        content,
        tags: tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
        category,
        publishedAt: new Date().toISOString(),
        comments: [],
      };

      const res = await fetch("/api/blog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(blogData),
      });

      if (!res.ok) {
        throw new Error("Failed to create blog");
      }

      // Reset form
      setTitle("");
      setThumbnail(null);
      setCategory("");
      setTags("");
      setContent("");
      alert("Blog created successfully!");
    } catch (err) {
      console.error("Error creating blog:", err);
      alert("Error creating blog, please try again.");
    } finally {
      setPost(false);
    }
  };

  // AI Handlers
  const handleGenerateBlog = async () => {
    if (!title) {
      alert("Please enter a blog topic/title first.");
      return;
    }
    setLoadingAI(true);
    try {
      const blog = await generateBlogContent(title);
      setContent(blog);
    } catch (err) {
      console.error(err);
      alert("Failed to generate blog content.");
    } finally {
      setLoadingAI(false);
    }
  };

  const handleSuggestTags = async () => {
    if (!content) {
      alert("Please write or generate content first.");
      return;
    }
    setLoadingAI(true);
    try {
      const suggestedTags = await generateTags(content);
      setTags(suggestedTags);
    } catch (err) {
      console.error(err);
      alert("Failed to suggest tags.");
    } finally {
      setLoadingAI(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md p-6 rounded-lg max-w-3xl mx-auto"
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

      {/* AI Action Buttons */}
      <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-center md:gap-4">
        <button
          type="button"
          className="btn btn-accent"
          onClick={handleGenerateBlog}
          disabled={loadingAI}
        >
          {loadingAI ? "Generating..." : "✍️ Generate Blog with AI"}
        </button>

        <button
          type="button"
          className="btn btn-outline"
          onClick={handleSuggestTags}
          disabled={loadingAI}
        >
          {loadingAI ? "Loading..." : "🏷 Suggest Tags"}
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <div className="flex-1">
          <label className="block font-semibold mb-2">Thumbnail Image</label>
          <input
            type="file"
            className="file-input w-full"
            onChange={(e) => setThumbnail(e.target.files[0])}
            accept="image/*"
          />
        </div>

        <div className="flex-1">
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

      <div className="mb-6">
        <label className="block font-semibold mb-2">Blog Content</label>
        <JoditEditor
          ref={editor}
          value={content}
          config={config}
          onBlur={(newContent) => setContent(newContent)}
          onChange={() => {}}
        />
      </div>

      <button
        type="submit"
        className="btn btn-primary"
        disabled={post || loadingAI}
      >
        {post ? "Creating..." : "Create Blog"}
      </button>
    </form>
  );
}
