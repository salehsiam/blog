import RecentBlogs from "./components/RecentBlogs";
import BlogSlider from "./components/BlogSlider";
import LifestyleSection from "./components/LifestyleSection";

export default function Home() {
  return (
    <div className="">
      <BlogSlider />
      <RecentBlogs />
      <LifestyleSection />
    </div>
  );
}
