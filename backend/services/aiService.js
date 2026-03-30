import dotenv from "dotenv";
dotenv.config();
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

export async function analyzeText(text) {
  const prompt = `
Extract risky clauses from this Terms of Service.

Return ONLY JSON in this format:
{
  "clauses": [
    {
      "clause": "text",
      "category": "Data Sharing | Data Collection | Liability | User Rights",
      "risk": "LOW | MEDIUM | HIGH | CRITICAL",
      "reason": "why risky",
      "impact": "effect on user"
    }
  ]
}

TEXT:
${text.slice(0, 4000)}
`;

  const res = await client.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "system",
        content:
          "You are a strict JSON generator. ONLY return valid JSON. No explanations.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    response_format: { type: "json_object" },
  });

  const parsed = JSON.parse(res.choices[0].message.content);
  return parsed;
}
