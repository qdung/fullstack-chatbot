import "express-session";
import { Message } from "../models/message";

declare module "express-session" {
  interface SessionData {
    conversationHistory: Message[];
  }
}
