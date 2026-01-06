import { CreateCategory } from "@/domain/usecases/CreateCategory"
import { createLocalCategoryPersister } from "../persister/LocalCategoryPersisterFactory"

export const createLocalCreateCategoryFactory = () => {
  return new CreateCategory(createLocalCategoryPersister())
}