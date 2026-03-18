import { Categoria, CategoryNotFoundError, NotFoundError, type CategoryPersisterOutputPort, type GetHttpClientOutputPort } from "@shopping-list/domain"
import type { RemoteCategory } from "./types/RemoteCategory"

export class RemoteCategoryPersister implements CategoryPersisterOutputPort {
  constructor(private readonly httpClient: GetHttpClientOutputPort) {}

  async getAll(): Promise<Categoria[]> {
    try {
      const remoteCategories = await this.httpClient.get<RemoteCategory[]>({ url: `/categories` })
      return remoteCategories.map((remoteCategory) => this.convertToDomainCategory(remoteCategory))
    } catch (e) {
      throw new Error(`Unexpected error while trying to get all categories from server: ${e}`)
    }
  }

  async getById(id: string): Promise<Categoria> {
    try {
      const remoteCategory = await this.httpClient.get<RemoteCategory>({ url: `/categories/${id}` })
      return this.convertToDomainCategory(remoteCategory)
    } catch (e) {
      if (e instanceof NotFoundError) {
        throw new CategoryNotFoundError(`Não foi possivel encontrar a categoria com id ${id} no servidor remoto.`)
      }
      throw new Error(`Unexpected Error while trying to get category by id from the server: ${e}`)
    }
  }

  convertToDomainCategory(remoteCategory: RemoteCategory) {
    return new Categoria(remoteCategory.id, remoteCategory.name)
  }

  async save(): Promise<void> {
    throw new Error("RemoteCategoryPersister do not save Categoria.")
  }
}