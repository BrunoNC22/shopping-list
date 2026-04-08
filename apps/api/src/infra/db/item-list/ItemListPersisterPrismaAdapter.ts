import { Categoria, GetItemListsProps, Item, ItemList, ItemListNotFoundError, ItemListPersisterOutputPort } from "@shopping-list/domain";
import { PrismaClient } from "../prisma/generated/client";

export class ItemListPersisterPrismaAdapter implements ItemListPersisterOutputPort {
  constructor(private readonly prismaClient: PrismaClient) {}

  async delete(listId: string): Promise<void> {
    const foundItemList = await this.prismaClient.shoppingList.findUnique({
      where: {
        id: listId
      }
    })

    if (!foundItemList) throw new ItemListNotFoundError(`Não foi possível encontrar item list com id ${listId}`)

    await this.prismaClient.shoppingList.delete({
      where: { id: listId }
    })
  }

  replaceByUserId(userId: string, itemLists: ItemList[]): Promise<void> {
    throw new Error("Prisma item list persister does not replace item lists")
  }

  async get(listId: string): Promise<ItemList> {
    const dbItemList = await this.prismaClient.shoppingList.findUnique({
      where: { id: listId },
      include: { 
        items: { 
          include: { category: true }
        },
        user: true
      },
    })

    if (!dbItemList) throw new ItemListNotFoundError(`Não foi possível encontrar item list com id ${listId}`)
    

    const items = dbItemList.items.map(
      item => new Item(
        item.id,
        dbItemList.id,
        item.name,
        item.price,
        item.amount,
        new Categoria(
          item.category.id,
          item.category.name
        ),
        item.checked
      )
    )
    return new ItemList(dbItemList.id, dbItemList.userId, dbItemList.name, items, dbItemList.createdAt)
  }

  async getAll(): Promise<ItemList[]> {
    const dbItemLists = await this.prismaClient.shoppingList.findMany({
      include: {
        items: {
          include: { category: true }
        },
        user: true
      }
    })

    return dbItemLists.map(dbItemList => {
      const items = dbItemList.items.map(
        item => new Item(
          item.id,
          dbItemList.id,
          item.name,
          item.price,
          item.amount,
          new Categoria(
            item.category.id,
            item.category.name
          ),
          item.checked
        )
      )

      return new ItemList(dbItemList.id, dbItemList.userId, dbItemList.name, items, dbItemList.createdAt)
    })
  }

  async getAllByUserId(userId: string): Promise<ItemList[]> {
    const dbItemLists = await this.prismaClient.shoppingList.findMany({
      where: {
        userId
      },
      include: {
        items: {
          include: { category: true }
        }
      }
    })

    return dbItemLists.map(dbItemList => {
      const items = dbItemList.items.map(
        item => new Item(
          item.id,
          dbItemList.id,
          item.name,
          item.price,
          item.amount,
          new Categoria(
            item.category.id,
            item.category.name
          ),
          item.checked
        )
      )

      return new ItemList(dbItemList.id, dbItemList.userId, dbItemList.name, items, dbItemList.createdAt)
    })
  }

  async save(itemList: ItemList): Promise<void> {
    await this.prismaClient.shoppingList.upsert({
      where: { id: itemList.id },
      create: {
        id: itemList.id,
        name: itemList.name,
        items: { 
          connectOrCreate: itemList
            .getItems()
            .map(item => ({ 
              where: { id: item.id },
              create: {
                id: item.id,
                amount: item.amount,
                checked: item.checked,
                name: item.name,
                price: item.price,
                categoryId: item.category.id
              }
            }))
        },
        createdAt: itemList.createdAt,
        userId: itemList.userId
      },
      update: {
        name: itemList.name
      }
    })
  }
}