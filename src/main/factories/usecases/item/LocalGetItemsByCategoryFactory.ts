import type { GetItemsByCategoryInputPort } from "@/domain/input/GetItemsByCategoryInputPort";
import { GetItemsByCategory } from "@/domain/usecases/item/GetItemsByCategory";
import { createLocalItemPeristerAdapter } from "../../persister/LocalItemPersisterAdapterFactory";

export const createLocalGetItemsByCategory = (): GetItemsByCategoryInputPort => {
  return new GetItemsByCategory(createLocalItemPeristerAdapter())
}