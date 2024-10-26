import { Request, Response } from "express";
import { AuthUserService } from "../../services/user/AuthUserService";

class AuthUserController {
  /**
   * @swagger
   * /session:
   *   post:
   *     summary: Login a user
   *     description: Authenticates a user with email and password and returns a JWT token on success.
   *     tags:
   *       - User
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               email:
   *                 type: string
   *                 description: The user's email address
   *                 example: user@example.com
   *               password:
   *                 type: string
   *                 description: The user's password
   *                 example: password123
   *     responses:
   *       200:
   *         description: Successful login
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 id:
   *                   type: string
   *                   description: User ID
   *                   example: "123e4567-e89b-12d3-a456-426614174000"
   *                 name:
   *                   type: string
   *                   description: User name
   *                   example: John Doe
   *                 email:
   *                   type: string
   *                   description: User email
   *                   example: user@example.com
   *                 token:
   *                   type: string
   *                   description: JWT token for authentication
   *                   example: "eyJhbGciOiJIUzI1NiIsInR5..."
   *       401:
   *         description: Invalid credentials
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   description: Error message
   *                   example: "User/password incorrect"
   *       500:
   *         description: Internal server error
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   description: Error message
   *                   example: "Internal server error"
   */
  async handle(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const authUserService = new AuthUserService();

    try {
      const auth = await authUserService.execute({
        email,
        password,
      });

      // Set the token in an HTTP-only cookie
      res.cookie("token", auth.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Use secure cookies in production
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      });

      // Optionally, set the token in the Authorization header
      res.set("Authorization", `Bearer ${auth.token}`);

      return res.json(auth);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export { AuthUserController };

