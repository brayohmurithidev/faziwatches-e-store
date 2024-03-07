import mongoose from "mongoose";
import { APIResponse } from "../utils/response.js";
export const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof mongoose.Error) {
    return res.status(err.status || 500).json({ error: err.message });
  }
  return res
    .status(err.status || 500)
    .send(
      APIResponse(null, err.status || 500, err.message || "An error occured")
    );
};

export const exceptionError = (code, message) => {
  const error = new Error(message);
  error.status = code;
  throw error;
};
