export async function POST(req) {
  const { topic } = await req.json();
  const prompt = `Write a blog post about: "${topic}". Make it informative, readable, and engaging.`;

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
  const blog =
    data?.candidates?.[0]?.content?.parts?.[0]?.text || "No blog generated.";
  return Response.json({ blog });
}
