import { Categoria, CategoryNotFoundError, CategoryPersisterOutputPort } from "@shopping-list/domain";
import { PrismaClient } from "../prisma/generated/client";

export class CategoryPersisterPrismaAdapter implements CategoryPersisterOutputPort {
  constructor(private readonly prismaClient: PrismaClient) {}

  async getAll(): Promise<Categoria[]> {
    const dbCategories = await this.prismaClient.category.findMany()
    return dbCategories.map(dbCategory => new Categoria(dbCategory.id, dbCategory.name))
  }

  async getById(id: string): Promise<Categoria> {
    const dbCategory = await this.prismaClient.category.findUnique({
      where: {
        id
      }
    })

    if (!dbCategory) throw new CategoryNotFoundError(`Não foi possivel encontrar uma categoria com id ${id}`)

    return new Categoria(dbCategory.id, dbCategory.name)
  }

  async replace(categories: Categoria[]): Promise<void> {
    throw new Error("Prisma category persister does not replace categories")
  }

  async save(category: Categoria): Promise<void> {
    await this.prismaClient.category.upsert({
      where: {
        id: category.id
      },
      create: {
        id: category.id,
        name: category.nome
      },
      update: {
        name: category.nome
      }
    })
  }
}