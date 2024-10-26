import { Request, Response } from "express";
import { ListCategoryService } from "../../services/category/ListCategoryService";

/**
 * Controller to handle listing all categories.
 */
class ListCategoryController {
  /**
   * Handles the request to retrieve all categories.
   * @param req - The request object
   * @param res - The response object
   * @returns A JSON response with all categories or an error message.
   */
  async handle(req: Request, res: Response): Promise<Response> {
    const listCategoryService = new ListCategoryService();

    try {
      const categories = await listCategoryService.execute();
      return res.status(200).json(categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
      return res.status(500).json({
        error: "Failed to fetch categories. Please try again later.",
      });
    }
  }
}

export { ListCategoryController };
