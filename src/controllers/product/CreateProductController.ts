import { Request, Response } from "express";
import { CreateProductService } from "../../services/product/CreateProductService";

class CreateProductController {
  /**
   * @swagger
   * tags:
   *   name: Products
   *   description: Product management
   */

  /**
   * @swagger
   * /product:
   *   post:
   *     summary: Create a new product
   *     tags: [Products]
   *     consumes:
   *       - multipart/form-data
   *     parameters:
   *       - in: formData
   *         name: name
   *         type: string
   *         required: true
   *         description: The name of the product
   *       - in: formData
   *         name: price
   *         type: string
   *         required: true
   *         description: The price of the product
   *       - in: formData
   *         name: description
   *         type: string
   *         required: true
   *         description: The description of the product
   *       - in: formData
   *         name: category_id
   *         type: string
   *         required: true
   *         description: The category ID of the product
   *       - in: formData
   *         name: file
   *         type: file
   *         required: true
   *         description: The banner image of the product
   *     responses:
   *       200:
   *         description: The created product
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 id:
   *                   type: string
   *                 name:
   *                   type: string
   *                 price:
   *                   type: string
   *                 description:
   *                   type: string
   *                 banner:
   *                   type: string
   *                 category_id:
   *                   type: string
   *       400:
   *         description: Bad request
   *       500:
   *         description: Internal server error
   */
  async handle(req: Request, res: Response) {
    const { name, price, description, category_id } = req.body;

    const createProductService = new CreateProductService();

    if (!req.file) {
      throw new Error("error upload file");
    } else {
      const { originalname, filename: banner } = req.file;

      const product = await createProductService.execute({
        name,
        price,
        description,
        banner,
        category_id,
      });

      return res.json(product);
    }
  }
}

export { CreateProductController };
