import { CreateCategory } from "@/domain/usecases/category/CreateCategory"
import { createIdGeneratorAdapter } from "../../../id/IdGeneratorAdapterFactory"
import { createLocalCategoryPersister } from "../../../persister/local/LocalCategoryPersisterFactory"

export const createLocalCreateCategoryFactory = () => {
  return new CreateCategory(createLocalCategoryPersister(), createIdGeneratorAdapter())
}