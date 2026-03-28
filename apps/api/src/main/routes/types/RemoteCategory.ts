import { Categoria } from "@shopping-list/domain"

export type RemoteCategory = {
  id: string,
  name: string
}

export const toRemoteCategory = (category: Categoria): RemoteCategory => ({
  id: category.id,
  name: category.nome
})

export const toDomainCategory = (remoteCategory: RemoteCategory) => new Categoria(remoteCategory.id, remoteCategory.name)