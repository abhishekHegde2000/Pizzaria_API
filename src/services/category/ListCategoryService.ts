import prismaClient from "../../prisma";

class ListCategoryService {
  /**
   * Executes the service to list all categories.
   * @returns {Promise<Array<{ id: string, name: string }>>} A promise that resolves to an array of category objects.
   * @throws {Error} If there is an issue with the database query.
   */
  async execute(): Promise<Array<{ id: string; name: string }>> {
    try {
      const categories = await prismaClient.category.findMany({
        select: {
          id: true,
          name: true,
        },
      });

      return categories;
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw new Error("Unable to fetch categories. Please try again later.");
    }
  }
}

export { ListCategoryService };
