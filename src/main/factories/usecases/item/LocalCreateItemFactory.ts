import CreateItem from "@/domain/usecases/item/CreateItem";
import { createLocalItemPeristerAdapter } from "../../persister/LocalItemPersisterAdapterFactory";
import { createLocalCategoryPersister } from "../../persister/LocalCategoryPersisterFactory";
import { createLocalItemListPersister } from "../../persister/LocalItemListPersisterFactory";
import { createIdGeneratorAdapter } from "../../id/IdGeneratorAdapterFactory";

export const createCreateItem = () => new CreateItem(
  createLocalItemPeristerAdapter(), 
  createLocalCategoryPersister(), 
  createLocalItemListPersister(),
  createIdGeneratorAdapter()
)