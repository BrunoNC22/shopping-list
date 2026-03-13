import { EditItem } from "@/domain/usecases/item/EditItem"
import { createLocalItemPeristerAdapter } from "../../persister/LocalItemPersisterAdapterFactory"
import { createLocalCategoryPersister } from "../../persister/LocalCategoryPersisterFactory"

export const createLocalEditItemFactory = () => {
  return new EditItem(
    createLocalItemPeristerAdapter(),
    createLocalCategoryPersister()
  )
}