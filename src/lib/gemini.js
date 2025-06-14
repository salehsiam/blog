export const generateBlogContent = async (topic) => {
  const res = await fetch("/api/gemini/write", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ topic }),
  });
  const data = await res.json();
  return data.blog;
};

export const generateBlogSummary = async (content) => {
  const res = await fetch("/api/gemini/summary", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content }),
  });
  const data = await res.json();
  return data.summary;
};

export const generateTags = async (content) => {
  const res = await fetch("/api/gemini/tags", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content }),
  });
  const data = await res.json();
  return data.tags;
};
