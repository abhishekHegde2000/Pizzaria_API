import { Request, response, Response } from "express";
import { CreateUserService } from "../../services/user/CreateUserService";

class CreateUserController {
  /**
   * @swagger
   * /users:
   *   post:
   *     summary: Create a new user
   *     description: Endpoint to create a new user.
   *     tags:
   *       - User
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               name:
   *                 type: string
   *               email:
   *                 type: string
   *                 format: email
   *               password:
   *                 type: string
   *                 format: password
   *           example:
   *             name: John Doe
   *             email: john.doe@example.com
   *             password: password123
   *     responses:
   *       200:
   *         description: User created successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 id:
   *                   type: integer
   *                 name:
   *                   type: string
   *                 email:
   *                   type: string
   *                   format: email
   *               example:
   *                 id: 1
   *                 name: John Doe
   *                 email: john.doe@example.com
   *       400:
   *         description: Bad request, invalid input
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 error:
   *                   type: string
   *               example:
   *                 error: Invalid input data
   *       500:
   *         description: Internal server error
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *               example:
   *                 message: Internal server error occurred
   */
  async handle(req: Request, res: Response) {
    const { name, email, password } = req.body;

    const createUserService = new CreateUserService();

    const user = await createUserService.execute({
      name,
      email,
      password,
    });

    return res.json(user);
  }
}

export { CreateUserController };
