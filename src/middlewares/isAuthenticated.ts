import { NextFunction, Request, Response } from "express";
import { JsonWebTokenError, TokenExpiredError, verify } from "jsonwebtoken";

interface Payload {
  sub: string;
}

// Extend the Express Request interface to include user_id
declare module "express-serve-static-core" {
  interface Request {
    user_id?: string;
  }
}

export function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
): Response | void {
  // Get the Authorization header token
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Authorization header missing" });
  }

  const [scheme, token] = authHeader.split(" ");

  // Ensure Bearer scheme and token are present
  if (scheme !== "Bearer" || !token) {
    return res
      .status(401)
      .json({ error: "Malformed token, expected 'Bearer <token>'" });
  }

  try {
    // Validate and decode token using JWT_SECRET
    const { sub } = verify(token, process.env.JWT_SECRET) as Payload;

    // Assign user ID from token payload to request object
    req.user_id = sub;

    next();
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      return res.status(401).json({ error: "Token expired" });
    } else if (error instanceof JsonWebTokenError) {
      return res.status(401).json({ error: "Invalid token" });
    }
    return res.status(500).json({ error: "Internal server error" });
  }
}
