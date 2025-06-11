import FeaturedCard from "@/components/FeaturedCard";
import LineCard from "@/components/LineCard";
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import React from "react";

export default async function LifestyleSection() {
  const blogCollection = dbConnect(collectionNameObj.blogCollection);

  const data = await blogCollection
    .find({ category: "Lifestyle" })
    .sort({ publishedAt: -1 })
    .limit(12)
    .toArray();
  const col1 = data.slice(0, 4);
  const col2 = data.slice(4, 8);
  const col3 = data.slice(8, 12);

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-8  text-gray-800">Lifestyle</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[col1, col2, col3].map((col, colIndex) => (
          <div key={colIndex}>
            {col.map((article, index) => {
              const isFeatured =
                (colIndex === 0 && index === 0) || // 1st column, 1st article
                (colIndex === 1 && index === col.length - 1) || // 2nd column, last article
                (colIndex === 2 && index === 0); // 3rd column, 1st article
              return isFeatured ? (
                <FeaturedCard key={index} blog={article} />
              ) : (
                <LineCard key={index} blog={article} />
              );
            })}
          </div>
        ))}
      </div>
    </section>
  );
}
