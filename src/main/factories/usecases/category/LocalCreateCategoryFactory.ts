import { CreateCategory } from "@/domain/usecases/category/CreateCategory"
import { createLocalCategoryPersister } from "../../persister/LocalCategoryPersisterFactory"
import { createIdGeneratorAdapter } from "../../id/IdGeneratorAdapterFactory"

export const createLocalCreateCategoryFactory = () => {
  return new CreateCategory(createLocalCategoryPersister(), createIdGeneratorAdapter())
}