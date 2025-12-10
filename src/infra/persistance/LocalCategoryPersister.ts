import { Categoria } from "@/domain/models/Categoria";
import type { GetCacheStorageOutputPort, SetCacheStorageOutputPort } from "@/domain/output/cache/CacheStorageOutputPort";
import { ResourceNotFoundError } from "@/domain/output/cache/errors/ResourceNotFoundError";
import type { CategoryPersisterOutputPort } from "@/domain/output/persistance/CategoryPersisterOutputPort";
import { CategoryNotFoundError } from "@/domain/output/persistance/errors/CategoryNotFoundError";

type StorageCategory = {
  id: string,
  name: string
}

const defaultItems: StorageCategory[] = [
  {
    id: 'merceariaId',
    name: 'Mercearia'
  },
  {
    id: 'açougueId',
    name: 'Açougue'
  },
  {
    id: 'limpezaId',
    name: 'Limpeza'
  },
]

export class LocalCategoryPersister implements CategoryPersisterOutputPort {

  constructor(private readonly cacheStorage: SetCacheStorageOutputPort & GetCacheStorageOutputPort) {}

  async getById(id: string): Promise<Categoria> {
    const categories = await this.cacheStorage.get<StorageCategory[]>('categories')

    const foundCategorie = categories.find(category => category.id === id)

    if (!foundCategorie) throw new CategoryNotFoundError(`Category with id ${id} not found.`)
    
    return this.parseStorageCategory(foundCategorie)
  }

  async getAll(): Promise<Categoria[]> {
    let categories: StorageCategory[]
    try {
      categories = await this.cacheStorage.get<StorageCategory[]>('categories')
    } catch (e) {
      if (e instanceof ResourceNotFoundError) {
        console.log("auidygsasdSAAAAAAAAAAAAAAAAAAAA")
        await this.cacheStorage.set('categories', defaultItems)
        categories = defaultItems
      } else {
        throw new Error(`Erro inesperado ao obter categorias ${e}`)
      } 
    }
    
    return categories.map(storageCategory => this.parseStorageCategory(storageCategory))
  }

  async save(category: Categoria): Promise<void> {
    const categories = await this.cacheStorage.get<StorageCategory[]>('categories')

    categories.push(this.parseDomainCategory(category))

    await this.cacheStorage.set('categories', categories)
  }

  private parseStorageCategory(storageCategory: StorageCategory): Categoria {
    return new Categoria(storageCategory.id, storageCategory.name)
  }

  private parseDomainCategory(category: Categoria): StorageCategory {
    return {
      id: category.id,
      name: category.nome
    }
  }
}