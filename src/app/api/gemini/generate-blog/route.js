// app/api/gemini/generate-blog/route.js
export async function POST(req) {
  const { topic } = await req.json();

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `Write a detailed blog post on the topic: "${topic}". Include an introduction, main points, and a conclusion.`,
              },
            ],
          },
        ],
      }),
    }
  );

  const data = await res.json();

  const content = data?.candidates?.[0]?.content?.parts?.[0]?.text;

  return new Response(JSON.stringify({ content }), {
    headers: { "Content-Type": "application/json" },
  });
}
