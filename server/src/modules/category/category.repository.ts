import prisma from "@/infra/database/database.config";

export class CategoryRepository {
  async findManyCategories(params: {
    where?: Record<string, any>;
    orderBy?: Record<string, any> | Record<string, any>[];
    skip?: number;
    take?: number;
  }) {
    const { where, orderBy, skip, take } = params;
    return prisma.category.findMany({
      where,
      orderBy,
      skip,
      take,
    });
  }

  async createCategory(data: {
    name: string;
    slug: string;
    description?: string;
    images?: string[];
  }) {
    return prisma.category.create({
      data,
    });
  }

  async findCategoryById(id: string) {
    return prisma.category.findUnique({
      where: { id },
    });
  }

  async deleteCategory(id: string) {
    return prisma.category.delete({
      where: { id },
    });
  }
}
