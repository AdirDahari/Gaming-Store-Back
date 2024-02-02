import express, { json } from "express";
import cors from "cors";
import { configEnv } from "./config";
import { connect } from "./database/connection";
import { notFound } from "./middleware/not-found";
import { errorHandler } from "./middleware/error-handler";
import { userRouter } from "./routes/users";
import { postRouter } from "./routes/post";
import morgan from "morgan";

configEnv();
connect();

const app = express();
app.use(
  cors({
    origin: process.env.CLIENT_URL,
  })
);
app.use(express.static("public"));
app.use(json());
app.use(morgan("dev"));
app.use("/api/v1/users", userRouter);
app.use("api/v1/posts", postRouter);
app.use(errorHandler);
app.use(notFound);

const PORT = process.env.PORT ?? 8080;

app.listen(PORT, () => {
  console.log(`App is running: http://localhost:${PORT}`);
});
