export async function POST(req) {
  const { content } = await req.json();

  const prompt = `
Suggest 5 SEO-friendly tags (comma-separated) for the following blog post.
Return ONLY the tags as a comma-separated list, no extra text or explanation.

Blog post:
${content}
`;

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    }
  );

  const data = await response.json();

  function extractTags(text) {
    const colonIndex = text.indexOf(":");
    if (colonIndex !== -1) {
      return text.slice(colonIndex + 1).trim();
    }
    return text.trim();
  }

  const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
  const tags = extractTags(rawText);

  return Response.json({ tags });
}
