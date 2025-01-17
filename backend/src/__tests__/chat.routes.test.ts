import express from "express";
import session from "express-session";
import request from "supertest";
import chatRoutes from "../routes/chat";
import { describe, expect } from "@jest/globals";
import { generateSecret } from "../utils/helper";

const sessionSecret = process.env.SESSION_SECRET || generateSecret();
const app = express();

app.use(
  session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      httpOnly: true,
      sameSite: "strict",
    },
  })
);

app.use(express.json());
app.use("/api/chat", chatRoutes);

describe("Chat API Endpoints", () => {
  it("should get session data (empty history)", async () => {
    await request(app)
      .get("/api/chat/session")
      .expect(200)
      .expect("Content-Type", /json/)
      .then((res) => {
        expect(res.body).toEqual({ conversationHistory: [] });
      });
  });

  it("should return some text from AI", async () => {
    const payload = { message: "hello from vietnam" };
    await request(app)
      .post("/api/chat")
      .send(payload)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(200)
      .expect("Content-Type", /json/)
      .then((res) => {
        expect(res.body.response).toBeDefined();
      });
  }, 25000);
});
