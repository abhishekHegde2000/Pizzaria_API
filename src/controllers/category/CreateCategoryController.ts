import { Request, Response } from "express";
import { CreateCategoryService } from "../../services/category/CreateCategoryService";

class CreateCategoryController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { name } = req.body;

    // Initialize the service responsible for creating a category
    const createCategoryService = new CreateCategoryService();

    try {
      // Attempt to create the category
      const category = await createCategoryService.execute({ name });

      // Return success response with created category data
      return res.status(201).json({
        message: "Category created successfully!",
        category: category,
      });
    } catch (error) {
      console.error("Category creation failed:", error);

      // Return a 500 error response with a descriptive message
      return res.status(500).json({
        error:
          "An error occurred while creating the category. Please try again.",
      });
    }
  }
}

export { CreateCategoryController };
