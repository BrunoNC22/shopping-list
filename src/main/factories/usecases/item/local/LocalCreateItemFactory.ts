import CreateItem from "@/domain/usecases/item/CreateItem";
import { createIdGeneratorAdapter } from "@/main/factories/id/IdGeneratorAdapterFactory";
import { createLocalCategoryPersister } from "@/main/factories/persister/local/LocalCategoryPersisterFactory";
import { createLocalItemListPersister } from "@/main/factories/persister/local/LocalItemListPersisterFactory";
import { createLocalItemPeristerAdapter } from "@/main/factories/persister/local/LocalItemPersisterAdapterFactory";

export const createCreateItem = () => new CreateItem(
  createLocalItemPeristerAdapter(), 
  createLocalCategoryPersister(), 
  createLocalItemListPersister(),
  createIdGeneratorAdapter()
)