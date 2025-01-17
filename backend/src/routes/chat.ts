import express, { Request, Response } from "express";
import fs from "fs";
import csv from "csv-parser";
import path from "path";
import geminiService from "../services/gemini";
import { Message } from "../models/message";

declare module "express-session" {
  interface SessionData {
    conversationHistory: Message[];
  }
}

let csvFilePath = path.join(process.cwd(), "owasp_qa.csv");

const owaspData: any[] = [];
fs.createReadStream(csvFilePath)
  .pipe(csv())
  .on("data", (data) => owaspData.push(data))
  .on("end", () => console.log("OWASP data loaded."))
  .on("error", (error) => console.error("Error loading OWASP data:", error));

const findOwaspAnswers = (query?: string) => {
  const lowerCaseQuery = query ? query.toLowerCase() : "";
  return owaspData.filter(
    (qa) =>
      qa.Question.toLowerCase().includes(lowerCaseQuery) ||
      qa.Answer.toLowerCase().includes(lowerCaseQuery) ||
      qa.Category.toLowerCase().includes(lowerCaseQuery)
  );
};

const router = express.Router();

router.post("/", async (req: Request, res: Response): Promise<void> => {
  if (!req.session.conversationHistory) {
    req.session.conversationHistory = [];
  }

  const userMessage = req.body.message;
  if (typeof userMessage !== "string") {
    res.status(400).json({ error: "Message must be a string" });
    return;
  }

  console.log({ userMessage });

  const owaspResults = findOwaspAnswers(userMessage);
  let owaspContext = "";

  if (owaspResults.length > 0) {
    owaspContext = `Based on our knowledge base:\n`;
    owaspResults.forEach((result) => {
      owaspContext += `**${result.Question}**\n${result.Answer}\n\n`;
    });
  }

  const augmentedPrompt = `${userMessage}\n\n${owaspContext}`;

  req.session.conversationHistory.push({
    role: "user",
    parts: [{ text: augmentedPrompt }],
  });

  try {
    const response = await geminiService.generateResponse(
      req.session.conversationHistory
    );
    req.session.conversationHistory.push({
      role: "model",
      parts: [{ text: response }],
    });
    res.json({ response });
  } catch (error) {
    console.error("Error in chat route:", error); // More specific error message
    res.status(500).json({ error: "An error occurred." });
  }
});

router.get("/session", (req, res) => {
  const sessionData = {
    conversationHistory: req.session.conversationHistory || [],
  };
  res.json(sessionData);
});

export default router;
