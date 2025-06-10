"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FaCommentDots } from "react-icons/fa";
import { IoPersonSharp } from "react-icons/io5";

const BlogSlider = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchFeaturedBlogs = async () => {
      try {
        const res = await fetch("/api/blog?category=Featured");
        const data = await res.json();
        setBlogs(data);
      } catch (error) {
        console.error("Failed to fetch featured blogs:", error);
      }
    };

    fetchFeaturedBlogs();
  }, []);

  if (!blogs || blogs.length === 0) {
    return <p className="text-center py-10">No featured blogs available.</p>;
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 8000 }}
        loop
        spaceBetween={20}
        slidesPerView={1}
      >
        {blogs.map((slide, idx) => (
          <SwiperSlide key={idx}>
            <Link href={`/blogs/${slide._id}`}>
              <div className="relative h-[400px] w-full rounded overflow-hidden">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  className="object-cover"
                  priority
                />

                {/* Full image gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent text-white flex items-end p-6">
                  <div className="space-y-2">
                    <h2 className="text-sm uppercase underline ">
                      {slide.category}
                    </h2>
                    <h3 className="text-xl font-semibold">{slide.title}</h3>
                    <ul className="text-sm space-x-4 flex">
                      <li className="flex items-center gap-2">
                        <FaCommentDots className="text-lg" />{" "}
                        {slide.comments.length} Comments
                      </li>
                      <li className="flex items-center gap-2">
                        {" "}
                        <IoPersonSharp className="text-lg" /> {slide.author}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BlogSlider;
