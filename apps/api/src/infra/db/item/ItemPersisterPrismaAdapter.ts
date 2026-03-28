import { Categoria, Item, ItemNotFoundError, ItemPersisterOutputPort } from "@shopping-list/domain";
import { PrismaClient } from "../prisma/generated/client";

export class ItemPersisterPrismaAdapter implements ItemPersisterOutputPort {
  constructor(private readonly prismaClient: PrismaClient) {}

  async delete(itemId: string): Promise<void> {
      
  }

  async getAll(): Promise<Item[]> {
    const dbItems = await this.prismaClient.item.findMany({
      include: { category: true }
    })

    return dbItems.map(dbItem => 
      new Item(
        dbItem.id,
        dbItem.shoppingListId,
        dbItem.name,
        dbItem.price,
        dbItem.amount,
        new Categoria(
          dbItem.category.id,
          dbItem.category.name
        ),
        dbItem.checked
      )
    )
  }

  async getById(id: string): Promise<Item> {
    const dbItem = await this.prismaClient.item.findUnique({
      where: {
        id
      },
      include: {
        category: true
      }
    })

    if (!dbItem) throw new ItemNotFoundError(`Item com id ${id} não encontrado`)

    return new Item(
      dbItem.id,
      dbItem.shoppingListId,
      dbItem.name,
      dbItem.price,
      dbItem.amount,
      new Categoria(
        dbItem.category.id,
        dbItem.category.name
      ),
      dbItem.checked
    )
  }

  async getByItemListId(itemListId: string): Promise<Item[]> {
    const dbItems = await this.prismaClient.item.findMany({
      where: {
        shoppingListId: itemListId
      },
      include: { category: true }
    })

    return dbItems.map(dbItem => 
      new Item(
        dbItem.id,
        dbItem.shoppingListId,
        dbItem.name,
        dbItem.price,
        dbItem.amount,
        new Categoria(
          dbItem.category.id,
          dbItem.category.name
        ),
        dbItem.checked
      )
    )
  }
  replace(itemListId: string, items: Item[]): Promise<void> {
    throw new Error("Prisma item persister does not replace items")  
  }

  async save(item: Item): Promise<void> {
    await this.prismaClient.item.upsert({
      where: {
        id: item.id
      },
      create: {
        id: item.id,
        amount: item.amount,
        checked: item.checked,
        name: item.name,
        price: item.price,
        categoryId: item.category.id,
        shoppingListId: item.itemListId,
      },
      update: {
        amount: item.amount,
        categoryId: item.category.id,
        checked: item.checked,
        name: item.name,
        price: item.price,
      }
    })
  }
}