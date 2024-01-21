import { RequestHandler } from "express";

const notFound: RequestHandler = (req, res, next) => {
  console.log("Not found");
  res.status(404).json({ message: "Not Found" });
};

export { notFound };
