import morgan, { StreamOptions } from "morgan";
import logger from "../logging/logger";

// Define a stream to use the custom logger
const stream: StreamOptions = {
  write: (message) => logger.http(message.trim()),
};

// Skip logging for certain environments
const skip = () => {
  const env = process.env.NODE_ENV || "development";
  return env !== "development";
};

// Build the morgan middleware
const morganMiddleware = morgan(
  ":method :url :status :res[content-length] - :response-time ms",
  { stream, skip }
);

export default morganMiddleware;
