import { GoogleGenerativeAI } from "@google/generative-ai";
import config from "../config/config";
import { Message } from "../models/message";

const genAI = new GoogleGenerativeAI(config.apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

async function generateResponse(
  conversationHistory: Message[]
): Promise<string> {
  try {
    const chat = await model.generateContent({
      contents: conversationHistory,
    });

    const text = chat.response.text();
    return text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
}

export default { generateResponse };
