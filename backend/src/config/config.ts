import dotenv from "dotenv";
dotenv.config();

interface Config {
  port: number;
  apiKey: string;
  sessionSecret: string;
  isProduction: boolean;
}

const config: Config = {
  port: Number(process.env.PORT) || 3000,
  apiKey: process.env.GOOGLE_API_KEY || "",
  sessionSecret: process.env.SESSION_SECRET || "your_development_secret",
  isProduction: process.env.NODE_ENV === "production",
};

if (!config.apiKey) {
  console.error("GOOGLE_API_KEY is required in .env file");
  process.exit(1);
}

export default config;
