import Image from "next/image";
import RecentBlogs from "./components/RecentBlogs";
import BlogSlider from "./components/BlogSlider";

export default function Home() {
  return (
    <div className="">
      <BlogSlider />
      <RecentBlogs />
    </div>
  );
}
