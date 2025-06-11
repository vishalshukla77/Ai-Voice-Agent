import axios from "axios";
import OpenAI from "openai";
import { CoachingOptions } from "./Options";

export const getToken = async () => {
  const result = await axios.get("/api/getToken");
  return result;
};

// ✅ Use OpenRouter endpoint and key
const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENROUTER_API_KEY, // set in .env
  baseURL: "https://openrouter.ai/api/v1",            // required for OpenRouter
  dangerouslyAllowBrowser: true                       // allows frontend usage (only for testing!)
});

export const AIModel = async (topic, coachingOption, userMessage) => {
  try {
    const option = CoachingOptions.find((item) => item.name === coachingOption);
    const prompt = option?.prompt.replace('{user_topic}', topic) ?? topic;

    const completion = await openai.chat.completions.create({
      model: "google/gemini-2.0-flash-exp:free", // OpenRouter model ID
      messages: [
        { role: "system", content: prompt },
        { role: "user", content: userMessage },
      ],
    });

    return completion.choices[0]?.message?.content || "";
  } catch (error) {
    console.error("AIModel error:", error);
    return "AI is currently unavailable. Please try again later.";
  }
};
