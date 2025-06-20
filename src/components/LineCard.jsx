import Image from "next/image";
import Link from "next/link";

export default function LineCard({ blog }) {
  return (
    <div>
      <Link className="flex gap-4 mb-4" href={`/blogs/${blog._id}`}>
        <div className="flex-shrink-0 w-24 h-20 relative overflow-hidden rounded block">
          <Image
            src={blog.image}
            alt={blog.title}
            fill
            className="object-cover rounded"
            sizes="96px" // equivalent to w-24
            priority={false}
          />
        </div>
        <h3 className="text-sm font-medium text-gray-800 hover:underline">
          {blog.title}
        </h3>
      </Link>
    </div>
  );
}
