import cors from "cors";
import express, { NextFunction, Request, Response, urlencoded } from "express";
import "express-async-errors";
import path from "path";

import morgan from "morgan";
import setupSwagger from "./config/swagger";
import logger from "./logging/logger";
import { router } from "./routes";

const app = express();
app.use(express.json()); // this is used for json body ( when wesend data from postman in json )
app.use(express.urlencoded({ extended: false })); // for form data from postman ( or frontend )
app.use(cors());

// Set the view engine to ejs
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(router);

app.use("/files", express.static(path.resolve(__dirname, "..", "tmp")));

app.use(morgan("dev"));

app.use(
  morgan(function (tokens: any, req: Request, res: Response) {
    return `you just called method --- > ${
      req.method
    } ${req.url} ${res.statusCode} - ${res.get("content-length")} - ${res.get("response-time")}ms`;
  })
);

setupSwagger(app);

// Error Handler:

/*
This code snippet defines an error-handling middleware function in an Express.js application. Let's break down what each part does and how it works:

### Code Explanation:

```typescript
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Error) {
    // If the error is an instance of Error (or its subclass)
    return res.status(400).json({
      error: err.message,
    });
  }

  // If the error is not an instance of Error (or its subclass)
  return res.status(500).json({
    status: "error",
    message: "Internal server error.",
  });
});
```

1. **Error-handling Middleware**:
   - `app.use()` mounts this middleware globally in the Express application. It handles errors that occur during the request-response cycle.

2. **Function Parameters**:
   - `(err: Error, req: Request, res: Response, next: NextFunction)`: Callback function parameters:
     - `err`: Represents the error object. It is expected to be an instance of `Error` or a subclass of `Error`.
     - `req`: Represents the HTTP request object (`Request` type from Express).
     - `res`: Represents the HTTP response object (`Response` type from Express).
     - `next`: Represents the next middleware function in the Express middleware chain (`NextFunction` type).

3. **Error Checking**:
   - `if (err instanceof Error)`: Checks if the `err` object is an instance of `Error` or its subclass. This is a type guard to ensure we handle errors correctly.

4. **Handling Errors**:
   - **If `err` is an instance of `Error`:**
     - The middleware responds with a `400 Bad Request` status code (`res.status(400)`).
     - It sends a JSON response (`res.json()`) with an object containing an `error` key, set to the error message (`err.message`). This is useful for client-side error handling, as it provides specific information about what went wrong.

   - **If `err` is not an instance of `Error`:**
     - This is a fallback case, handling any unexpected errors.
     - The middleware responds with a `500 Internal Server Error` status code (`res.status(500)`).
     - It sends a JSON response (`res.json()`) with an object containing a `status` key set to `"error"` and a generic error message (`"Internal server error."`).

### Usage:

- **Error Propagation**: When an error occurs during the processing of a request, middleware functions in Express can pass the error to subsequent middleware using `next(err)`. This error-handling middleware (`app.use(...)`) catches these errors.

- **Global Error Handling**: By using `app.use(...)` without a path prefix, this middleware is applied globally to handle errors for all routes and middleware in the Express application.

### Example Scenario:

Assuming you have an Express application (`server.ts`) with routes and middleware:

```typescript
import express, { Request, Response, NextFunction } from 'express';

const app = express();

// Example route causing an error
app.get('/error', (req: Request, res: Response, next: NextFunction) => {
  const err = new Error('Custom error message');
  next(err);
});

// Error-handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Error) {
    return res.status(400).json({
      error: err.message,
    });
  }

  return res.status(500).json({
    status: "error",
    message: "Internal server error.",
  });
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
```

- If you navigate to `http://localhost:3000/error`, it triggers an error with a custom message (`'Custom error message'`). The error is then caught by the error-handling middleware defined above.
- The middleware checks if the error (`err`) is an instance of `Error` and responds accordingly with a JSON object containing the error message (`err.message`).
- If the error is not an instance of `Error`, it falls back to a generic server error message.

### Summary:

This error-handling middleware in Express.js is crucial for handling and responding to errors uniformly across your application. It ensures that clients receive appropriate error responses with meaningful messages, improving the overall reliability and user experience of your web application. */

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Error) {
    //Se for uma instancia do tipo error
    return res.status(400).json({
      error: err.message,
    });
  }

  return res.status(500).json({
    status: "error",
    message: "Internal server error.",
  });
});

app.get("/", (req, res) => {
  return res.status(200).json({ message: "Hello World" });
});

// Example usage
app.listen(3333, () => {
  logger.info("Server is online!!!! at http://localhost:3333");
});
