import { ErrorRequestHandler } from "express";

const errorHandler: ErrorRequestHandler = (err, req, res) => {
  console.log(err);

  // handle types of error

  return res.status(500).json({ message: "Internal Server Error", err });
};

export { errorHandler };
