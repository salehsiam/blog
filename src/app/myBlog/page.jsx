"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import Image from "next/image";

export default function MyBlogs() {
  const { data: session, status } = useSession();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      if (session?.user?.email) {
        try {
          const res = await fetch(`/api/blog?email=${session.user.email}`);
          if (!res.ok) {
            throw new Error("Failed to fetch blogs");
          }
          const data = await res.json();
          setBlogs(data);
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchBlogs();
  }, [session]);

  const handleDelete = async (id) => {
    const confirmed = confirm("Are you sure you want to delete this blog?");
    if (!confirmed) return;

    try {
      const res = await fetch(`/api/blog/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete blog");
      }

      setBlogs((prev) => prev.filter((blog) => blog._id !== id));
    } catch (error) {
      console.error(error);
      alert("An error occurred while deleting the blog.");
    }
  };

  if (status === "loading") return <p>Loading session...</p>;
  if (!session) return <p>Please sign in to view your blogs.</p>;
  if (loading) return <p>Loading your blogs...</p>;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">My Blogs</h1>

      {blogs.length === 0 ? (
        <p>No blogs found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 shadow-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 border-b text-left">Image</th>
                <th className="py-2 px-4 border-b text-left">Title</th>
                <th className="py-2 px-4 border-b text-left">Content</th>
                <th className="py-2 px-4 border-b text-left">Category</th>
                <th className="py-2 px-4 border-b text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog) => (
                <tr key={blog._id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">
                    <div className="relative w-16 h-16 rounded overflow-hidden">
                      <Image
                        src={blog.image || "/placeholder.jpg"}
                        alt={blog.title}
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                  </td>
                  <td className="py-2 px-4 border-b font-medium">
                    {blog.title}
                  </td>
                  <td
                    className="py-2 px-4 border-b max-w-xs truncate"
                    dangerouslySetInnerHTML={{
                      __html: blog.content?.slice(0, 80),
                    }}
                  />
                  <td className="py-2 px-4 border-b capitalize">
                    {blog.category || "N/A"}
                  </td>
                  <td className="py-2 px-4 border-b">
                    <div className="flex gap-4">
                      <Link
                        href={`/myBlog/editBlog/${blog._id}`}
                        className="text-blue-600 hover:underline"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(blog._id)}
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
