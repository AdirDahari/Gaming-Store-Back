import { ErrorRequestHandler } from "express";
import { Logger } from "../logs/logger";

const errorHandler: ErrorRequestHandler = (err, req, res) => {
  try {
    Logger.error(err);
    res.status(500).json({ message: "Internal Server Error", err });
  } catch (e) {
    Logger.error(e);
  }
};

export { errorHandler };
