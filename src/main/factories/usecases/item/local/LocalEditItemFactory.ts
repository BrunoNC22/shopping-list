import { EditItem } from "@/domain/usecases/item/EditItem"
import { createLocalCategoryPersister } from "@/main/factories/persister/local/LocalCategoryPersisterFactory"
import { createLocalItemPeristerAdapter } from "@/main/factories/persister/local/LocalItemPersisterAdapterFactory"

export const createLocalEditItemFactory = () => {
  return new EditItem(
    createLocalItemPeristerAdapter(),
    createLocalCategoryPersister()
  )
}