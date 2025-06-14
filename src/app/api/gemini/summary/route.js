export async function POST(req) {
  const { content } = await req.json();
  const prompt = `Summarize the following blog content in 3-4 lines:\n\n${content}`;

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
  const summary =
    data?.candidates?.[0]?.content?.parts?.[0]?.text || "No summary generated.";
  return Response.json({ summary });
}
