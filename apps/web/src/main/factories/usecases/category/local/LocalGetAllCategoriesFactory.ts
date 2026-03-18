import { GetAllCategories } from "@shopping-list/domain"
import { createLocalCategoryPersister } from "../../../persister/local/LocalCategoryPersisterFactory"

export const createLocalGetAllCategories = () => {
  return new GetAllCategories(createLocalCategoryPersister())
}