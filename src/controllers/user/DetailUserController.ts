import { Request, Response } from "express";
import { DetailUserService } from "../../services/user/DetailUserService";

class DetailuserController {
  /**
   * @swagger
   * /me:
   *   get:
   *     summary: Get authenticated user details
   *     description: Retrieves information about the currently authenticated user.
   *     tags:
   *       - User
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: User details retrieved successfully
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
   *       401:
   *         description: Unauthorized access
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   description: Error message
   *                   example: "Unauthorized access"
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

  async handle(req: Request, res: Response) {
    const user_id = req.user_id;

    const detailUserService = new DetailUserService();

    const user = await detailUserService.execute(user_id);

    return res.json(user);
  }
}

export { DetailuserController };
