export async function generateBlogContent(topic) {
  const res = await fetch("/api/gemini/generate-blog", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ topic }),
  });

  const data = await res.json();
  return data.content;
}
