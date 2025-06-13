import Image from "next/image";
import Link from "next/link";
import { FaCommentDots } from "react-icons/fa";
import { IoPersonSharp } from "react-icons/io5";

export default function FeaturedCard({ blog }) {
  return (
    <div className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 mb-4 h-64">
      <Link
        href={`/blogs/${blog._id}`}
        className="block h-full w-full relative"
      >
        <div className="relative w-full h-full">
          <Image
            src={blog.image}
            alt={blog.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
            priority
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
            <h4 className="text-white text-lg font-semibold">{blog.title}</h4>
            <div className="flex gap-5 text-sm text-white">
              <span className="flex items-center gap-1">
                <FaCommentDots className="text-base" />
                {blog.comments?.length || 0} Comments
              </span>
              <span className="flex items-center gap-1">
                <IoPersonSharp className="text-base" />
                {blog.author}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
