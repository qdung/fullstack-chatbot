import express, { Request, Response, NextFunction } from "express";
import session from "express-session";
import chatRoutes from "./routes/chat";
import config from "./config/config";
import cors from "cors";

const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(
  session({
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: config.isProduction },
  })
);

app.use(cors(corsOptions));
app.use(express.json());
app.use("/api/chat", chatRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

export default app;
