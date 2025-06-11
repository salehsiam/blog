"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {
  FaArrowAltCircleLeft,
  FaArrowAltCircleRight,
  FaCommentDots,
} from "react-icons/fa";
import { IoPersonSharp } from "react-icons/io5";

const BlogSlider = () => {
  const [blogs, setBlogs] = useState([]);
  const swiperRef = useRef(null);

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

  return (
    <div className="max-w-7xl mx-auto relative">
      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        modules={[Navigation, Pagination, Autoplay]}
        navigation={false} // disable default nav buttons
        pagination={{ clickable: true }}
        autoplay={{ delay: 8000 }}
        loop
        spaceBetween={20}
        slidesPerView={1}
      >
        {blogs.map((slide, idx) => (
          <SwiperSlide key={idx}>
            <Link href={`/blogs/${slide._id}`}>
              <div className="relative h-[500px] w-full rounded overflow-hidden">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  className="object-cover"
                  priority
                />

                {/* Full image gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent text-white flex items-center px-12 p-6">
                  <div className="space-y-6">
                    <h2 className="text-sm uppercase underline ">
                      {slide.category}
                    </h2>
                    <h3 className="text-4xl font-semibold">{slide.title}</h3>
                    <ul className="text-lg space-x-4 flex">
                      <li className="flex items-center gap-2">
                        <FaCommentDots className="text-lg" />{" "}
                        {slide.comments.length} Comments
                      </li>
                      <li className="flex items-center gap-2">
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

      {/* Custom navigation buttons on the right */}
      <div className="absolute top-1/2 right-4 flex flex-col space-y-2 transform -translate-y-1/2 z-10">
        <button
          className="btn btn-circle btn-sm bg-white text-black shadow-lg hover:bg-gray-200"
          onClick={() => swiperRef.current?.slidePrev()}
          aria-label="Previous Slide"
        >
          <FaArrowAltCircleLeft />
        </button>
        <button
          className="btn btn-circle btn-sm bg-white text-black shadow-lg hover:bg-gray-200"
          onClick={() => swiperRef.current?.slideNext()}
          aria-label="Next Slide"
        >
          <FaArrowAltCircleRight />
        </button>
      </div>
    </div>
  );
};

export default BlogSlider;
