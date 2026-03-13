import { GetAllCategories } from "@/domain/usecases/category/GetAllCategories"
import { createLocalCategoryPersister } from "../../persister/LocalCategoryPersisterFactory"

export const createLocalGetAllCategories = () => {
  return new GetAllCategories(createLocalCategoryPersister())
}