import express, { json } from "express";
import cors from "cors";
import { configEnv } from "./config";
import { connect } from "./database/connection";
import { notFound } from "./middleware/not-found";

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

app.use(notFound);

const PORT = process.env.PORT ?? 8080;

app.listen(PORT, () => {
  console.log(`App is running: http://localhost:${PORT}`);
});
