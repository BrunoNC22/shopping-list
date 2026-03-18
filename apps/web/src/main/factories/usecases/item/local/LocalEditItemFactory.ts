import { createLocalCategoryPersister } from "@/main/factories/persister/local/LocalCategoryPersisterFactory"
import { createLocalItemPeristerAdapter } from "@/main/factories/persister/local/LocalItemPersisterAdapterFactory"
import { EditItem } from "@shopping-list/domain"

export const createLocalEditItemFactory = () => {
  return new EditItem(
    createLocalItemPeristerAdapter(),
    createLocalCategoryPersister()
  )
}