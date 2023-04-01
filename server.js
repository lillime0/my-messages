import { config } from "dotenv";
config();
import "express-async-errors";

import path, { dirname } from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import express from "express";
const app = express();

import helmet from "helmet";
import cors from "cors";
import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";

import messagesRouter from "./routes/messages.js";
import authRouter from "./routes/auth.js";
import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";

// app.set("trust proxy", 1);
app.use(mongoSanitize());
app.use(express.json());
app.use(cors());
app.use(xss());
app.use(helmet());
mongoose.set("strictQuery", true);
// app.use(express.urlencoded({ extended: true }));

// only when ready to deploy
const __dirname = dirname(fileURLToPath(import.meta.url));
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.resolve(__dirname, "./client/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./client/dist", "index.html"));
  });
}

app.use("/api/auth", authRouter);
app.use("/api/messages", messagesRouter);
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 5000;

await mongoose.connect(process.env.MONGO_URI);
app.listen(PORT, console.log(`Server is listening on port ${PORT}...`));
