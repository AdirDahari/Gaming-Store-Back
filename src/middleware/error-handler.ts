import { ErrorRequestHandler } from "express";
import { Logger } from "../logs/logger";

const errorHandler: ErrorRequestHandler = (err, req, res) => {
  Logger.error(err);

  return res.status(500).json({ message: "Internal Server Error", err });
};

export { errorHandler };
