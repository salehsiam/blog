import BlogCard from "@/components/BlogCard";
import BlogSearchBar from "../components/BlogSearchBar";

export default async function Blogs({ searchParams }) {
  const { title, category } = await searchParams;

  const query = new URLSearchParams();
  if (title) query.append("title", title);
  if (category) query.append("category", category);

  const res = await fetch(
    `${
      process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
    }/api/blog?${query.toString()}`,
    { cache: "no-store" }
  );
  const data = await res.json();

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-6">All Blogs</h2>

      <BlogSearchBar title={title} category={category} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.length === 0 ? (
          <p className="text-gray-600">No blogs found.</p>
        ) : (
          data.map((item) => <BlogCard key={item._id} item={item} />)
        )}
      </div>
    </div>
  );
}
