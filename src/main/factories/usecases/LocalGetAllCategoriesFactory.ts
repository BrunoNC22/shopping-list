import { GetAllCategories } from "@/domain/usecases/GetAllCategories"
import { createLocalCategoryPersister } from "../persister/LocalCategoryPersisterFactory"

export const createLocalGetAllCategories = () => {
  return new GetAllCategories(createLocalCategoryPersister())
}