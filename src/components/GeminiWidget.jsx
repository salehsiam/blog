"use client";

import { generateBlogContent } from "@/lib/gemini";
import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";

export default function GeminiWidget() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [topic, setTopic] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!topic) return;
    setLoading(true);
    const result = await generateBlogContent(topic);
    setContent(result);
    setLoading(false);
  };

  const handleModalOpen = () => setIsModalOpen(!isModalOpen);

  return (
    <div className="fixed bottom-20 right-5 z-50 font-sans">
      {isModalOpen && (
        <div className="bg-white relative rounded-xl shadow-2xl w-96 max-h-[80vh] overflow-hidden flex flex-col">
          {/* Header */}
          <div className="bg-primary text-white px-5 py-3 flex justify-between items-center rounded-t-xl">
            <div>
              <h3 className="text-lg font-bold">AI Blog Assistant</h3>
              <span className="text-sm font-normal text-white/80">
                Let AI write your blog
              </span>
            </div>
            <button
              onClick={handleModalOpen}
              className="bg-white text-black rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-200"
            >
              <IoMdClose />
            </button>
          </div>

          {/* Content */}
          <div className="p-4 bg-[url('https://i.ibb.co.com/BV2cYycg/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')] bg-cover flex-1 overflow-y-auto text-sm text-gray-900">
            {topic && (
              <div className="mb-3 text-gray-700 font-semibold text-md">
                Topic: <span className="italic">{topic}</span>
              </div>
            )}
            {content ? (
              <div className="bg-white/80 p-3 rounded-lg shadow-sm whitespace-pre-wrap max-h-[50vh] overflow-y-auto text-sm">
                {content}
              </div>
            ) : (
              <div className="text-gray-600 italic">
                Generated content will appear here.
              </div>
            )}
          </div>

          {/* Input */}
          <div className="border-t p-3 bg-white flex gap-2">
            <input
              type="text"
              placeholder="Enter blog topic..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none text-sm"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
            <button
              onClick={handleGenerate}
              className="bg-primary text-white px-4 py-2 rounded-md text-sm"
              disabled={loading}
            >
              {loading ? "Thinking..." : "Generate"}
            </button>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      {!isModalOpen && (
        <button
          className="px-6 py-3 bg-white border font-semibold rounded-xl flex items-center gap-2 shadow-md hover:shadow-lg"
          onClick={handleModalOpen}
        >
          AI
        </button>
      )}
    </div>
  );
}
